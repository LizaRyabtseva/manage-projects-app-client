<template>
    <div class="task-container">
        <h4 class="task-title">{{title}}</h4>
        <div v-if="containerId === -1 && !sprintId">
            <the-input
                :error="startV.dateStart.$errors.length > 0"
                type="date"
                label-placeholder="Start of sprint"
                size="small"
                v-model="dateStart"
            />
            <the-input
                :error="endV.dateEnd.$errors.length > 0"
                type="date"
                label-placeholder="End of sprint"
                size="small"
                v-model="dateEnd"
            />
            <div class="input-errors" v-for="error of startV.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div class="input-errors" v-for="error of endV.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
            <the-button @click="submitHandler"
                        size="small"
                        mode="dark"
            >START</the-button>
        </div>
        <div v-else-if="sprintId && containerId !== backlogId">
            <h5>{{sprint.dateStart}} — {{sprint.dateEnd}}</h5>
        </div>
        <div class="drop-zone"
            @drop="onDrop($event, containerId)"
            @dragenter.prevent
            @dragover.prevent>
            <small-task-item
                v-for="task in tasks"
                :key="task.id"
                :id="task.id"
                :title="task.title"
                :code="task.code"
                :type="task.type"
                :priority="task.priority"
                :assigner="task.assigner.name"
                :to="`/projects/${currentProject.id}/tasks/${task.id}`"
                draggable="true"
                @dragstart="startDrag($event, task)"
            />
<!--            сформировать to-->
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, toRefs, ref} from "vue";
import SmallTaskItem from "@/components/sprint/SmallTaskItem.vue";
import {useStore} from "vuex";
import ITask from "@/models/ITask";
import TaskStatus from "@/models/TaskStatus";
import TheInput from "@/components/UI/TheInput.vue";
import TheButton from "@/components/UI/TheButton.vue";
import useVuelidate from '@vuelidate/core';
import {helpers, required, minValue} from "@vuelidate/validators";

export default defineComponent({
    name: "TasksContainer",
    components: {TheButton, TheInput, SmallTaskItem},
    props: {
        title: {
            type: String,
            required: true
        },
        containerId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const currentUser = computed(() => store.getters['auth/userId']);
        const currentProject = computed(() => store.getters['auth/currentProject']);
        const sprintId = computed(() => currentProject.value.sprintId);
        const backlogId = computed(() => currentProject.value.backlogId);
        const projectId = computed(() => currentProject.value.id);
        let {containerId} = toRefs(props);
        
        onMounted( () => {
            if (containerId.value) {
                store.dispatch('task/fetchTasks', {
                    backlogId: backlogId.value,
                    sprintId: sprintId.value
                });
            }
            if (sprintId.value) {
                store.dispatch('sprint/fetchSprint', sprintId.value);
            }
        });
        
        const fetchedSprint = computed(() => store.getters['sprint/fetchedSprint']);
        const dateStart = ref('');
        const dateEnd = ref('');
        
        const dateCheck = (value: string) => {
            let now = new Date();
            const date = new Date(value);
            return now.getTime() - date.getTime() <= 0 || now.toLocaleDateString() === date.toLocaleDateString();
        };
        
        const dateCheckEnd = (start: string, end: string) => {
            return new Date(start) < new Date(end);
        }
        
        const startRules = computed(() => {
            return {
                dateStart: {
                    required: helpers.withMessage('Start of sprint field is required', required),
                    minValue: helpers.withMessage('You can not start sprint early than today',
                        () => dateCheck(dateStart.value)),
                    $autoDirty: true
                }
            }
        });
    
        const endRules = computed(() => {
            return {
                dateEnd: {
                    required: helpers.withMessage('End of sprint field is required', required),
                    minValue: helpers.withMessage('End of sprint should be later than start',
                        () => dateCheckEnd(dateStart.value, dateEnd.value)),
                    $autoDirty: true
                }
            }
        });
        
        const startV = useVuelidate(startRules, {dateStart});
        const endV = useVuelidate(endRules, {dateEnd});
        
        const fetchedTasks = computed(() => store.getters['task/fetchedTasks']);
        const tasks = computed(() => fetchedTasks.value.filter(
            (task: any) => task.sprintId === containerId.value));
       
        const startDrag = (event: DragEvent, task: Partial<ITask>) => {
            if (event.dataTransfer && task.id) {
                event.dataTransfer.dropEffect = 'move';
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('taskId', task.id.toString());
            }
        }
        
        const onDrop = (event: DragEvent, sprintId: number) => {
            if (event.dataTransfer) {
                const taskId = event.dataTransfer.getData('taskId');
                const task = computed(() => fetchedTasks.value.find(
                    (task: any) => task.id === +taskId));
                task.value.sprintId = sprintId;
                task.value.status = TaskStatus.todo;

                store.dispatch('task/updateTask', {
                    task: task.value,
                    taskId: task.value.id
                });
            }
        }
        
        const submitHandler = async (event: Event) => {
            event.preventDefault();
            try {
                await store.dispatch('sprint/startSprint', {
                    dateStart: dateStart.value,
                    dateEnd: dateEnd.value,
                    projectId: projectId.value
                });
            } catch (err) {
                console.log(err);
            }
            try {
                await store.dispatch('auth/fetchCurrentProject', currentUser.value);
            } catch (err) {
                console.log(err);
            }
        }
        
        return {
            currentProject,
            sprint: fetchedSprint,
            backlogId,
            sprintId,
            projectId,
            dateStart,
            dateEnd,
            tasks,
            startV,
            endV,
            startDrag,
            onDrop,
            submitHandler
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.task-container {
    margin: 30px 0;
}

.drop-zone {
    //width: 15rem;
    width: 80%;
    background-color: $color-status-background;
    padding: 0.1rem 0;
    //border: 1px solid $color-status-background;
    border-radius: 0.3rem;
    margin-right: 0.5rem;
    min-height: 120px;
}

.task-title {
    color: darken($color-primary, 25%);
}
</style>