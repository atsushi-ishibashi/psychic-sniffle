<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <button @click="updateEndpoint">エンドポイント更新</button>
    <button @click="clickButton">イベントボタン</button>
    <button @click="clickAttrEventButton">属性イベントボタン</button>
    <button @click="clickAttrEventButton2">属性イベントボタン2</button>
    <button @click="clickAttrEventButton3"> ネスト属性イベントボタン</button>
    <button @click="kinesisButton">kinesisボタン</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Analytics, Auth } from 'aws-amplify'

export default Vue.extend({
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
  methods: {
      async updateEndpoint() {
        const authUser = await Auth.currentAuthenticatedUser()
        const userAttributes = {
          username: [`${authUser.username}`],
        };
        Analytics.updateEndpoint({
          userId: authUser.attributes.sub,
          userAttributes,
        }).then((result) => {
          console.log(result);
        });
      },
      clickButton(): void {
        console.log('clickButton');
        this.updateEndpoint()
        Analytics.record({ name: 'clickButton' })
      },
      clickAttrEventButton(): void {
        console.log('clickAttrEventButton');
        this.updateEndpoint()
        Analytics.record({
          name: 'clickAttrEventButton',
          attributes: { genre: 'art', artist: 'hoge', num: 5 },
        })
      },
      clickAttrEventButton3(): void {
        console.log('clickAttrEventButton3');
        this.updateEndpoint()
        Analytics.record({
          name: 'clickAttrEventButton',
          attributes: { gender: 'MAN', age: 30, location: 'Tokyo', tags: {id:'hoge', name:'name'} },
        })
      },
      async kinesisButton() {
        console.log('kinesisButton');
        const authUser = await Auth.currentAuthenticatedUser()
        const data = {
          eventName: 'kinesisButton',
          attributes: { gender: 'MAN', age: 30, location: 'Tokyo', tags: ['tagA', 'tagB'],
            user: {username: authUser.username, sub: authUser.attributes.sub},
          },
        }
        Analytics.record({
          data: data,
          streamName: process.env.VUE_APP_STREAM_NAME,
        }, 'AWSKinesisFirehose');
      },
    }
});
</script>
