<template>
  <div id="navbar" class="nav-color">
      <b-nav tabs>
        <b-nav-item active-class="active" exact to="/weather">Weather</b-nav-item>
        <b-nav-item active-class="active" exact to="/code">Show Minified JS Code</b-nav-item>
      </b-nav>
  </div>
</template>

<script>

export default {
  name: 'AppNavbar',

  components: {

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

<style scoped>

.nav-color a {
  color: rgba(255, 255, 255, 0.9);
}

</style>