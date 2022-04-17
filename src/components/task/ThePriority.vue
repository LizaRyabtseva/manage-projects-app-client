<template>
    <p class="priority">
        <svg v-if="priority === 'Low'" fill="none" height="13" viewBox="0 0 22 22" width="13"  xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75735 5.63605L6.34314 7.05026L12 12.7071L17.6569 7.05029L16.2427 5.63608L12 9.87872L7.75735 5.63605Z" fill="currentColor"/>
            <path d="M6.34314 12.7071L7.75735 11.2929L12 15.5356L16.2427 11.2929L17.6569 12.7071L12 18.364L6.34314 12.7071Z" fill="currentColor"/>
        </svg>
        <svg v-else-if="priority === 'Medium'" fill="none" height="13" viewBox="0 0 22 22" width="13"  xmlns="http://www.w3.org/2000/svg">
            <path d="M5 9C4.44772 9 4 9.44771 4 10C4 10.5523 4.44772 11 5 11H19C19.5523 11 20 10.5523 20 10C20 9.44771 19.5523 9 19 9H5Z" fill="currentColor"/>
            <path d="M5 13C4.44772 13 4 13.4477 4 14C4 14.5523 4.44772 15 5 15H19C19.5523 15 20 14.5523 20 14C20 13.4477 19.5523 13 19 13H5Z" fill="currentColor"/>
        </svg>
        <svg v-else fill="none" height="13" viewBox="0 0 22 22" width="13"  xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6569 11.2929L16.2427 12.7071L12 8.46444L7.75735 12.7071L6.34314 11.2929L12 5.63605L17.6569 11.2929Z" fill="currentColor"/>
            <path d="M17.6569 16.9497L16.2427 18.3639L12 14.1213L7.75735 18.364L6.34314 16.9498L12 11.2929L17.6569 16.9497Z" fill="currentColor"/>
        </svg>
        {{ priority }}
    </p>
</template>

<script>
export default {
    name: "ThePriority",
    props: ['priority'],
}
</script>

<style scoped>
.priority {
    margin-right: 0.3rem;
}
</style>