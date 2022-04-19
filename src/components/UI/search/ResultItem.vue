<template>
    <div class="found-value" @click="chooseHandler">{{value}}</div>
</template>

<script lang="ts">
import {defineComponent, toRefs} from "vue";

export default defineComponent({
    name: "ResultItem",
    emits: ['choose'],
    props: {
        value: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    setup(props, {emit}) {
        const {id} = toRefs(props);

        const chooseHandler = () => {
            emit('choose', id)
        }

        return {
            chooseHandler
        }
    }
})
</script>

<style scoped lang="scss">
@import '../../../assets/styles';

.found-value {
    background-color: $color-primary;

    &:hover {
        background-color: darken($color-primary, 10%);
        cursor: pointer;
    }
}

</style>