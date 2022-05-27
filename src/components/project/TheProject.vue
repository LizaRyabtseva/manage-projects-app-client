<template>
    <base-container>
        <h4 class="project-title">{{project.title}}</h4>
        <div class="detail links">
            <router-link :to="routes.backlog">Backlog</router-link>
            <router-link :to="routes.dashboard">Sprint</router-link>
<!--            edit доступно только для хозяина проекта-->
            <router-link :to="`/projects/edit/${projectId}`">Edit</router-link>
            <the-button mode="dark" size="small">Make current</the-button>
        </div>
        <div class="detail">
            <span class="status-container">
                <span v-if="project.status === status.active"
                      class="material-symbols-outlined">
                    clear_day
                </span>
                <span v-else-if="project.status === status.finished"
                      class="material-symbols-outlined">
                    clear_night
                </span>
                 <span>{{project.status}}</span>
            </span>
        </div>
        <div class="detail">
            <span class="item-title">code</span>
            <span>{{project.code}}</span>
        </div>
        <div class="detail">
            <span class="item-title">description</span>
            <span>{{project.description}}</span>
        </div>
        <div class="detail">
            <span class="item-title">project leader</span>
            <span>{{project.owner.name}}</span>
        </div>
        <div class="detail">
            <span class="item-title">team</span>
            <div v-for="member in project.allTeam" :key="member.id">
                <span>{{member.name}} ({{member.email}})</span>
            </div>
        </div>
    </base-container>
</template>

<script lang="ts">
import {useRoute} from 'vue-router';
import {useStore} from "vuex";
import {defineComponent, onMounted, computed} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
import ProjectStatus from "@/models/ProjectStatus";
import routesMap from "@/models/routes";
import TheButton from "@/components/UI/TheButton.vue";
export default defineComponent({
    name: "TheProject",
    components: {TheButton, BaseContainer},
    setup() {
        const route = useRoute();
        const store = useStore();
        const {projectId} = route.params;

        onMounted(() => {
            store.dispatch('project/fetchProject', projectId);
        });

        const fetchedProject = computed(() => store.getters['project/fetchedProject']);

        return {
            projectId,
            project: fetchedProject,
            routes: routesMap,
            status: ProjectStatus
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.project-title {
    background-color: $color-primary;
}


</style>
