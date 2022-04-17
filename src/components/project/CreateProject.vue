<template>
    <base-container>
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
            </div>
            <div class="action">
                <the-button type="submit" mode="dark" size="large">Create</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import TheInput from "@/components/UI/TheInput.vue";
import TheButton from "@/components/UI/TheButton.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import IProject from '@/models/IProject';

export default defineComponent({
    name: "CreateProject",
    components: {BaseContainer, TheButton, TheInput},
    setup() {
        const title = ref('');
        const code = ref('');
        const description = ref('');
        const store = useStore();
        const router = useRouter();
    
        const submitHandler = () => {
            const newProject: IProject = {
                title: title.value,
                code: code.value,
                description: description.value
            };
            store.dispatch('project/createProject', newProject);
            router.replace('/projects');
        }
        
        return {
            title,
            code,
            description,
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

</style>