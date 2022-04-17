<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <TheType :type="type" />
        <div class="row">
            <ThePriority :priority="priority" />
            <p>{{ executor.name }}</p>
        </div>
    </div>
</template>

<script>
import ThePriority from "@/components/task/ThePriority";
import TheType from "@/components/task/TheType";
export default {
    name: "TicketCard",
    components: {TheType, ThePriority},
    props: ['id', 'title', 'type', 'priority', 'executor']
}
</script>

<style scoped>

.card {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border: 1px solid #2C2F3159;
    box-shadow: 0px 0px 2px 1px #2C2F3159;
    border-radius: 0.3rem;
    /*width: 15%;*/
    margin: 0.3rem;
    background-color: #ffffff;
}

h2 {
    font-size: 1rem;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>