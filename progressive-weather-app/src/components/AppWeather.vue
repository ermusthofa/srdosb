<template>
  <div id="weather">
    <div class="app" :class="period">
      <WeatherApp :class="period"></WeatherApp>
      <AppCredits :year="year" :class="period"></AppCredits>
    </div>
  </div>
</template>

<script>
import WeatherApp from '@/components/WeatherApp'
import AppCredits from '@/components/AppCredits'

export default {
  name: 'AppWeather',

  components: {
    WeatherApp,
    AppCredits
  },

  data() {
    return {
      date: new Date
    }
  },

  computed: {
    year() {
      return this.date.getFullYear();
    },

    period() {
      let hour = this.date.getHours();

      return (hour > 5 && hour < 18)? 'app--day': 'app--night';
    }
  }
}
</script>