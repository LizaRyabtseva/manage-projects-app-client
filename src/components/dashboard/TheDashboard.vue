<template>
    <the-spinner v-if="!sprintId"/>
    <base-container v-else>
        <div class="statuses">
            <status-container
                v-for="status in statuses"
                :key="status"
                :id="status"
                :sprint-id="sprintId"
                :status="status"
                :container-id="statuses.indexOf(status)"
            />
        </div>
    </base-container>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import StatusContainer from "@/components/dashboard/StatusContainer.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import TaskStatus from "@/models/TaskStatus";
import {useStore} from "vuex";
import TheSpinner from "@/components/UI/spinner/TheSpinner.vue";
export default defineComponent({
    name: "TheDashboard",
    components: {TheSpinner, StatusContainer, BaseContainer},
    setup() {
        const store = useStore();
        const currentProject = computed(() => store.getters['auth/currentProject']);
        const sprintId = computed(() => currentProject.value.sprintId);
        const statuses = Object.values(TaskStatus);
        
        return {
            sprintId,
            statuses
        }
        
    }
})
</script>

<style scoped lang="scss">
.statuses {
    display: flex;
    flex-direction: row;
}
</style>