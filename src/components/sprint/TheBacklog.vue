<template>
    <the-spinner v-if="!backlogId" />
    <base-container v-else>
        <h4>Backlog</h4>
<!--        <the-search label-placeholder="Find task" category="tasks" size="small" v-model="searchTask"/>-->
        <tasks-container
            v-for="container in tasksContainers"
            :key="container.id"
            :container-id="container.id"
            :backlog-id="backlogId"
            :sprint-id="sprintId"
            :project-id="projectId"
            :title="container.title"
        />
        
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
import TasksContainer from "@/components/sprint/TasksContainer.vue";
import {useStore} from "vuex";
import TheSpinner from "@/components/UI/spinner/TheSpinner.vue";
export default defineComponent({
    name: "TheBacklog",
    components: {TheSpinner, TasksContainer, BaseContainer},
    setup() {
        const store = useStore();
        const currentProject = computed(() => store.getters['auth/currentProject']);
        const backlogId = computed(() => currentProject.value.backlogId);
        const sprintId = computed(() => currentProject.value.sprintId);
        const projectId = computed(() => currentProject.value.id);
        const tasksContainers = computed(() => {
            return [{
               id: currentProject.value.sprintId ? currentProject.value.sprintId : -1,
               title: 'Selected for development'
            }, {
                id: currentProject.value.backlogId ? backlogId.value : -2,
                title: 'Backlog'
            }];
        })
        // const tasksContainers: any = reactive([]);
        // const fetchedTasksContainers: WritableComputedRef<{id: number, title: string}[]> =
        //     currentProject.value.sprintId ?
        //         computed({
        //             get: () => currentProject.value.sprintId,
        //             set: (value) => currentProject.value
        //         }) : computed({
        //             get: () => tasksContainers,
        //             set: (value) => tasksContainers.push(value)
        //         });
        // {
        //     id: currentProject.value.sprintId,
        //     title: 'Selected for development'
        // }, {
        //     id: currentProject.value.backlogId,
        //     title: 'Backlog'
        // }]);
        
        const searchTask = ref('');
        
        return {
            projectId,
            backlogId,
            sprintId,
            tasksContainers,
            searchTask
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
</style>