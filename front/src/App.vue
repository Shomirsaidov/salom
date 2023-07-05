<template>
  <NavBar style="position: fixed;"/>
  <router-view/>
</template>
<script>

import NavBar from '@/components/NavBar.vue'

  export default {
    name: 'AppRoot',
    components: {
      NavBar,
    }
  }
</script>>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
