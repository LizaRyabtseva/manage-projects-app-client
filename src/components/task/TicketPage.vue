<template>
    <div class="ticket">
        <h1>{{ ticket.title }}</h1>
        <div class="row">
            <TheType :type="ticket.type" />
            <ThePriority :priority="ticket.priority"/>
        </div>
        <div class="column">
            <p class="information-title">Description</p>
            <p class="information-value">{{ ticket.description }}</p>
        </div>
        <h2>Details</h2>
        <div class="column">
            <p class="information-title">TaskStatus</p>
            <p class="information-value">{{ ticket.status }}</p>
        </div>
        <div class="column">
            <p class="information-title">Executor</p>
            <p class="information-value">{{ ticket.executor.name }}</p>
        </div>
        <div class="column">
            <p class="information-title">Author</p>
            <p class="information-value">{{ ticket.creator.name }}</p>
        </div>
        <div class="column">
            <p class="information-title">Sprint</p>
            <p class="information-value">First sprint</p>
        </div>
        <div class="column">
            <p class="information-title">Estimation</p>
            <p class="information-value">{{ ticket.estimation }}</p>
        </div>
    </div>
</template>

<script>
import TheType from "@/components/task/TheType";
import ThePriority from "@/components/task/ThePriority";
export default {
    name: "TicketPage",
    components: {ThePriority, TheType},
    data() {
        return {
            id: 2
        }
    },
    computed: {
        ticket() {
            return this.$store.getters.getTicketById(this.id);
        }
    }
}
</script>

<style scoped>

.ticket {
    display: flex;
    flex-direction: column;
    width: 65%;
    margin: 0 auto;
}

.row {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
}

h1 {
    border: 1px solid rgba(208, 215, 215, 0.5);
    background-color: rgba(208, 215, 215, 0.5);
}

.column {
    display: flex;
    flex-direction: column;
}

.information-title {
    color: #323232;
    font-size: 0.8rem;
}

.information-value {
    margin-bottom: 1rem;
    margin-right: 0.5rem;
    font-size: 1rem;
}
</style>