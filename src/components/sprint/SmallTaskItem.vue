<template>
    <div class="task-item">
        <div class="task-part">
            <the-type class="task-section small" :type="type" />
            <router-link class="task-section" :to="to" >{{title}}</router-link>
<!--            <span class="task-section">{{title}}</span>-->
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
        },
        to: {
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
    //width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0.3rem;
    margin: 5px;
    @include setBorder(1px, 'all', $color-border);
    
    .task-part {
        display: flex;
        flex-direction: row;
        align-items: center;
    
        a {
            text-decoration: none;
            color: $color-dark;
            //font-size: 120%;
            font-weight: 500;
        
            &.router-link-active,
            &:hover {
                color: darken($color-dark, 30);
            }
        
        }
        
        .task-section {
            align-items: center;
            margin: 3px 20px;
            
            &.small {
                width: 115px;
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