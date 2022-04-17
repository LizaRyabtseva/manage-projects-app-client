<template>
    <form>
        <the-input
            @search="searchHandler"
            @blur="blurHandler"
            type="search"
            label-placeholder="Project title"
            size="small"></the-input>
    </form>
    <div v-if="showUsers">
        <div v-for="user in foundUsers" :id="user.id" :key="user.id">
            <span>{{user.name}}</span>
            <span>{{user.email}}</span>
            <span>{{user.id}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, watch} from "vue";
import {useStore} from "vuex";
import TheInput from "@/components/UI/TheInput.vue";

export default defineComponent({
    name: "TheSearch",
    components: {TheInput},
    setup() {
        const showUsers = ref(false);
        const store = useStore();
        let foundUsers = computed(() => store.getters['api/foundUsers']);
        
        const toggleUsers = (value: boolean) => {
            showUsers.value = value;
        }
        
        watch(foundUsers, () => toggleUsers(true));
        
    
        const searchHandler = (value: string) => {
            if (value.length > 2) {
                toggleUsers(true);
                store.dispatch('api/searchUser', value);
            } else {
                toggleUsers(false);
            }
        };
        
        return {
            foundUsers,
            showUsers,
            searchHandler
        }
    }
})
</script>

<style scoped>

</style>