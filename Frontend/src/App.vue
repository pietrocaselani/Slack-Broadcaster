<template>
  <div id="app">
    <textarea v-model="message" placeholder="Digite a mensagem"></textarea>
    <li v-for="channel in channels" v-bind:key="channel.id">
      <input type="checkbox"> {{ channel.name }}
    </li>
    <button v-on:click="broadcast">Enviar mensagem</button>

    <br />
    <span>Status:</span> <p style="white-space: pre-line;">{{ status }}</p>
  </div>
</template>

<script>

import api from '@/api';

export default {
  name: 'app',
  data() {
    return {
      message: "",
      status: "Não enviada",
      channels: [],
    }
  },
  methods: {
    broadcast: function() {
      this.status = `Mensagem "${this.message}" enviada`
    }
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
