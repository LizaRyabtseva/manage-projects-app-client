<template>
    <sidebar default-index="1" static-position>
        <template v-slot:header>
            <h4>Project Title</h4>
        </template>
        <sidebar-item :to="routes.projects">My projects</sidebar-item>
        <sidebar-item :to="routes.dashboard">Dashboard</sidebar-item>
        <sidebar-item :to="routes.projects">Sprint</sidebar-item>
        <sidebar-item :to="routes.projects">Create task</sidebar-item>
        <template v-slot:footer>
<!--         logout remove-->
        </template>
    </sidebar>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Sidebar from "@/components/nav/Sidebar.vue";
import SidebarItem from "@/components/nav/SidebarItem.vue";
import routesMap from "@/models/routes";

export default defineComponent({
    name: "Navigation",
    components: {SidebarItem, Sidebar},
    setup() {
        return {
            routes: routesMap
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
</style>