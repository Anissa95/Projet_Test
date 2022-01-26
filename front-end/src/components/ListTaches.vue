<template>
  <div class="container-fluid">
    <h1 class="card-actualite">Liste des tâches des employés</h1>
    <div class="button">
      <button
        type="button"
        title="Enregistrer une tâche"
        class="far fa-edit tache"
        v-if="isAdmin === true && isLogged === true"
        @click="goToAddPage"
      >
        Enregistrer une tâche
      </button>
    </div>
    <div class="container mt-4">
      <table class="table table -bordered">
        <thead>
          <tr>
            <th>Employés</th>
            <th>Tâche</th>
            <th>Heure début</th>
            <th>Heure fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tache in taches" :key="tache.id">
            <td>{{ tache.username }}</td>
            <td>{{ tache.tache }}</td>
            <td>{{ tache.heureDebut }}</td>
            <td>{{ tache.heureFin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { getAllTache, deleteTache } from "../services/tache";
import { getUser } from "../services/user";

export default {
  name: "Taches",
  data() {
    return {
      taches: [],
      users: [],
    };
  },
  // Après que le composant soit chargé, on exécute tout ce qui est à l'intérieur de la fct mounted
  mounted() {
    getUser().then((response) => {
      this.users = response.data.result.users;
    });

    getAllTache().then((response) => {
      this.taches = response.data.result.taches;
    });
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.isAdmin;
    },
    isLogged() {
      return this.$store.state.user.isLogged;
    },
  },
  methods: {
    deleteTache(id) {
      deleteTache(id).then(() => {
        getAllTache().then((response) => {
          this.taches = response.data.result.taches;
        });
      });
    },

    goToAddPage() {
      this.$router.push("AddTache");
    },
  },
};
</script>
<style lang="scss">
.container-fluid {
  margin-top: 20px;
}


.far.fa-edit.tache {
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  border: none;
  padding: 10px;
  background: radial-gradient(
      103.18% 236.51% at 96.82% 50%,
      #d13650 0%,
      #d33b64 32.29%,
      #9c3d80 54.17%,
      #3565a5 100%
    ),
    #1d1d1b;
}

.form-control {
  margin-bottom: 10px;
}
</style>

