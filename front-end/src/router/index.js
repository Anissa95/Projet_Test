import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Inscription from '../views/Inscription.vue'
import Home from '../views/Home.vue'


// Afin de garder la session ouverte de l'utilisateur, on crée authenticate pour verifier la présence ou pas du token dans localstorage

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Inscription',
        name: 'Inscription',
        component: Inscription
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,

    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router