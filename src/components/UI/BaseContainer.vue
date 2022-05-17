<template>
<div class="base-container">
    <slot></slot>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "BaseContainer"
})
</script>

<style scoped lang="scss">
.base-container {
    width: 80%;
    margin: 20px 20px 0 20px;
    position: absolute;
    top: 58px;
    left: 17%;
    
    &.center {
        left: 0;
    }
}
</style>