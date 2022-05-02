<template>
    <option :value="value">{{value}}</option>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
    name: "SelectOption",
    props: {
        value: {
            default: null,
            type: String,
            required: true
        },
        size: {
            default: 'normal',
            type: String,
            required: false
        }
    },
})
</script>

<style scoped>

</style>