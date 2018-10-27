<template>
  <div id="app">
    <textarea v-model="message" placeholder="Digite a mensagem"></textarea>
    <li v-for="channel in channels" v-bind:key="channel.id">
      <input type="checkbox" value='channel.name' v-model='channel.selected'> {{ channel.name }}
    </li>
    <br />
    <span>Selecionados:</span> {{ selected_view }}
    <br />
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
  computed: {
    selected: function() {
      return this.channels.filter(c => c.selected);
    },
    selected_view: function() {
      return this.channels.filter(c => c.selected).map(c => c.name);
    }
  },
  methods: {
    broadcast: function() {
      this.status = `Enviando "${this.message}" para ${this.selected}`
    }
  },
  created() {
    api.get_public_channels().then(response => {
      this.channels = response.data.map(c => {
        c['selected'] = false
        return c;
      });
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
