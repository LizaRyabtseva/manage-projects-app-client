<template>
    <div class="search-results">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {defineComponent, toRefs} from "vue";

export default defineComponent({
    name: "ResultsContainer",
    // emits: ['choose'],
    // props: {
    //     id: {
    //         type: String,
    //         required: true
    //     }
    // },
    // setup(props, {emit}) {
    //     const {id} = toRefs(props);
    //
    //     const chooseHandler = () => {
    //         emit('choose', id);
    //     };
    //
    //     return {
    //         chooseHandler
    //     }
    // }
})
</script>

<style scoped lang="scss">
@import '../../assets/styles';
.search-results {
    @include setBorder(1px, 'all', $color-border);

    &.small {
        width: 30%;
    }

    &.normal {
        width: 45%;
    }

    &.large {
        width: 90%;
    }
}
</style>