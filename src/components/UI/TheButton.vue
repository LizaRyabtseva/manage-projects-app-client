<template>
    <button v-if="!link" :class="[mode, size]">
        <slot/>
    </button>
    <RouterLink v-else :to="to" :class="[mode, size]">
        <slot/>
    </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent( {
    name: "TheButton",
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: ''
        },
        size: {
            type: String,
            default: 'normal',
            required: false
        }
    },
    
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

button, a {
    border: none;
    //margin: 10px 0;
    text-decoration: none;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    &.small {
        padding: 3px 8px;
        font-size: 75%;
    }
    &.normal {
        padding: 4px 12px;
        font-size: 85%;
    }
    &.large {
        padding: 5px 16px;
        font-size: 90%;
    }
}

.light {
    @include setThemeButton($color-primary, $color-dark);
}

.medium {
    @include setThemeButton($color-medium, $color-dark);
}

.dark {
    @include setThemeButton($color-dark, $color-primary);
}

</style>