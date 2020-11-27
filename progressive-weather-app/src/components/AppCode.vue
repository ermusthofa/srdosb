<template>
  <div id="code">
      <main>
        <vuescroll class="scroll-small" :ops="ops">
          <small>{{ fetchedCode }}</small>
        </vuescroll>
      </main>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  name: 'AppCode',

  components: {
    vuescroll
  },
  
  props: {
    fetchedCode: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          maxHeight: 280,
        },
        rail: {
          background: '#000000',
          opacity: 0.1
        },
        bar: {
          keepShow: true,
          background: '#000000',
          opacity: 0.3
        }
      }
    }
  }

}
</script>

<style scoped>
main {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

.scroll-small {
  width: 330px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.9);
}

@media screen and (min-width: 450px) {
    main {
        width: 330px;
        height: 600px;

        border-radius: 5px;
    }
}
</style>