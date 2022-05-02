<template>
    <base-container>
        <h4>Create a new project</h4>
        <form class="create-form" @submit.prevent="submitHandler">
            <div class="form-fields">
                <the-input
                    label-placeholder="Project title"
                    size="large"
                    v-model="title"
                ></the-input>
                <the-input
                    label-placeholder="Project code"
                    size="large"
                    v-model="code"
                ></the-input>
                <the-input
                    label-placeholder="Description"
                    v-model="description"
                    size="large"
                    textarea
                ></the-input>
                <the-search
                    label-placeholder="Users E-mails"
                    category="users"
                    size="large"
                    v-model="user"
                    @choose="choose"
                    @blur="blur"
                />
                <p class="search-title">Team</p>
                <the-input
                    v-for="member in team"
                    :key="member.id"
                    :id="member.id"
                    v-model="member.email"
                    size="large"
                    disabled
                    deleted
                    @delete-value="deleteUser(member.id)"
                />
            </div>
            <div class="action">
                <the-button type="submit" mode="dark" size="large">Create</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    computed,
    onMounted,
    WritableComputedRef,
    toRefs
} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import TheInput from "@/components/UI/TheInput.vue";
import TheButton from "@/components/UI/TheButton.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import IProject from '@/models/IProject';
import TheSearch from "@/components/UI/search/TheSearch.vue";

export default defineComponent({
    name: "CreateProject",
    components: {TheSearch, BaseContainer, TheButton, TheInput},
    props: {
        projectId: {
            type: Number,
            required: false
        }
    },
    setup(props) {
        const {projectId} = toRefs(props);
        const store = useStore();
        const router = useRouter();

        onMounted(() => {
            if (projectId.value)
                store.dispatch('project/fetchProject', projectId.value);
        });
        
        const fetchedProject = projectId.value ? computed(() => store.getters['project/fetchedProject']) : ref('');

        const title = projectId.value ? computed({
            get: () => fetchedProject.value.title,
            set: (value) => fetchedProject.value.title = value
        }) : ref('');
        const code = projectId.value ? computed({
            get: () => fetchedProject.value.code,
            set: (value) => fetchedProject.value.code = value
        }) : ref('');
        const description = projectId.value ? computed({
            get: () => fetchedProject.value.description,
            set: (value) => fetchedProject.value.description = value
        }) : ref('');

        const user = ref('');
        const team: any = reactive([]);
        const fetchedTeam: WritableComputedRef<{id: number, email: string}[]> = projectId.value ?
            computed({
                get: () => fetchedProject.value.team,
                set: (value) => fetchedProject.value.team = value
            }) : computed({
                get: () => team,
                set: (value) => team.push(value)
            });

        // const team: WritableComputedRef<> = computed(() => []);


        const submitHandler = () => {
            const memberIds = fetchedTeam.value.map(member => member.id);
            const userId = store.getters['auth/userId'];
            const token = store.getters['auth/token'];
            const project: IProject = {
                id: projectId.value ? projectId.value : -1,
                user: userId,
                title: title.value,
                code: code.value,
                description: description.value,
                team: memberIds
            };
            
            if (projectId.value) {
                store.dispatch('project/updateProject', {project, token});
            } else {
                store.dispatch('project/createProject', {project, token});
            }

            router.replace('/projects');
        }

        const choose = (value: any) => {
            if (fetchedTeam.value.findIndex(member => member.id === value.id.value) === -1)
                fetchedTeam.value.push(value);
        }

        const blur = () => {
            user.value = '';
        }

        const deleteUser = (value: number) => {
            const id = fetchedTeam.value.findIndex(member => member.id === value);
            fetchedTeam.value.splice(id, 1);
        }

        return {
            fetchedProject,
            title,
            code,
            description,
            user,
            team: fetchedTeam,
            choose,
            blur,
            deleteUser,
            submitHandler
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";


</style>