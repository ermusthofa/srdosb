<template>
  <div id="app">
    <div class="app" :class="period">
      <header>
        <AppNavbar></AppNavbar>
      </header>
      <router-view :fetchedCode="fetchedCode"/>
    </div>
  </div>
</template>

<script>

import AppNavbar from '@/components/AppNavbar'

export default {
  name: 'App',

  components: {
    AppNavbar
  },

  data: {
    fetchedCode: {}
  },
  created() {
    const vueCDNUrl = process.env.VUE_APP_CDN_URL + '/js/minifiedscript.js'
    fetch( vueCDNUrl )
    .then(
      r => r.text()
    )
    .then(
      t => {
        this.fetchedCode = t
        console.log(this.fetchedCode)
    })
  },

  data() {
    return {
      date: new Date
    }
  },

  computed: {
    period() {
      let hour = this.date.getHours();

      return (hour > 5 && hour < 18)? 'app--day': 'app--night';
    }
  }
}
</script>

<style>
/** Global **/
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 255, 255, 0.9);
}

a {
  text-decoration: none;
  color: inherit;
  transition: color .2s ease-in;
}

/** App **/
.app {
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
}

.app--day {
  /*background: linear-gradient(to bottom right, #6CB9C8, #6CB9C8) no-repeat;*/
  background-color: #6CB9C8;
}

.app--night {
  /*background: linear-gradient(to bottom right, #484F60, #484F60) no-repeat;*/
  background-color: #484F60;
}

.app--day a:hover {
  color: rgba(46, 146, 167, 0.9);
}

.app--night a:hover {
  color: rgba(0, 0, 0, 0.5);
}

header {
  position: absolute;
  display: block;
  top: 40px;
}
</style>
