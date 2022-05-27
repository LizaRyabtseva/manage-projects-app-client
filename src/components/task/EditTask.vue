<template>
    <the-spinner v-if="isLoading" />
    <base-container v-else>
        <h4>Create a new task</h4>
        <form class="create-form" @submit.prevent="submitHandler">
            <div class="form-fields">
                <the-input
                    :error="titleV.title.$errors.length > 0"
                    label-placeholder="Task title"
                    size="large"
                    v-model="title" />
                <the-input
                    label-placeholder="Task code"
                    size="large"
                    disabled
                    v-model="code" />
                <the-input
                    :error="descriptionV.description.$errors.length > 0"
                    label-placeholder="Description"
                    v-model="description"
                    size="large"
                    textarea />
                <the-input
                    :error="estimationV.estimation.$errors.length > 0"
                    label-placeholder="Estimation"
                    v-model.number="estimation"
                    type="number"
                    size="large" />
                <the-select size="large" label="Priority" v-model="priority">
                    <select-option
                        v-for="pr in priorities"
                        :key="pr"
                        :id="pr"
                        :value="pr" />+-
                        :value="st" />
                </the-select>
                <the-select size="large" label="Type" v-model="type">
                    <select-option
                        v-for="t in types"
                        :key="t"
                        :id="t"
                        :value="t" />
                </the-select>
                <the-search
                    label-placeholder="User's E-mail"
                    category="usersInProject"
                    size="large"
                    v-model="userSearch"
                    @choose="choose"
                    @blur="blur"
                />
                <p class="search-title">Assigner</p>
                <the-input v-for="as in assigner"
                           :key="as.id"
                           :id="as.id"
                           v-model="as.email"
                           size="large"
                           disabled
                           deleted
                           @delete-value="deleteUser"
                />
                <div class="input-errors" v-for="error of titleV.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="input-errors" v-for="error of estimationV.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="input-errors" v-for="error of descriptionV.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="input-errors">
                    <div class="error-msg">{{submitError}}</div>
                </div>
            </div>
            <div class="action">
                <the-button type="submit" mode="dark" size="large">{{btnTitle}}</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref, computed, Ref, toRefs, onMounted, reactive, WritableComputedRef, watch} from "vue";
import {useStore} from "vuex";
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers, numeric } from '@vuelidate/validators';
import ITask from "@/models/ITask";
import TheButton from "@/components/UI/TheButton.vue";
import TheInput from "@/components/UI/TheInput.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue"
import TheSelect from "@/components/UI/select/TheSelect.vue";
import SelectOption from "@/components/UI/select/SelectOption.vue";
import TheSearch from "@/components/UI/search/TheSearch.vue";
import Priority from "@/models/Priority";
import Type from "@/models/Type";
import TaskStatus from "@/models/TaskStatus";
import {useRoute} from "vue-router";
import router from "@/router";
import TheSpinner from "@/components/UI/spinner/TheSpinner.vue";

export default defineComponent({
    name: "EditTask",
    components: {TheSpinner, TheSearch, SelectOption, TheSelect, BaseContainer, TheInput, TheButton},
    setup() {
        const route = useRoute();
        const store = useStore();
        const isLoading = ref(false);
        const currentProject = computed(() => store.getters['auth/currentProject']);
        const {projectId, taskId} = route.params;
        const submitError = ref('');
        const btnTitle = taskId ? 'UPDATE' : 'SUBMIT';
        
        onMounted(() => {
            if (taskId) {
                isLoading.value = true;
                store.dispatch('task/fetchTask', taskId);
            }
            store.dispatch('api/countTasks', projectId);
        });
        
        const fetchedTask = taskId ?
            computed(() => store.getters['task/fetchedTask']) : ref('');
        
        const fetchedCountTasks = computed(() => store.getters['api/countTasks']);
    
        watch(fetchedTask, (newValue) => {
            if (newValue) {
                setInterval(() => {
                    isLoading.value = false;
                }, 2000);
            }
        });

        const title = taskId ? computed({
            get: () => fetchedTask.value.title,
            set: (value) => fetchedTask.value.title = value
        }) : ref('');
        const code = taskId ? computed({
            get: () => fetchedTask.value.code,
            set: (value) => fetchedTask.value.code = value
        }) : computed(() => `${currentProject.value.code}-${fetchedCountTasks.value + 1}`);

        const description = taskId ? computed({
            get: () => fetchedTask.value.description,
            set: (value) => fetchedTask.value.description = value
        }) : ref('');
        
        const estimation = taskId ? computed({
            get: () => fetchedTask.value.estimation,
            set: (value) => fetchedTask.value.estimation = value
        }) : ref('');
    
        const titleRules = computed(() => {
            return {
                title: {
                    required: helpers.withMessage('Title field is required', required),
                    minLength: helpers.withMessage('Title field should be at least 4 characters long', minLength(4)),
                    $autoDirty: true
                }
            }
        });
    
        const descriptionRules = computed(() => {
            return {
                description: {
                    required: helpers.withMessage('Description field is required', required),
                    minLength: helpers.withMessage('Description field should be at least 10 characters long', minLength(10)),
                    $autoDirty: true
                }
            }
        });
        
        const estimationRules = computed(() => {
            return {
                estimation: {
                    required: helpers.withMessage('Estimation field is required', required),
                    numeric: helpers.withMessage('Estimation field should contain only numbers', numeric),
                    $autoDirty: true
                }
            }
        });
        
        const titleV = useVuelidate(titleRules, {title});
        const descriptionV = useVuelidate(descriptionRules, {description});
        const estimationV = useVuelidate(estimationRules, {estimation});
        
        const userSearch = ref('');
        let assigner: any = reactive([]);
        const fetchedAssigner: WritableComputedRef<{id: number, email: string}[]> =
            taskId ?
                computed({
                    get: () => fetchedTask.value.assigner,
                    set: (value) => fetchedTask.value.assigner = value
                }) : computed({
                    get: () => assigner,
                    set: (value) => assigner.push(value)
                });
        
        const priority: Ref<Priority> = taskId ? computed({
            get: () => fetchedTask.value.priority,
            set: (value) => fetchedTask.value.priority = value
        }) : ref(Priority.low);
        const status = taskId ? computed({
            get: () => fetchedTask.value.status,
            set: (value) => fetchedTask.value.status = value,
        }) : ref(TaskStatus.todo);
        const type: Ref<Type> = taskId ? computed({
            get: () => fetchedTask.value.type,
            set: (value) => fetchedTask.value.type = value
        }) : ref(Type.epic);
        const priorities = Object.values(Priority);
        const types = Object.values(Type);
        const statuses = Object.values(TaskStatus);
    
        const blur = () => {
            userSearch.value = '';
        }
        
        const choose = (val: any) => {
            deleteUser();
            fetchedAssigner.value.push({id: +val.id.value, email: val.email.value.toString()});
        }
        
        const deleteUser = () => {
            fetchedAssigner.value.pop();
        }
        
        const submitHandler = async () => {
            const isFormCorrect = await titleV.value.$validate() &&
                await descriptionV.value.$validate() &&
                await estimationV.value.$validate();
            
            submitError.value = '';
            
            const userId = store.getters['auth/userId'];
            const token = store.getters['auth/token'];
            
            if (isFormCorrect) {
    
                if (taskId) {
                    const task: Partial<ITask> = {
                        title: title.value,
                        code: code.value,
                        description: description.value,
                        estimation: +estimation.value,
                        priority: priority.value,
                        type: type.value,
                        status: status.value,
                        assignerId: fetchedAssigner.value[0].id
                    };

    
                    try {
                        await store.dispatch('task/updateTask', {task, taskId});
                    } catch (err) {
                        submitError.value = err;
                    }
                } else {
                    const task: Partial<ITask> = {
                        title: title.value,
                        code: code.value,
                        description: description.value,
                        estimation: +estimation.value,
                        priority: priority.value,
                        type: type.value,
                        assignerId: fetchedAssigner.value[0].id
                    };
    
                    try {
                        await store.dispatch('task/createTask', {
                            task,
                            token,
                            userId,
                            projectId,
                            sprintId: currentProject.value.backlogId
                        });
                       
                        await router.replace(`/sprints/${currentProject.value.backlogId}`);
                    } catch (err) {
                        submitError.value = err;
                    }
                }
            }
        }
        
        return {
            isLoading,
            btnTitle,
            taskId,
            title,
            code,
            description,
            estimation,
            userSearch,
            priorities,
            assigner: fetchedAssigner,
            priority,
            type,
            types,
            status,
            statuses,
            titleV,
            descriptionV,
            estimationV,
            submitError,
            blur,
            choose,
            deleteUser,
            submitHandler
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

</style>