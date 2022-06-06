<template>
    <the-spinner v-if="isLoading" />
    <base-container v-else>
<!--        <h4>Create a new project</h4>-->
        <h4>Edit information about '{{title}}' project</h4>
        <form class="create-form" @submit.prevent="submitHandler">
            <div class="form-fields">
                <the-input
                    :error="titleV.title.$errors.length > 0"
                    label-placeholder="Project title"
                    size="large"
                    v-model="title"
                />
                <the-input
                    :error="codeV.code.$errors.length > 0"
                    label-placeholder="Project code"
                    size="large"
                    v-model="code"
                    length="3"
                    upper
                />
                <the-input
                    :error="descriptionV.description.$errors.length > 0"
                    label-placeholder="Description"
                    v-model="description"
                    size="large"
                    textarea
                />
                <the-select v-if="projectId" size="large" label="Status" v-model="status">
                    <select-option
                        v-for="st in statuses"
                        :key="st"
                        :id="st"
                        :value="st" />
                </the-select>
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
                <div class="input-errors" v-for="error of titleV.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="input-errors" v-for="error of codeV.$errors" :key="error.$uid">
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
                <the-button with-margin type="submit" mode="dark" size="large">{{btnTitle}}</the-button>
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
    WritableComputedRef, watch
} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import useVuelidate from '@vuelidate/core';
import {required, minLength, helpers, maxLength} from '@vuelidate/validators';
import TheInput from "@/components/UI/TheInput.vue";
import TheButton from "@/components/UI/TheButton.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import TheSearch from "@/components/UI/search/TheSearch.vue";
import IProject from '@/models/IProject';
import ProjectStatus from "@/models/ProjectStatus";
import TheSelect from "@/components/UI/select/TheSelect.vue";
import SelectOption from "@/components/UI/select/SelectOption.vue";
import TheSpinner from "@/components/UI/spinner/TheSpinner.vue";

export default defineComponent({
    name: "EditProject",
    components: {TheSpinner, SelectOption, TheSelect, TheSearch, BaseContainer, TheButton, TheInput},
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const isLoading = ref(false);
        const {projectId} = route.params;
        const btnTitle = projectId ? 'UPDATE' : 'SUBMIT';
        const submitError = ref('');

        onMounted(() => {
            if (projectId) {
                isLoading.value = true;
                store.dispatch('project/fetchProject', projectId);
            }
        });
    
        const fetchedProject = projectId ?
            computed(() => store.getters['project/fetchedProject']) : ref('');
    
        watch(fetchedProject, (newValue) => {
            if (newValue) {
                setInterval(() => {
                    isLoading.value = false;
                }, 2000);
            }
        });
    
        const title = projectId ? computed({
            get: () => fetchedProject.value.title,
            set: (value) => fetchedProject.value.title = value
        }) : ref('');
        
        const code = projectId ? computed({
            get: () => fetchedProject.value.code,
            set: (value) => fetchedProject.value.code = value
        }) : ref('');
    
        const description = projectId ? computed({
            get: () => fetchedProject.value.description,
            set: (value) => fetchedProject.value.description = value
        }) : ref('');
    
        const status = projectId ? computed({
            get: () => fetchedProject.value.status,
            set: (value) => fetchedProject.value.status = value,
        }) : ref(ProjectStatus.active);
    
        const statuses = Object.values(ProjectStatus);
        
        const titleRules = computed(() => {
            return {
                title: {
                    required: helpers.withMessage('Title field is required', required),
                    minLength: helpers.withMessage('Title field should be at least 4 characters long', minLength(4)),
                    $autoDirty: true
                }
            }
        });
        
        const codeRules = computed(() => {
            return {
                code: {
                    required: helpers.withMessage('Code field is required', required),
                    minLength: helpers.withMessage('Code field should be 3 characters long', minLength(3)),
                    maxLength: helpers.withMessage('Code field should be 3 characters long', maxLength(3)),
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

        const titleV = useVuelidate(titleRules, {title});
        const codeV = useVuelidate(codeRules, {code});
        const descriptionV = useVuelidate(descriptionRules, {description});

        const user = ref('');
        const team: any = reactive([]);
        const fetchedTeam: WritableComputedRef<{id: number, email: string}[]> =
            projectId ?
                computed({
                    get: () => fetchedProject.value.team,
                    set: (value) => fetchedProject.value.team = value
                }) : computed({
                    get: () => team,
                    set: (value) => team.push(value)
                });


        const submitHandler = async () => {
            const isFormCorrect = await titleV.value.$validate() &&
                await codeV.value.$validate() &&
                await descriptionV.value.$validate();
    
            submitError.value = '';
            
            if (isFormCorrect) {
                const memberIds = fetchedTeam.value.map(member => member.id);
                const userId = store.getters['auth/userId'];
                const token = store.getters['auth/token'];
                let project: Partial<IProject> = {};
                if (projectId) {
                    project = {
                        id: projectId ? +projectId : -1,
                        owner: userId,
                        title: title.value,
                        code: code.value,
                        status: status.value,
                        description: description.value,
                        team: memberIds
                    };
                    
                    try {
                        await store.dispatch('project/updateProject', {project, token});
                        await router.replace('/projects');
                    } catch (err) {
                        submitError.value = err;
                    }
                } else {
                    project = {
                        id: projectId ? +projectId : -1,
                        owner: userId,
                        title: title.value,
                        code: code.value,
                        status: status.value,
                        description: description.value,
                        team: memberIds
                    }
                    try {
                        await store.dispatch('project/createProject', {project, token});
                        await router.replace('/projects');
                    } catch (err) {
                        submitError.value = err;
                    }
                }
            } else {
            //
            }
        }

        const choose = (val: any) => {
            if (fetchedTeam.value.findIndex(member => member.id === val.id.value) === -1)
                fetchedTeam.value.push({id: val.id.value, email: val.email.value});
        }

        const blur = () => {
            user.value = '';
        }

        const deleteUser = (value: number) => {
            const id = fetchedTeam.value.findIndex(member => member.id === value);
            fetchedTeam.value.splice(id, 1);
        }

        return {
            isLoading,
            btnTitle,
            fetchedProject,
            projectId,
            title,
            code,
            description,
            status,
            statuses,
            user,
            team: fetchedTeam,
            titleV,
            codeV,
            descriptionV,
            submitError,
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