<template>
    <div class="task-container">
        <h4>{{title}}</h4>
        <div class="drop-zone"
            @drop="onDrop($event, status)"
            @dragenter.prevent
            @dragover.prevent>
            <small-task-item v-for="task in tasks"
                             :key="task.id"
                             :id="task.id"
                             :title="task.title"
                             :code="task.code"
                             :type="task.type"
                             :priority="task.priority"
                             :assigner="task.assigner.name"
                             :bl="task.backlogId"
            />
<!--            <small-task-item v-for="task in sprintTasks"-->
<!--                             :key="task.id"-->
<!--                             :id="task.id"-->
<!--                             :title="task.title"-->
<!--                             :code="task.code"-->
<!--                             :type="task.type"-->
<!--                             :priority="task.priority"-->
<!--                             :assigner="task.assigner.name"-->
<!--                             :bl="task.backlogId"-->
<!--            />-->
    <!--        <small-task-item title="Lizaveta Rabtsava"/>-->
    <!--        <small-task-item title="Drapeza Anna"/>-->
    <!--        <small-task-item title="Darya Hesselton"/>-->
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, toRefs} from "vue";
import SmallTaskItem from "@/components/sprint/SmallTaskItem.vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
export default defineComponent({
    name: "TasksContainer",
    components: {SmallTaskItem},
    props: {
        title: {
            type: String,
            required: true
        },
        containerId: {
            type: Number,
            required: true
        },
        backlogId: {
            type: Number,
            required: true
        },
        sprintId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const {containerId} = toRefs(props);
        
        const store = useStore();
        const route = useRoute();
        const currentProject = computed(() => store.getters['auth/currentProject']);
        const {backlogId, sprintId} = toRefs(props);
        // const backlogId = computed(() => currentProject.value.backlogId);
        // const sprintId = computed(() => currentProject.value.sprintId);
        
        onMounted( () => {
            const {backlogId, sprintId} = toRefs(props);
            console.log(backlogId.value);
            console.log(sprintId.value);
            store.dispatch('task/fetchTasksBySprintId', {sprintId: backlogId.value, type: 'backlog'});
            store.dispatch('task/fetchTasksBySprintId', {sprintId: sprintId.value, type: 'sprint'});
        });
        
        const backlogTasks = computed(() => store.getters['task/fetchedBacklogTasks']);
        const sprintTasks = computed(() => store.getters['task/fetchedSprintTasks']);
        
        // const tasks = computed(() => fetchedTasks.value.filter((task: any) => {
        //     // console.log(task);
        //     if (task.value.sprint_id) {
        //         return task.value.sprintId === containerId.value
        //     } else {
        //         return task.value.backlogId === containerId.value
        //     }
        // }));
        const tasks = containerId.value === backlogId.value ? backlogTasks : sprintTasks;
        
        const onDrop = (event: DragEvent) => {
        //
        }
        
        return {
            tasks,
            backlogTasks,
            sprintTasks,
            onDrop
        }

        
    }
})
</script>

<style scoped lang="scss">
.task-container {
    margin: 30px 0;
}
</style>