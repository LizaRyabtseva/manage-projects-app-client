<template>
    <sidebar default-index="1" static-position>
        <template v-slot:header>
            <h4>Project Title</h4>
        </template>
        <sidebar-item :to="routes.projects">My projects</sidebar-item>
        <sidebar-item :to="`/sprints/${project.backlogId}`">Dashboard</sidebar-item>
        <sidebar-item :to="routes.projects">Sprint</sidebar-item>
        <sidebar-item :to="`/projects/${project.id}/tasks/create`">Create task</sidebar-item>
        <template v-slot:footer>
<!--         logout remove-->
        </template>
    </sidebar>
</template>

<script lang="ts">
import {defineComponent, computed} from "vue";
import {useStore} from "vuex";
import Sidebar from "@/components/nav/Sidebar.vue";
import SidebarItem from "@/components/nav/SidebarItem.vue";
import routesMap from "@/models/routes";

export default defineComponent({
    name: "Navigation",
    components: {SidebarItem, Sidebar},
    setup() {
        const store = useStore();
        
        const currentProject = computed(() => store.getters['auth/currentProject']);
    
        return {
            routes: routesMap,
            project: currentProject
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
</style>