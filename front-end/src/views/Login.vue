<template>
  <main>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">Connexion</h1>
          <div class="form-row">
            <input
              type="email"
              class="form-row_input"
              id="email"
              required
              aria-label="email"
            placeholder="Adresse email"
              v-model="user.email"
              name="email"
            />
          </div>
          <div class="form-row">
            <input
              type="password"
              class="form-row_input"
              id="password"
              required
              aria-label="password"
              placeholder="Mot de passe"
              v-model="user.password"
              name="password"
            />
          </div>
          <div class="form-row">
            <button @click="verifieUser" class="btn  btn-connex">
              Se connecter
            </button>
          </div>

          <div class="form-row">
            <p class="card-subtitle">Tu n'as pas encore de compte ?</p>
            <button @click="goToRegister" class="btn  btn-connex">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { login } from "../services/user";
export default {
 name: "connect-user",
  data() {
    return {
      user: {
        id: null,
        email: "",
        password: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    verifieUser() {
      const data = {
        email: this.user.email,
        password: this.user.password,
      };
      login(data)
        .then(() => {
          this.$router.push("tache"); //push() pour la redirection vers la page Home
        })
        .catch((err) => console.log(err));
    },goToRegister() {
      this.$router.push("/inscription");
    },
  },
};
</script>


<style lang="scss"></style>