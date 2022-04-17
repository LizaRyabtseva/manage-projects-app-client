<template>
    <div v-show="staticPosition"
         ref="sidebarBackground"
         class="sidebar-content"
    >
        <header class="sidebar-header">
            <slot name="header"></slot>
        </header>
        <div class="sidebar-items">
            <slot></slot>
        </div>
        <footer class="sidebar-footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, provide} from 'vue';


export default defineComponent({
    name: "Sidebar",
    props: {
        defaultIndex: {
            default: null,
            type: [String, Number],
            required: true
        },
        spacer: {
            default: false,
            type: Boolean,
            required: false
        },
        staticPosition: {
            default: false,
            type: Boolean,
            required: false
        }
    },
    setup(props) {
        const currentIndex = ref(0);
        const { defaultIndex } = toRefs(props);
        currentIndex.value = +defaultIndex;
        
        return {
            currentIndex
        }
    },
    // data() {
    //     return {
    //         currentIndex: 0
    //     }
    // },
    // created() {
    //     this.currentIndex = +this.defaultIndex;
    // },
    // methods: {
    //     getActive() {
    //         return this.currentIndex;
    //     },
    //     setIndexActive(index: number) {
    //         this.currentIndex = index;
    //     }
    // }
})
</script>

<style scoped lang="scss">
@import '../../assets/styles';

@mixin setAlignment {
    padding: 30px 20px;
}

.sidebar-content {
    background-color: $color-light;
    height: 92vh;
    width: 16.2%;
    display: flex;
    flex-direction: column;
    @include setBorder(1px, 'right', $color-border);
    box-shadow: 2px 5px 6px 1px $color-border;
}

.sidebar-items {
    display: flex;
    flex-direction: column;
    margin: 30px 20px;
    background: inherit;
}

.sidebar-header {
    @include setAlignment;
    @include setBorder(1px, 'bottom', $color-border);
}

.sidebar-footer {
    @include setAlignment;
    @include setBorder(1px, 'top', $color-border);
}
</style>