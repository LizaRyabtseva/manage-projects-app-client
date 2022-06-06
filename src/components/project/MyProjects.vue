<template>
    <the-spinner v-if="isLoading"/>
    <base-container v-else>
        <h4>Your projects</h4>
<!--        <h4>Browse Projects</h4>-->
<!--        <the-search-->
<!--            label-placeholder="Project title"-->
<!--            category="projects"-->
<!--            size="small"-->
<!--        />-->
        <div v-if="projects.length > 0" class="project-items">
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
        <div v-else>
            <h5>Unfortunately, not involved in any project.</h5>
        </div>
    </base-container>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import TheSpinner from "@/components/UI/spinner/TheSpinner.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import TheSearch from "@/components/UI/search/TheSearch.vue";
import ProjectItem from "@/components/project/ProjectItem.vue";
import {useStore} from "vuex";

export default defineComponent({
    name: "MyProjects",
    components: {ProjectItem, BaseContainer, TheSpinner},
    setup() {
        const isLoading = ref(false);
        const projectHeader = computed(() => store.getters['project/projectHeaderTable']);
        const store = useStore();
        const userId = computed(() => store.getters['auth/userId']);
    
        onMounted(() => {
            if (userId.value) {
                isLoading.value = true;
                store.dispatch('project/fetchProjectByUserId', userId.value);
            }
        });
        
        // watch(userId, (newValue) => {
        //     isLoading.value = true;
        //     store.dispatch('project/fetchProjectByUserId', newValue);
        // });
        
        const projects = computed(() => store.getters['project/fetchedProjects']);
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
@import '../../assets/styles';

</style>