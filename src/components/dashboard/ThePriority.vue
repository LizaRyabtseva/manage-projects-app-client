<template>
    <div class="priority-container">
        <span v-if="priority === 'Low'" class="material-symbols-outlined">
            keyboard_double_arrow_down
        </span>
        <span v-else-if="priority === 'High'" class="material-symbols-outlined">
            keyboard_double_arrow_up
        </span>
        <span v-else-if="priority === 'Medium'" class="material-symbols-outlined">
            density_large
        </span>
        <span>{{priority}}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "ThePriority",
    props: {
        priority: {
            type: String,
            required: true
        }
    },
})
</script>

<style scoped lang="scss">

.priority-container {
    display: flex;
    flex-direction: row;
    
    .material-symbols-outlined {
        margin-right: 0.3rem;
    }
}

</style>