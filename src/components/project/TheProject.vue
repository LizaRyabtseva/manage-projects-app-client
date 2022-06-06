<template>
    <base-container>
        <h4 class="project-title">{{project.title}}</h4>
        <div class="detail links">
            <router-link :to="routes.backlog">Backlog</router-link>
            <router-link :to="routes.dashboard">Sprint</router-link>
<!--            edit доступно только для хозяина проекта-->
            <router-link v-if="ownerId === userId" :to="`/projects/edit/${projectId}`">Edit</router-link>
        </div>
        <div v-if="project.status === status.active">
            <the-button v-if="(currentProjectId !== project.id && project.status === status.active)" @click="makeCurrent" mode="dark" size="small">MAKE CURRENT</the-button>
            <div v-else class="detail">
            <span class="status-container">
                <span class="material-symbols-outlined">
                    check_circle
                </span>
                <span class="current">Current project</span>
            </span>
            </div>
        </div>
<!--        <the-button v-if="(currentProjectId !== project.id && project.status === status.active)" @click="makeCurrent" mode="dark" size="small">MAKE CURRENT</the-button>-->
<!--        <div v-else-if="" class="detail">-->
<!--            <span class="status-container">-->
<!--                <span class="material-symbols-outlined">-->
<!--                    check_circle-->
<!--                </span>-->
<!--                <span class="current">Current project</span>-->
<!--            </span>-->
<!--        </div>-->
        <div class="detail space">
            <span class="item-title">project's status</span>
            <span class="status-container">
                <span v-if="project.status === status.active"
                      class="material-symbols-outlined">
                    clear_day
                </span>
                <span v-else-if="project.status === status.finished"
                      class="material-symbols-outlined">
                    clear_night
                </span>
                 <span class="project-status" :class="[project.status.toLowerCase()]">{{project.status}}</span>
            </span>
        </div>
        <div class="detail">
            <span class="item-title">code</span>
            <span>{{project.code}}</span>
        </div>
        <div class="detail description">
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
import {defineComponent, onMounted, computed, watch, ref} from "vue";
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
        const userId = computed(() => store.getters['auth/userId']);
        const currentProject = computed(() => store.getters['auth/currentProject']);
        const currentProjectId = computed(() => currentProject.value.id);
        
        const owner = computed(() => currentProject.value.owner);
        const isCurrent = ref(false);
        
        onMounted(() => {
            store.dispatch('project/fetchProject', projectId);
        });

        const fetchedProject = computed(() => store.getters['project/fetchedProject']);
    
        const ownerId = computed(() => fetchedProject.value.ownerId);
        
        const makeCurrent = () => {
            try {
                store.dispatch('project/makeCurrentProject', {projectId: +projectId, userId: userId.value});
            } catch (err) {
                console.log(err);
            }
        };
        
        watch(currentProjectId, (newValue) => {
            if (+projectId === newValue) {
                isCurrent.value = true;
            }
        });
        
        // watch(owner, (newValue) => {
        //     console.log(newValue.value);
        //     if (userId.value === newValue.id) {
        //         isEdit.value = true;
        //     }
        // });

        return {
            isCurrent,
            ownerId,
            userId,
            currentProjectId,
            // isEdit,
            projectId,
            project: fetchedProject,
            makeCurrent,
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
.active {
    color: $color-task;
}

.finished {
    color: $color-epic;
}

.material-symbols-outlined {
    margin-right: 5px;
}

.space {
    margin-top: 30px;
}

.description {
    padding-right: 200px;
}
</style>
