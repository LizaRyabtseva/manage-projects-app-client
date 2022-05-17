<template>
    <div class="type-container">
        <div class="square" :class="[type.toLowerCase()]"></div>
        <div class="title" :class="[`${type.toLowerCase()}-title`]">{{ type }}</div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "TheType",
    props: {
        type: {
            type: String,
            required: true
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.type-container {
    display: flex;
    flex-direction: row;
}

.square {
    width: 1.25rem;
    height: 1.1rem;
    margin-right: 0.3rem;
    
    &.epic {
        background-color: $color-epic;
    }
    
    &.story {
        background-color: $color-story;
    }
    
    &.task {
        background-color: $color-task;
    }
    
    &.sub-task {
        background-color: $color-sub-task;
    }
    
    &.bug {
        background-color: $color-bug;
    }
}

.title {
    background-color: transparent;
    
    &.epic-title {
        color: $color-epic;
    }
    
    &.story-title {
        color: $color-story;
    }
    
    &.task-title {
        color: $color-task;
    }
    
    &.sub-task-title {
        color: $color-sub-task;
    }
    
    &.bug-title {
        color: $color-bug;
    }
}
</style>