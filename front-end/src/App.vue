<template>
  <div id="app">
    <Nav />
     <router-view />
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav
  },
  // On ajoute une condition si token présent dans le localstorage on dispatch la fct getuser qui se trouve dans store
  mounted() {
    if (localStorage.getItem("token")) this.$store.dispatch("getUser");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
