<template>
    <base-container>
        <h4>{{title}}</h4>
        <p>{{status}}</p>
        <p>{{code}}</p>
        <p>{{description}}</p>
        <p>Project leader</p>
        <p>{{owner}}</p>
        <router-link to="/backlog">Backlog</router-link>
        <router-link to="/sprints/1">Sprint</router-link>
    </base-container>
</template>

<script lang="ts">
import {useRoute} from 'vue-router';
import {defineComponent} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
export default defineComponent({
    name: "TheProject",
    components: {BaseContainer},
    props: {
        title: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        owner: {
            type: String,
            required: true
        }
    },
    setup() {
        const route = useRoute();
        console.log(route.path);
    }
})
</script>

<style scoped>

</style>
