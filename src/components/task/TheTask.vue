<template>
    <base-container>
        <h4 class="task-title">{{task.project.title}} / {{task.title}} / {{task.code}}</h4>
        <div class="detail links">
            <router-link :to="`/projects/${projectId}/tasks/edit/${taskId}`">Edit</router-link>
        </div>
        <div class="detail">
            <the-priority :priority="task.priority"/>
            <the-type :type="task.type" />
        </div>
        <div class="detail">
            <span class="item-title">status</span>
            <span>{{task.status}}</span>
        </div>
        <div class="detail">
            <span class="item-title">description</span>
            <span>{{task.description}}</span>
        </div>
        <div class="detail">
            <span class="item-title">people</span>
            <span class="item-title">assigner</span>
            <span>{{task.assigner.name}}</span>
            <span class="item-title">creator</span>
            <span>{{task.creator.name}}</span>
        </div>
    </base-container>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
import TheType from "@/components/dashboard/TheType.vue";
import ThePriority from "@/components/dashboard/ThePriority.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
export default defineComponent({
    name: "TheTask",
    components: {ThePriority, TheType, BaseContainer},
    setup() {
        const route = useRoute();
        const store = useStore();
        const {projectId, taskId} = route.params;

        onMounted(() => {
            store.dispatch('task/fetchTask', taskId);
        });

        const fetchedTask = computed(() => store.getters['task/fetchedTask']);

        return {
            task: fetchedTask,
            projectId,
            taskId
        }
    },
    
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.task-title {
    background-color: $color-primary;
}
</style>