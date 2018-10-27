<template>
  <div id="app">
    <li v-for="channel in channels" v-bind:key="channel.id">
      <input type="checkbox"> {{ channel.name }}
    </li>
  </div>
</template>

<script>

import api from '@/api';

export default {
  name: 'app',
  data() {
    return {channels: []}
  },
  created() {
    api.get_public_channels().then(response => {
      this.channels = response.data;
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
