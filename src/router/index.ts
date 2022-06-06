import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import routesMap from "@/models/routes";
// import {useStore} from "vuex";
import Authorization from '../components/auth/Authorization.vue';
import EditProject from '../components/project/EditProject.vue';
import AllProjects from '../components/project/AllProjects.vue';
import MyProjects from '../components/project/MyProjects.vue';
import EditTask from '../components/task/EditTask.vue';
// import TheDashboard from '../components/sprint/TheDashboard.vue';
import TheDashboard from '../components/dashboard/TheDashboard.vue';
import TheProject from "@/components/project/TheProject.vue";
import TheTask from "@/components/task/TheTask.vue";
import TheBacklog from "@/components/sprint/TheBacklog.vue";
import TheSpinner from '../components/UI/spinner/TheSpinner.vue';
// import TicketsList from '../components/task/TicketsList.vue';
// import TicketPage from '../components/task/TicketPage.vue';
import StatusContainer from '../components/dashboard/StatusContainer.vue';

const routes: Array<RouteRecordRaw> = [{
    path: routesMap.auth,
    name: 'auth',
    component: Authorization
}, {
    path: routesMap.createProject,
    name: 'createProject',
    component: EditProject
},{
    path: routesMap.editProject,
    name: 'editProject',
    component: EditProject
}, {
    path: routesMap.projects,
    name: 'projects',
    component: AllProjects
}, {
    path: routesMap.myProjects,
    name: 'myProjects',
    component: MyProjects
},{
    path: routesMap.createTask,
    name: 'createTask',
    component: EditTask,
}, {
    path: routesMap.editTask,
    name: 'editTask',
    component: EditTask,
}, {
    path: routesMap.createSprint,
    name: 'createSprint',
    component: StatusContainer
}, {
    path: routesMap.dashboard,
    name: 'dashboard',
    component: TheDashboard
}, {
    path: routesMap.project,
    name: 'project',
    component: TheProject
}, {
    path: routesMap.task,
    name: 'task',
    component: TheTask
}, {
    path: routesMap.backlog,
    name: 'backlog',
    component: TheBacklog 
}, {
    path: routesMap.spinner,
    name: 'spinner',
    component: TheSpinner
}];

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