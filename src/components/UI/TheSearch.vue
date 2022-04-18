<template>
    <form>
        <the-input
            @search="searchHandler"
            type="search"
            label-placeholder="Project title"
            size="small"></the-input>
    </form>
        <found-data v-if="show">
            <div v-for="user in foundData" :id="user.id" :key="user.id">
                <div>{{user.name}}</div>
                <div>{{user.email}}</div>
                <div>{{user.id}}</div>
            </div>
    
            <div v-for="project in foundData" :id="project.id" :key="project.id">
                <div>{{project.title}}</div>
                <div>{{project.code}}</div>
                <div>{{project.description}}</div>
            </div>
        </found-data>
    
</template>

<script lang="ts">
import {defineComponent, computed, ref, toRefs} from "vue";
import {useStore} from "vuex";
import TheInput from "@/components/UI/TheInput.vue";
import FoundData from "@/components/UI/FoundData.vue";

export default defineComponent({
    name: "TheSearch",
    components: {FoundData, TheInput},
    props: {
        category: {
            type: String,
            required: true
        }
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
            console.log(foundData);
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
        
        return {
            foundData,
            show,
            searchHandler
        }
    }
})
</script>

<style scoped>

</style>