<template>
    <div class="status-container">
        <div class="header"><strong>{{ status }}</strong></div>
        <div
            class="drop-zone"
            @drop="onDrop($event, status)"
            @dragenter.prevent
            @dragover.prevent
        >
<!--            сформировать to-->
            <task-card
                v-for="task in tasks"
                :key="task.id"
                :id="task.id"
                :title="task.title"
                :type="task.type"
                :priority="task.priority"
                :assigner="task.assigner.name"
                to="/task/1"
                draggable="true"
                @dragstart="startDrag($event, task)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, toRefs, computed} from "vue";
import {useStore} from "vuex";
import TaskCard from "@/components/dashboard/TaskCard.vue";

import ITask from "@/models/ITask";
export default defineComponent({
    name: "StatusContainer",
    components: {TaskCard},
    props: {
        status: {
            type: String,
            required: true
        },
        sprintId: {
            type: String,
            required: true
        },
        containerId: {
            type: Number,
            required: false
        }
    },
    setup(props) {
        const {status, sprintId} = toRefs(props);
        const store = useStore();
        
        onMounted(() => {
            store.dispatch('sprint/fetchTasksBySprintId', sprintId.value);
        });
    
        const fetchedTasks = computed(() => store.getters['sprint/tasks']);
        let tasks = computed(() => fetchedTasks.value.filter((task: any) =>
            task.status === status.value));
        
        const startDrag = (event: DragEvent, task: Partial<ITask>) => {
            if (event.dataTransfer && task.id) {
                event.dataTransfer.dropEffect = 'move';
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('taskId', task.id.toString());
            }
        }
        
        const onDrop = (event: DragEvent, status: string) => {
            if (event.dataTransfer) {
                const taskId = event.dataTransfer.getData('taskId');
                const task = computed(() => fetchedTasks.value.find((task: Partial<ITask>) =>
                    task.id === +taskId));
                task.value.status = status;
                // store.commit('task/setFetchedTask', task);
                store.dispatch('task/updateTask', {task: task.value, taskId: task.value.id});
            }
        }
        
        return {
            tasks,
            startDrag,
            onDrop
        }
    },
    // data() {
    //     return {
    //         tasks: [{
    //             id: 1,
    //             title: 'Create page for registration',
    //             type: Type.epic,
    //             priority: Priority.low,
    //             executor: 'Lizaveta Rabtsava',
    //             status: 'To do',
    //             to: '/task1'
    //     }, {
    //             id: 2,
    //             title: 'Task 2',
    //             type: Type.story,
    //             priority: Priority.high,
    //             executor: 'Vlad Vlasenko',
    //             status: TaskStatus.inProgress,
    //             to: '/task2'
    //     }, {
    //             id: 3,
    //             title: 'Task 3',
    //             type: Type.task,
    //             priority: Priority.medium,
    //             executor: 'Vlad Vlasenko',
    //             status: TaskStatus.todo,
    //             to: '/task3'
    //     }, {
    //             id: 4,
    //             title: 'Task 4',
    //             type: Type.subTask,
    //             priority: Priority.medium,
    //             executor: 'Vlad Vlasenko',
    //             status: TaskStatus.inReview,
    //             to: '/task4'
    //     }, {
    //             id: 5,
    //             title: 'Task 5',
    //             type: Type.bug,
    //             priority: Priority.medium,
    //             executor: 'Vlad Vlasenko',
    //             status: TaskStatus.inReview,
    //             to: '/task5'
    //     }, {
    //             id: 6,
    //             title: 'Task 3',
    //             type: Type.epic,
    //             priority: Priority.high,
    //             executor: 'Vlad Vlasenko',
    //             status: TaskStatus.inReview,
    //             to: '/task6'
    //     }]}
    // },
    // computed: {
    //     tickets() {
    //         return this.tasks.filter(task => task.status === this.status);
    //         // return this.$store.getters.tickets.filter(ticket => ticket.status === this.status);
    //     }
    // },
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.status-container {
    width: 88%;
}

.header {
    font-size: 1rem;
    text-align: center;
    //width: 95%;
    //width: 15rem;
    height: 2rem;
    background-color: $color-status-background;
    margin-right: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid $color-status-background;
    border-radius: 0.3rem;
}

.drop-zone {
    //width: 15rem;
    background-color: $color-status-background;
    padding: 0.1rem 0;
    border: 1px solid $color-status-background;
    border-radius: 0.3rem;
    margin-right: 0.5rem;
    min-height: 11.5rem;
}
</style>