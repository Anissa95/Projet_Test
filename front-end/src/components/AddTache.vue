<template>
  <div class="container">
    <!-- Nouvelle tache -->
    <form id="formPost" class="card-post">
      <div class="header-box">
        <h1 class="card-title">Nouvelle tâche</h1>
      </div>
      <div class="style-li">
          <div class="mb-3">
        <select class="form-control">
            <option for="tache" class="form-label">Choisissez un employé</option>
          <input
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
            v-model="description"
            class="form-control"
            name="heureDebut"
            id="heureDebut"
            type="time "
          />
        </div>
        <div class="mb-3">
          <label for="heureFin" class="form-label">Heure fin</label>
          <input
            v-model="description"
            class="form-control"
            name="heureDebut"
            id="heureDebut"
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
import { createTache } from "../services/tache";
export default {
  name: "AjoutTache",
  data() {
    return {
      tache: "",
      heureDebut: '00:00:00',
    heureFin:'00:00:00',
    };
  },
  methods: {
    
    /* Envoie des données*/
    submitData() {
      if (this.submitDisabled) {
        return;
      }
      let formData = {};
      formData = new FormData(document.getElementById("formPost"));
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
.validPost {
  margin-left: 10px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  border: none;
  width: 100%;
  padding: 10px;
}
.card-post {
  width: 800px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  margin-top: 20px;
}
.card-description {
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  color: black;
}
#input-image {
  display: none;
}
img {
  width: 300px;
  height: auto;
}
</style>
© 2022 GitHub, Inc.