<template>
    <base-container>
        <h4>Create a new task</h4>
        <form class="create-form" @submit.prevent="submitHandler">
            <div class="form-fields">
                <the-input
                    label-placeholder="Task title"
                    size="large"
                    v-model="title" />
                <the-input
                    label-placeholder="Task code"
                    size="large"
                    v-model="code" />
                <the-input
                    label-placeholder="Description"
                    v-model="description"
                    size="large"
                    textarea />
                <the-input
                    label-placeholder="Estimation"
                    v-model.number="estimation"
                    type="number"
                    size="large" />
                <the-select size="large" label="Priority" v-model="priority">
                    <select-option
                        v-for="pr in priorities"
                        :key="pr"
                        :id="pr"
                        :value="pr" />
                </the-select>
<!--                <the-select size="large" label="Status" v-model="status">-->
<!--                    <select-option value="Status" disabled />-->
<!--                    <select-option-->
<!--                        v-for="st in statuses"-->
<!--                        :key="st"-->
<!--                        :id="st"-->
<!--                        :value="st" />-->
<!--                </the-select>-->
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
                <the-input v-if="assigner.id"
                           :key="assigner.id"
                           :id="assigner.id"
                           v-model="assigner.email"
                           size="large"
                           disabled
                           deleted
                           @delete-value="deleteUser"
                />
            </div>
            <div class="action">
                <the-button type="submit" mode="dark" size="large">Create</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref, computed, Ref} from "vue";
import {useStore} from "vuex";
import ITask from "@/models/ITask";
import TheButton from "@/components/UI/TheButton.vue";
import TheInput from "@/components/UI/TheInput.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue"
import TheSelect from "@/components/UI/TheSelect.vue";
import SelectOption from "@/components/UI/SelectOption.vue";
import TheSearch from "@/components/UI/search/TheSearch.vue";
import Priority from "@/models/Priority";
import Type from "@/models/Type";

export default defineComponent({
    name: "CreateTask",
    components: {TheSearch, SelectOption, TheSelect, BaseContainer, TheInput, TheButton},
    // components: {TheSelect, BaseContainer, TheInput, TheButton},
    setup() {
        const title = ref('');
        const code = ref('');
        const description = ref('');
        const estimation = ref('');
        const userSearch = ref('');
        let assigner: any = ref('');
        const fetchedAssigner = computed({
            get: () => assigner,
            set: (value) => {
                [assigner.value] = value
            }
        });
        
        // const fetchedUser: WritableComputedRef<{id: number, email: string}> = computed({
        //     get: () => executor,
        //     set: (value) => executor.value = value
        // })
        const priority: Ref<Priority> = ref(Priority.low);
        // const status = ref('Status');
        const type: Ref<Type> = ref(Type.epic);
        const priorities = Object.values(Priority);
        // const priorities = ['Low', 'Medium', 'High'];
        // const statuses = ['To Do', 'In Progress', 'In Review', 'Done'];
        const types = Object.values(Type);
        
        const store = useStore();
    
        const blur = () => {
            userSearch.value = '';
        }
        
        const choose = (value: any) => {
            assigner.value = value;
        }
        
        const deleteUser = () => {
            assigner.value = '';
        }
        
        const submitHandler = () => {
            const userId = store.getters['auth/userId'];
            const token = store.getters['auth/token'];
            
            const task: Partial<ITask> = {
                title: title.value,
                code: code.value,
                description: description.value,
                estimation: +estimation.value,
                priority: priority.value,
                type: type.value,
                assignerId: assigner.value.id
            };
            
            store.dispatch('task/createTask', {task, token, userId, projectId: 1, backlogId: 1});
        }
        
        return {
            title,
            code,
            description,
            estimation,
            userSearch,
            priorities,
            assigner,
            fetchedAssigner,
            priority,
            type,
            types,
            Priority,
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