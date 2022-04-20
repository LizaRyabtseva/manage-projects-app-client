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
        const {id, value} = toRefs(props);

        const chooseHandler = () => {
            emit('choose', {id, email: value});
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
    color: $color-dark;
    font-size: 80%;
    &:hover {
        color: darken($color-primary, 25%);
        cursor: pointer;
    }
}

</style>