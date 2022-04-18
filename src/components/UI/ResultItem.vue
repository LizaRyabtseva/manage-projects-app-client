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
        }
    },
    setup(props, {emit}) {
        const {value} = toRefs(props);

        const chooseHandler = () => {
            emit('choose', value)
        }

        return {
            chooseHandler
        }
    }
})
</script>

<style scoped>

</style>