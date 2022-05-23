<template>
    <div class="task-item">
        <div class="task-part">
            <the-type class="task-section small" :type="type" />
            <span class="task-section">{{title}}</span>
        </div>
        <div class="task-part">
            <span class="task-section">{{assigner}}</span>
            <span class="task-section small">{{code}}</span>
            <the-priority class="task-section small" :priority="priority" />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, toRefs} from "vue";
import TheType from "../dashboard/TheType.vue";
import ThePriority from "@/components/dashboard/ThePriority.vue";
export default defineComponent({
    name: "SmallTaskItem",
    components: {ThePriority, TheType},
    props: {
        title: {
            type: String,
            required: true
        },
        code: {
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
        }, bl: {
            type: String,
            required: false
        }
    },
    // setup(props) {
    //     const {title} = toRefs(props);
    //
    //     return {
    //         title
    //     }
    // }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.task-item {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    @include setBorder(1px, 'all', $color-border);
    
    .task-part {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        .task-section {
            align-items: center;
            margin: 3px 20px;
            
            &.small {
                width: 90px;
            }
            
            &:first-child {
                margin-left: 10px;
            }
    
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>