<template>
    <h1>Your tickets</h1>
    <StatusItem>
        <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :id="ticket.id"
            :title="ticket.title"
            :type="ticket.type"
            :priority="ticket.priority"
            :executor="ticket.executor"
        />
    </StatusItem>
<!--    <div class="tickets">-->

<!--    </div>-->
</template>

<script>
import TicketCard from "@/components/task/TicketCard";
import StatusItem from "@/components/sprint/StatusItem";
export default {
    name: "TicketsList",
    components: {StatusItem, TicketCard},
    computed: {
        tickets() {
            return this.$store.getters.tickets;
        }
    }
}
</script>

<style scoped>
h1 {
    margin: 0.5rem;
}
.tickets {
    display: flex;
    flex-direction: column;
}
</style>