<template>
  <div class="container-fluid">
    <h1 class="card-actualite">Liste des tâches des employés </h1>
    <div class="button">
      <button
        type="button"
        title="Enregistrer une tâche"
        class="far fa-edit tache"
        @click="goToAddPage"
      >
        Enregistrer une tâche
      </button>
      <button
        type="button"
        title="Modifier ou supprimer une tâche"
        class="updateTache"
        @click="goToEditPage">
      Modifier ou supprimer une tâche
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
            <tr v-for="tache in taches" :key="tache.id" >
                <td> {{tache.username}}</td>
                <td>{{tache.tache}}  </td>
                 <td>{{tache.heureDebut}} </td> 
                 <td>{{tache.heureFin}} </td>

                </tr>
                            
                    </tbody>

    </table>  </div>   
          
        </div>
</template>
<script>
import { getAllTache, deleteTache } from "../services/tache";
export default {
  name: "Taches",
  data() {
    return {
      taches: [],
    };
  },
  // Après que le composant soit chargé, on exécute tout ce qui est à l'intérieur de la fct mounted
  mounted() {
    getAllTache().then((response) => {
      this.taches = response.data.result.taches;
    });
  },
  methods: {
    dateOfTache(date) {
      const event = new Date(date);
      const opt = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", opt);
    },
    
    goToEditPage(id) {
      this.$router.push({ name: "EditTache", params: { id } });
    },
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

.style-div {
  display: flex;
  align-items: center;
  gap: 12px;
}
.far.fa-edit.tache, .updateTache {
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
  border: none;
  padding: 10px;
background: radial-gradient(103.18% 236.51% at 96.82% 50%, #D13650 0%, #D33B64 32.29%, #9C3D80 54.17%, #3565A5 100%), #1D1D1B;
}
.style-icon {
  cursor: pointer;
  color: black;
}
.form-control {
  margin-bottom: 10px;
}
.btn-edit-delete-post {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.icon-color {
  color: black;
}

.edit-delete-icon {
  display: flex;
  gap: 12px;
}


</style>

