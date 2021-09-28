import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@aws-amplify/ui-vue'
import Amplify, { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig);
Analytics.addPluggable(new AWSKinesisFirehoseProvider());

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
