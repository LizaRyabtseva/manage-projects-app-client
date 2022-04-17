<template>
    <div class="type-container">
        <div class="type" :class="[type.toLowerCase()]"></div>
        <p :class="[type.toLowerCase()]">{{ type }}</p>
    </div>
</template>

<script>
export default {
    name: "TheType",
    props: ['type']
}
</script>

<style scoped>
.type-container {
    display: flex;
    flex-direction: row;
}

.type {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
}

.epic {
    background-color: blueviolet;
}

.story {
    background-color: #08a808;
}

.task {
    background-color: #0ca8d7;
}

.sub-task {
    background-color: #f8561b;
}

.bug {
    background-color: #f51f1f;
}

.type-container p.epic {
    background-color: transparent;
    color: blueviolet;
    margin-right: 0.3rem;
}

.type-container p.story {
    background-color: transparent;
    color: #08a808;
    margin-right: 0.3rem;
}

.type-container p.task {
    background-color: transparent;
    color: #0ca8d7;
    margin-right: 0.3rem;
}

.type-container p.sub-task {
    background-color: transparent;
    color: #f8561b;
    margin-right: 0.3rem;
}

.type-container p.bug {
    background-color: transparent;
    color: #f51f1f;
    margin-right: 0.3rem;
}
</style>