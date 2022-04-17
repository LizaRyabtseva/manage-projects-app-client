<template>
    <div class="sidebar-item">
        <router-link :to="to">
            <slot></slot>
        </router-link>
    </div>
</template>

<script lang="ts">
// import {defineComponent, toRefs, computed, inject} from "vue";
import {defineComponent} from "vue";

export default defineComponent({
    name: "SidebarItem",
    props: {
        to: {
            default: null,
            type: [String, Object],
            required: true
        }
    }
})
</script>

<style scoped lang="scss">
@import '../../assets/styles';

.sidebar-item {
    margin: 6px 0;
    
    a {
        text-decoration: none;
        color: $color-dark;
        
        &:link{
            color: $color-dark;
        }
        
        &.router-link-active,
        &:hover,
        &:active {
            @include setHoverStyles;
        }
    }
}

</style>