<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <button @click="clickButton">イベントボタン</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Analytics } from 'aws-amplify'

export default Vue.extend({
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
  methods: {
      clickButton(): void {
        console.log('clickButton');
        Analytics.record({ name: 'clickButton' })
      },
    }
});
</script>
