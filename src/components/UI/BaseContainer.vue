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
    width: 84%;
    margin: 20px;
    margin-bottom: 0;

}
</style>