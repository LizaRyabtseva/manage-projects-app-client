<template>
    <base-container>
        <h4 class="task-title">Project title / task title</h4>
        <div class="detail links">
            <router-link to="projects/1/1/tasks/create">Edit</router-link>
        </div>
        <div class="detail">
<!--            <span class="item-title">priority</span>-->
            <the-priority priority="Low"/>
        </div>
        <div class="detail">
            <span class="item-title">status</span>
            <span>To do</span>
        </div>
        <div class="detail">
<!--            <span class="item-title">type</span>-->
            <the-type type="Epic" />
        </div>
        <div class="detail">
            <span class="item-title">description</span>
        </div>
        <div class="detail">
            <span class="item-title">people</span>
            <span class="item-title">assigner</span>
            <span class="item-title">creator</span>
        </div>
    </base-container>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
import TheType from "@/components/dashboard/TheType.vue";
import ThePriority from "@/components/dashboard/ThePriority.vue";
export default defineComponent({
    name: "TheTask",
    components: {ThePriority, TheType, BaseContainer}
    
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.task-title {
    background-color: $color-primary;
}
</style>