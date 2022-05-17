<template>
    <base-container>
        <h4 class="project-title">{{project.title}}</h4>
        <div class="project-detail">
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
        <div class="project-detail">
            <span class="item-title">code</span>
            <span>{{project.code}}</span>
        </div>
        <div class="project-detail">
            <span>{{project.description}}</span>
        </div>
        <div class="project-detail">
            <span class="item-title">project leader</span>
            <span>{{project.user.name}}</span>
        </div>
        <div class="project-detail">
            <span class="item-title">team</span>
            <div v-for="member in project.allTeam" :key="member.id">
                <span>{{member.name}} ({{member.email}})</span>
            </div>
        </div>
        <div class="project-detail">
            <router-link to="/backlog">Backlog</router-link>
            <router-link to="/sprints/1">Sprint</router-link>
        </div>
    </base-container>
</template>

<script lang="ts">
import {useRoute} from 'vue-router';
import {useStore} from "vuex";
import {defineComponent, onMounted, computed} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
import ProjectStatus from "@/models/ProjectStatus";
export default defineComponent({
    name: "TheProject",
    components: {BaseContainer},
    setup() {
        const route = useRoute();
        const store = useStore();
        const {projectId} = route.params;

        onMounted(() => {
            store.dispatch('project/fetchProject', projectId);
        });

        const fetchedProject = computed(() => store.getters['project/fetchedProject']);

        return {
            project: fetchedProject,
            status: ProjectStatus
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.project-title {
    background-color: $color-border;
}

.project-detail {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 12px 0;

    .status-container {
        display: flex;
        flex-direction: row;
        align-content: center;
    }

    .item-title {
        font-size: 75%;
        color: $color-dark;
    }
}


</style>
