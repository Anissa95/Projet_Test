<template>
  <main>
    <div class="container">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">Inscription</h1>
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
            type="username"
            class="form-row_input"
            id="username"
            required
            aria-label="username"
            placeholder="Nom"
            v-model="user.username"
            name="username"
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
        <button @click="saveUser" class="btn  btn-connex">
        S'inscrire
      </button>
        <div class="form-row">
        <p class="card-subtitle">Tu as déjà un compte</p>
        <button @click="verifieUser" class="btn  btn-connex">
              Se connecter
            </button>
         </div>
      </div>
    </div>
    </div>
  </main>
</template>
<script>
import { signup } from "../services/user";
export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        username: "",
        email: "",
        password: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    // Verification des inputs username, email et MDP lors de l'inscription
    validForm() {
      let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
        "g"
      );
      // Tester l'expression regex
      let testUsername = this.user.username.length > 0;
      let testEmail = emailRegExp.test(this.user.email);
      let testPassword = this.user.password.length > 5;
      console.log({ testEmail, testPassword, testUsername });
      return testEmail && testPassword && testUsername;
    },
    // Enregistrement d'un user
    saveUser() {
      const data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };
      const isformValid = this.validForm();
      if (isformValid) {
        signup(data)
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => console.log(err));
      } else {
        alert("Veuillez renseignez tous les champs SVP!!");
      }
      // S'inscrire
    },
    verifieUser() {
      this.$router.push("/");
    },
    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
};
</script>
<style lang="scss">
main {
  min-height: 500px;
  width: 100%;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 30px;
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.form-row_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
  width: 100%;
}
.form-row_input::placeholder {
  color: #aaaaaa;
}
.card {
  width: 400px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  margin-top: 20px;
}
.card-title {
  text-align: center;
  font-weight: 800;
  color:rgb(19, 19, 85);
}
.card-subtitle {
  color: rgb(31, 29, 29);
  font-weight: 500;
}
.btn {
  color:white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  border: none;
  width: 100%;
  padding: 10px;
  transition: 0.4s background-color;
}
.btn-connex{
  background: radial-gradient(103.18% 236.51% at 96.82% 50%, #D13650 0%, #D33B64 32.29%, #9C3D80 54.17%, #3565A5 100%), #1D1D1B;
}
</style>