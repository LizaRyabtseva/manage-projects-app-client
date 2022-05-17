import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import routesMap from "@/models/routes";
// import {useStore} from "vuex";
import Authorization from '../components/auth/Authorization.vue';
import EditProject from '../components/project/EditProject.vue';
import AllProjects from '../components/project/AllProjects.vue';
import EditTask from '../components/task/EditTask.vue';
// import TheDashboard from '../components/sprint/TheDashboard.vue';
import TheDashboard from '../components/dashboard/TheDashboard.vue';
import TheProject from "@/components/project/TheProject.vue";
// import TicketsList from '../components/task/TicketsList.vue';
// import TicketPage from '../components/task/TicketPage.vue';
import StatusContainer from '../components/dashboard/StatusContainer.vue';

const routes: Array<RouteRecordRaw> = [{
    path: routesMap.auth,
    name: 'auth',
    component: Authorization
}, {
    path: routesMap.createProject,
    name: 'editProject',
    component: EditProject,
    props: {
        projectId: 1
    }
}, {
    path: routesMap.projects,
    name: 'projects',
    component: AllProjects
}, {
    path: routesMap.createTask,
    name: 'editTask',
    component: EditTask,
    props: {
        projectId: 1,
        sprintId: 1,
        // taskId: 3
    }
}, {
    path: routesMap.createSprint,
    name: 'createSprint',
    component: StatusContainer
}, {
    path: routesMap.dashboard,
    name: 'dashboard',
    component: TheDashboard,
    props: {
        sprintId: 1
    }
}, {
    path: routesMap.project,
    name: 'project',
    component: TheProject
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