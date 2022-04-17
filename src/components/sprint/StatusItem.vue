<template>
    <div>
        <div class="header"><strong>{{ status }}</strong></div>
        <div class="body">
            <TicketCard
                v-for="ticket in tickets"
                :key="ticket.id"
                :id="ticket.id"
                :title="ticket.title"
                :type="ticket.type"
                :priority="ticket.priority"
                :executor="ticket.executor"
            />
        </div>
    </div>
</template>

<script>
import TicketCard from "@/components/task/TicketCard";
export default {
    name: "StatusItem",
    components: {TicketCard},
    props: ['status'],
    computed: {
        tickets() {
            return this.$store.getters.tickets.filter(ticket => ticket.status === this.status);
        }
    },
}
</script>

<style scoped>

.header {
    font-size: 1rem;
    text-align: center;
    width: 15rem;
    height: 2rem;
    background-color: rgba(208, 215, 215, 0.5);
    margin-right: 0.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(208, 215, 215, 0.5);
    border-radius: 0.3rem;
}

.body {
    width: 15rem;
    background-color: rgba(208, 215, 215, 0.5);
    padding: 0.1rem 0;
    border: 1px solid rgba(208, 215, 215, 0.5);
    border-radius: 0.3rem;
    margin-right: 0.5rem;
    min-height: 11.5rem;
}
</style>