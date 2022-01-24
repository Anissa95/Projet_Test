import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const getAllTache = () => axios.get("http://localhost:3000/api/taches", {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
export const getOnetache = (id) => axios.get(`http://localhost:3000/api/taches/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
export const createTache = (tache) =>
    axios.tache("http://localhost:3000/api/taches", tache, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
export const updateTache = (id, tache) =>
    axios.put(`http://localhost:3000/api/taches/${id}`, tache, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
export const deleteTache = (id) =>
    axios.delete(`http://localhost:3000/api/taches/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });