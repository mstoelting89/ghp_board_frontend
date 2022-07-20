<template>
  <Navigation />
  <router-view/>
</template>

<style>
#app {
  font-family: Open Sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.modal-backdrop {
  z-index: 999;
}
</style>
<script>
import Navigation from "./components/navigation/Navigation";
export default {
  components: {Navigation}
}
</script>