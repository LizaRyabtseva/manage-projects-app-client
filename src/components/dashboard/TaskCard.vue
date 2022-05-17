<template>
    <div class="task">
        <router-link :to="to">{{ title }}</router-link>
        <the-type :type="type" />
        <div class="row">
            <the-priority :priority="priority" />
            <span>{{ assigner }}</span>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import ThePriority from "@/components/dashboard/ThePriority";
import TheType from "@/components/dashboard/TheType";

export default defineComponent({
    name: "TaskCard",
    components: {TheType, ThePriority},
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        assigner: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        }
    }
    // props: ['id', 'title', 'type', 'priority', 'executor']
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.task {
    font-size: 0.8rem;
    padding: 0.5rem;
    border: 1px solid $color-border;
    box-shadow: 0 0 2px 1px $color-border;
    border-radius: 0.3rem;
    margin: 0.3rem;
    background-color: $color-white;
    
    a {
        text-decoration: none;
        color: $color-dark;
        font-size: 120%;
        font-weight: 500;
        
        &.router-link-active,
        &:hover {
            color: darken($color-dark, 30);
        }
        
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
}


</style>