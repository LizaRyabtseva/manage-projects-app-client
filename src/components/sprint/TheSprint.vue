<template>
    <div class="statuses">
        <StatusItem
            v-for="status in statuses"
            :key="status"
            :id="status"
            :status="status">
        </StatusItem>
    </div>
</template>

<script>
import StatusItem from "@/components/sprint/StatusItem";
export default {
    name: "TheSprint",
    components: {StatusItem},
    computed: {
        statuses() {
            return this.$store.getters.statuses;
        }
    }
}
</script>

<style scoped>
.statuses {
    display: flex;
    flex-direction: row;
}
</style>