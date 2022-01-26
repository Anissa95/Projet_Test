<template>
  <nav class="navbar">
    <div class="container-fluid position">
      <ul>
        <li>
          <a
            v-if="isAdmin === true && isLogged === true"
            @click="goToAdminsPage"
            title="Administrateur"
            class="fas fa-user-cog"
          ></a>
        </li>
        <li>
          <a
            v-if="isLogged === true"
            @click="signout"
            title="Se déconnecter"
            class="fas fa-sign-in-alt"
          ></a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  computed: {
    isAdmin() {
      return this.$store.state.user.isAdmin;
    },
    isLogged() {
      return this.$store.state.user.isLogged;
    },
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.$store.dispatch("signout").then(() => this.$router.push("/"));
    },
  },
};
</script>
<style lang="scss">
.position {
  position: sticky;
  top: 0;
}
.navbar {
  justify-content: end;
  background: rgb(50, 50, 105);
  padding: 0;
}
ul {
  display: flex;
  list-style: none;
  padding: 0;
  width: 250px;
  justify-content: space-between;
}
a {
  font-size: 2.5rem;
  padding: 2px 10px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}
.fas {
  color: white;
}
a:hover {
  color: rgb(223, 139, 139);
}

.container-fluid.position {
  display: flex;
  justify-content: end;
}
</style>