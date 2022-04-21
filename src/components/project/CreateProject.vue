<template>
    <base-container>
        {{fetchedProject}}
        <h4>Create a new project</h4>
        <form @submit.prevent="submitHandler">
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
                    label-placeholder="User's E-mail"
                    category="users"
                    size="large"
                    v-model="user"
                    @choose="choose"
                    @blur="blur"
                />
                <p class="team-title">Team</p>
                <the-input
                    v-for="member in team"
                    :key="member.id"
                    :id="member.id"
                    v-model="member.email"
                    size="large"
                    disabled
                    @delete-user="deleteUser(member.id)"
                />
            </div>
            <div class="action">
                <the-button type="submit" mode="dark" size="large">Create</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, computed, watch, onMounted} from "vue";
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
    setup() {
        // как-то так надо сделать для обновления
        const store = useStore();
        onMounted(() => {
            store.dispatch('project/fetchProject', 3);
        })
        
        const fetchedProject = computed(() => store.getters['project/fetchedProject']);
        console.log(fetchedProject);
        
        // const title = ref('');
        // watch(title, (newValue: string) => {
        //     title.value = newValue;
        // });
        const title = computed(() => fetchedProject.value.title) || ref('');
        // const title = fetchedProject.value.title || ref('');
        const code = ref('');
        const description = ref('');
        const user = ref('');
        let team: Array<{id: number, email: string}> = reactive([]);
        // let team: Ref<{id: number, email: string}>[] = reactive([]);
        
        const router = useRouter();
    
        const submitHandler = () => {
            const memberIds = team.map(member => member.id);
            const userId = store.getters['auth/userId'];
            const newProject: IProject = {
                id: userId,
                title: title.value,
                code: code.value,
                description: description.value,
                team: memberIds
            };
            store.dispatch('project/createProject', newProject);
            router.replace('/projects');
        }

        const choose = (value: any) => {
            if (team.findIndex(member => member.id === value.id.value) === -1)
                team.push(value);
        }

        const blur = () => {
            user.value = '';
        }

        const deleteUser = (value: number) => {
            const id = team.findIndex(member => member.id === value);
            team.splice(id, 1);
        }

        return {
            fetchedProject,
            title,
            code,
            description,
            user,
            team,
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

form {
    @include setBorder(1px, 'all', $color-border);
    width: 50%;
    margin: 0 auto;
    box-shadow: 2px 5px 6px 1px $color-border;
    border-radius: 3px;
}

.form-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.action {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

//.team {
//    @include setBorder(1px, 'all', $color-border);
//    display: flex;
//    flex-direction: column;
//    //color: $color-dark;
//}

.team-title {
    color: darken($color-primary, 25%);
    width: 90%;
    margin-top: 20px;
    font-size: 80%;
    //margin: 0 auto;
}

</style>