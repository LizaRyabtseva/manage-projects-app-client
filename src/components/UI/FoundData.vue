<template>
    <div class="search-results">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "FoundData"
}
</script>

<style scoped lang="scss">
@import '../../assets/styles';
.search-results {
    @include setBorder(1px, 'all', $color-border);
    
}
</style>