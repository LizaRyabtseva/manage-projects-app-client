<template>
    <div class="project-items">
        <project-item
            class="project-header"
            :project="projectHeader"
        >
        </project-item>
        <project-item
            v-for="pr in projects"
            :key="pr.id"
            :id="pr.id"
            :project="pr"
            to="#"
            :status="pr.status"
        >
        </project-item>
    </div>
</template>

<script>
import ProjectItem from "@/components/project/ProjectItem";
import {defineComponent, computed } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
    name: "ProjectsList",
    components: {ProjectItem},
    setup() {
        const projectHeader = computed(() => store.getters['project/projectHeaderTable']);
        const store = useStore();
        store.dispatch('project/fetchProjects');
        const projects = computed(() => store.getters['project/projects']);

        return {
            projects,
            projectHeader
        }
    }
})
</script>

<style scoped lang="scss">
@import '../../assets/variables';
@import '../../assets/styles';

.project-items {
    margin-top: 40px;
}

.project-header {
    font-weight: 600;
}

</style>