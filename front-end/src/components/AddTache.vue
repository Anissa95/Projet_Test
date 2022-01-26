<template>
  <div class="container">
    <!-- Nouvelle tache -->
    <form id="formTache" class="card-tache">
      <div class="header-box">
        <h1 class="card-title">Nouvelle tâche</h1>
      </div>
      <div class="style-li">
        <div class="mb-3">
          <select class="form-control">
            <option for="tache" class="form-label">
              Choisissez un employé
            </option>
            <input
              v-for="user in users"
              :key="user.id"
              v-model="title"
              class="form-control"
              name="tache"
              id="tache"
              type="text"
            />
          </select>
        </div>
        <div class="mb-3">
          <label for="tache" class="form-label">Tache</label>
          <input
            v-model="title"
            class="form-control"
            name="tache"
            id="tache"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label for="heureDebut" class="form-label">Heure de début</label>
          <input
            v-model="heureDebut"
            class="form-control"
            name="heureDebut"
            id="heureDebut"
            type="time "
          />
        </div>
        <div class="mb-3">
          <label for="heureFin" class="form-label">Heure fin</label>
          <input
            v-model="heureFin"
            class="form-control"
            name="heureFin"
            id="heureFin"
            type="time "
          />
        </div>
        <div class="form-row">
          <button @click="submitData" type="button" class="btn btn-connex">
            Valider
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { getUser } from "../services/user";
import { createTache } from "../services/tache";
export default {
  name: "AjoutTache",
  data() {
    return {
      username: "",
      tache: "",
      heureDebut: "00:00:00",
      heureFin: "00:00:00",
    };
  },
  mounted() {
    getUser().then((response) => {
      this.users = response.data.result.users;
    });
  },
  methods: {
    /* Envoie des données*/
    submitData() {
      if (this.submitDisabled) {
        return;
      }
      let formData = {};
      formData = new FormData(document.getElementById("formTache"));
      // Création d'un nouveau tache
      createTache(formData)
        .then(() => {
          // Se diriger vers la page d'actualite
          this.$router.push("/tache");
        })
        .catch((err) => {
          console.log("Erreur: " + err);
        });
    },
  },
};
</script>
<style lang="scss">
.card-tache {
  width: 800px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  margin-top: 20px;
}

</style>