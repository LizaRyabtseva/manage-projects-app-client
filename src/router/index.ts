import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routesMap from "@/models/routes";
// import {useStore} from "vuex";

import Authorization from '../components/auth/Authorization.vue';
import CreateProject from '../components/project/CreateProject.vue';
import AllProjects from '../components/project/AllProjects.vue';
// import CreateTicket from '../components/task/CreateTicket.vue';
// import TicketsList from '../components/task/TicketsList.vue';
// import Sprint from '../components/sprint/TheSprint.vue';
// import TicketPage from '../components/task/TicketPage.vue';

const routes: Array<RouteRecordRaw> = [{
    path: routesMap.auth,
    name: 'auth',
    component: Authorization
}, {
    path: routesMap.createProject,
    name: 'createProject',
    component: CreateProject
}, {
    path: '/projects',
    name: 'projects',
    component: AllProjects
}];
// , {
//     path: '/create-task',
//     name: 'createTicket',
//     component: CreateTicket,
// }, {
//     path: '/tickets',
//     name: 'tickets',
//     component: TicketsList
// }, {
//     path: '/sprint',
//     name: 'sprint',
//     component: Sprint
// }, {
//     path: '/task',
//     name: 'task',
//     component: TicketPage
// }];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// router.beforeEach(async(to, from) => {
//     const store = useStore();
//     const isLoggedIn = store.getters['auth/isAuthenticated'];
//     console.log(isLoggedIn);
    // const userId = localStorage.getItem('userId');
    // const token = localStorage.getItem('token');
    // if (userId && token) {
    //     const u = store.getters['auth/userId'];
    // }
// })

export default router;