<template>
    <sidebar default-index="1" static-position>
        <template v-slot:header>
            <h4 class="project-title">PetSafe</h4>
        </template>
        <sidebar-item :to="routes.myProjects">My projects</sidebar-item>
        <sidebar-item :to="routes.createProject">Create project</sidebar-item>
        <sidebar-item :to="routes.dashboard">Dashboard</sidebar-item>
        <sidebar-item :to="routes.backlog">Backlog</sidebar-item>
        <sidebar-item :to="`/projects/${project.id}/tasks/create`">Create task</sidebar-item>
<!--        <template v-slot:footer>-->
<!--&lt;!&ndash;         logout remove&ndash;&gt;-->
<!--        </template>-->
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
.project-title {
    color: darken($color-primary, 25%);
}
</style>