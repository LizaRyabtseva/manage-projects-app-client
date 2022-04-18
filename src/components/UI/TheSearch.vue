<template>
    <form>
        <the-input
            @search="searchHandler"
            type="search"
            :label-placeholder="labelPlaceholder"
            :size="size" />
    </form>
    <results-container
        v-if="show && category === 'users'"
        :class="size"
    >
        <div v-for="user in foundData" :id="user.id" :key="user.id">
            <result-item :value="user.email" @choose="$emit('choose')"/>
        </div>
    </results-container>
    <results-container
        v-else-if="show && category === 'projects'"
        :class="size"
    >
        <div v-for="project in foundData" :id="project.id" :key="project.id">
            <div class="found-value">{{project.title}}</div>
        </div>
    </results-container>
    
</template>

<script lang="ts">
import {defineComponent, computed, ref, toRefs} from "vue";
import {useStore} from "vuex";
import TheInput from "@/components/UI/TheInput.vue";
import ResultsContainer from "@/components/UI/ResultsContainer.vue";
import ResultItem from "@/components/UI/ResultItem.vue";

export default defineComponent({
    name: "TheSearch",
    components: {ResultItem, ResultsContainer, TheInput},
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
    },
    setup(props) {
        const {category} = toRefs(props);
        const show = ref(false);
        const store = useStore();

        let foundData;
        if (category.value === 'users') {
           foundData = computed(() => store.getters['api/foundUsers']);
        } else if (category.value === 'projects') {
            foundData = computed(() => store.getters['api/foundProjects']);
        }
        
        const toggleData = (value: boolean) => {
            show.value = value;
        }
        
        // watch(foundData, () => toggleData(true));
        
        const searchHandler = (value: string) => {
            if (value.length > 2) {
                store.dispatch('api/searchHandler', {category: category.value, value});
                toggleData(true);
            } else {
                toggleData(false);
            }
        };

        // const choose = () => {
        //
        // }
        
        return {
            foundData,
            show,
            searchHandler
        }
    }
})
</script>

<style scoped lang="scss">
.found-value {
    background-color: #A3D9E0;
}


</style>