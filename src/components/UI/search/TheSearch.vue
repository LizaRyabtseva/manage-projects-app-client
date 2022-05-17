<template>
<!--    <form>-->
    <the-input
        type="search"
        :model-value="modelValue"
        :label-placeholder="labelPlaceholder"
        v-bind="$attrs"
        :size="size"
        @blur="blurHandler"
        @search="searchHandler"
        @delete-user="deleteHandler"
    />
<!--    </form>-->
    <results-container v-if="show && (category === 'users' || category === 'usersInProject')"
                       :class="size">
        <result-item v-for="user in foundData"
                     :id="user.id"
                     :key="user.id"
                     :value="user.email"
                     @choose="chooseHandler"/>
    </results-container>
    <results-container v-else-if="show && category === 'projects'"
                       :class="size">
        <result-item v-for="project in foundData"
                     :id="project.id"
                     :key="project.id"
                     :value="project.title"
                     @choose="chooseHandler(project.id)"/>
    </results-container>
    
</template>

<script lang="ts">
import {defineComponent, computed, ref, toRefs} from "vue";
import {useStore} from "vuex";
import TheInput from "@/components/UI/TheInput.vue";
import ResultsContainer from "@/components/UI/search/ResultsContainer.vue";
import ResultItem from "@/components/UI/search/ResultItem.vue";

export default defineComponent({
    name: "TheSearch",
    components: {ResultItem, ResultsContainer, TheInput},
    emits: ['choose', 'blur', 'deleteUser'],
    props: {
        category: {
            type: String,
            required: true
        },
        labelPlaceholder: {
            default: null,
            type: [String, Number],
            required: false
        },
        size: {
            default: 'normal',
            type: String,
            required: false
        },
        modelValue: {
            default: '',
            type: [String, Number],
            required: false
        },

    },
    setup(props, {emit}) {
        const {category} = toRefs(props);
        const show = ref(false);
        const store = useStore();

        let foundData;
        if (category.value === 'users' || category.value === 'usersInProject') {
           foundData = computed(() => store.getters['api/foundUsers']);
        } else if (category.value === 'projects') {
            foundData = computed(() => store.getters['api/foundProjects']);
        }
        
        const toggleShow = (value: boolean) => {
            show.value = value;
        }
        
        // watch(foundData, () => toggleData(true));
        
        const searchHandler = (value: string) => {
            if (value.length > 2) {
                let payload: {category: string, value: string, projectId?: number} = {category: category.value, value};
                if (category.value === 'usersInProject') {
                    const projectId: number = store.getters['auth/currentProject'].id;
                    payload = {...payload, projectId};
                }
                store.dispatch('api/searchHandler', payload);
                toggleShow(true);
            } else {
                toggleShow(false);
            }
        };

        const chooseHandler = (value: {id: number, email: string}) => {
            emit('choose', value);
        }

        const blurHandler = () => {
            emit('blur');
            setTimeout(() => toggleShow(false), 200);
        }

        const deleteHandler = (value: number) => {
            emit('deleteUser', value);
        }
        
        return {
            foundData,
            show,
            searchHandler,
            chooseHandler,
            blurHandler,
            deleteHandler
        }
    }
})
</script>

<style scoped lang="scss">

</style>