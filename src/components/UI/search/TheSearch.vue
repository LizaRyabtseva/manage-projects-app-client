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
        />
<!--    </form>-->
    <results-container v-if="show && category === 'users'" :class="size">
        <result-item v-for="user in foundData" :id="user.id" :key="user.id"
                     :value="user.email"
                     @choose="chooseHandler"/>
    </results-container>
    <results-container v-else-if="show && category === 'projects'" :class="size">
        <result-item v-for="project in foundData" :id="project.id" :key="project.id"
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
    emits: ['choose', 'blur'],
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
        if (category.value === 'users') {
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
                store.dispatch('api/searchHandler', {category: category.value, value});
                toggleShow(true);
            } else {
                toggleShow(false);
            }
        };

        const chooseHandler = (id: string) => {
            emit('choose', {value: id});
        }

        const blurHandler = () => {
            // toggleShow(false);
            emit('blur');
        }

        // const choose = () => {
        //
        // }
        
        return {
            foundData,
            show,
            searchHandler,
            chooseHandler,
            blurHandler
        }
    }
})
</script>

<style scoped lang="scss">


</style>