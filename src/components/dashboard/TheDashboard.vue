<template>
    <base-container>
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
import {defineComponent} from "vue";
import StatusContainer from "@/components/dashboard/StatusContainer.vue";
import BaseContainer from "@/components/UI/BaseContainer.vue";
import TaskStatus from "@/models/TaskStatus";
export default defineComponent({
    name: "TheDashboard",
    components: {StatusContainer, BaseContainer},
    props: {
        sprintId: {
            type: Number,
            required: true
        },
    },
    setup() {
        const statuses = Object.values(TaskStatus);
        
        return {
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