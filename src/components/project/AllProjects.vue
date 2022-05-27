<template>
    <the-spinner v-if="isLoading"/>
    <base-container v-else>
        <h4>Browse Projects</h4>
        <the-search
            label-placeholder="Project title"
            category="projects"
            size="small"
        />
        <div class="project-items">
            <project-item
                class="project-header"
                :project="projectHeader"
            />
            <project-item
                v-for="pr in projects"
                :key="pr.id"
                :id="pr.id"
                :project="pr"
                :to="`/projects/${pr.id}`"
                :status="pr.status"
            />
        </div>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, computed, ref, watch, onMounted} from "vue";
import {useStore} from "vuex";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import TheSearch from "@/components/UI/search/TheSearch.vue";
import ProjectItem from "@/components/project/ProjectItem.vue";
import TheSpinner from "@/components/UI/spinner/TheSpinner.vue";

export default defineComponent({
    name: "AllProjects",
    components: {TheSpinner, ProjectItem, TheSearch, BaseContainer},
    setup() {
        const isLoading = ref(false);
        const projectHeader = computed(() => store.getters['project/projectHeaderTable']);
        const store = useStore();
        onMounted(() => {
            isLoading.value = true;
            store.dispatch('project/fetchProjects');
        });
    
        const projects = computed(() => store.getters['project/projects']);
        watch(projects, (newValue) => {
            if (newValue) {
                setInterval(() => {
                    isLoading.value = false;
                }, 2000);
            }
        });
        
        return {
            isLoading,
            projects,
            projectHeader
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.project-items {
    margin-top: 40px;
}

.project-header {
    font-weight: 600;
}

.projects-container {
    width: 84%;
    margin: 20px;
}

</style>