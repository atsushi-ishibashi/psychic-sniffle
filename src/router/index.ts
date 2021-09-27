import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import PfAuth from '../views/Auth.vue'

import {Auth} from 'aws-amplify'
import * as AmplifyModules from 'aws-amplify'
import axios from 'axios'

// @ts-ignore
import { AmplifyEventBus, AmplifyPlugin } from 'aws-amplify-vue'

Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    component: PfAuth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function hasAuthenticatedUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(() => {
    return true
  }).catch(() => {
    return false;
  });
}

hasAuthenticatedUser().then((exist: boolean) => {
    if (!exist) {
        router.push({path: '/signin'});
    }
});

// ログイン状態管理
AmplifyEventBus.$on('authState', async (state: string) => {
    if (state === 'signedOut'){
        router.push({path: '/signin'});
    } else if (state === 'signedIn') {
        const csess = await Auth.currentSession()
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + csess.getAccessToken().getJwtToken()
        router.push({path: '/'});
    }
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      const exist = await hasAuthenticatedUser();
      if (!exist) {
          return next({
              path: '/signin'
          });
      }
      const csess = await Auth.currentSession()
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + csess.getAccessToken().getJwtToken()
      return next()
  }
  return next()
});

export default router
