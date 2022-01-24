import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Inscription from '../views/Inscription.vue'
import Tache from '../views/Tache.vue'


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
        path: '/Tache',
        name: 'Tache',
        component: Tache,

    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router