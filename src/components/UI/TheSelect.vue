<template>
    <div class="select-label-con" :class="size">
        <div class="select-con" :class="{label: !!label}">
            <select :value="modelValue"
                    v-bind="$attrs"
                    @change="selectHandler"
                    @focus="focusHandler"
                    @blur="blurHandler"
            >
                <slot />
            </select>
<!--            <input-->
<!--                ref="select"-->
<!--                v-bind="$attrs"-->
<!--                type="text"-->
<!--            >-->
<!--            <button-->
<!--                class="icon-select-clear"-->
<!--                @click="clearValue">-->
<!--                <span class="material-icons">-->
<!--                    keyboard_arrow_down-->
<!--                </span>-->
<!--            </button>-->
            
<!--            <select name="temp" id=""-->
<!--                    ref="select"-->
<!--                    @focus="focusHandler"-->
<!--                    @blur="blurHandler"-->
<!--                    @select="selectHandler"-->
<!--            >-->
<!--                <option v-for="value in values"-->
<!--                        :key="value"-->
<!--                        :id="value"-->
<!--                        :value="value"-->
<!--                >{{value}}</option>-->
<!--            </select>-->
            <Transition name="label">
                <label v-if="isFocus || isValue"
                       class="input-label"
                       @click="focusSelect">{{ label }}</label>
            </Transition>
            
<!--            <transition name="fadeselect">-->
<!--                <div-->
<!--                    v-show="active"-->
<!--                    ref="options"-->
<!--                    class="select-options">-->
<!--                    <ul ref="ul">-->
<!--                        <slot />-->
<!--                    </ul>-->
<!--                </div>-->
<!--            </transition>-->
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRefs} from "vue";

export default defineComponent({
    name: "TheSelect",
    props: {
        modelValue: {
            default: '',
            type: [String, Number],
            required: false
        },
        label: {
            default: null,
            type: [String, Number],
            required: false
        },
        size: {
            default: 'normal',
            type: String,
            required: false
        },
        // values: {
        //     type: Array,
        //     required: true
        // }
    },
    setup(props, {emit}) {
        const isFocus = ref(false);
        const {modelValue} = toRefs(props);

        
        const isValue = computed(() => {
            return !!modelValue.value;
        })
        //
        // const focusSelect = () => {
        //     select.value.focus();
        // };
    
        const changeFocus = (value: boolean) => {
            isFocus.value = value;
        };
    
        const focusHandler = (event: Event) => {
            const value = (event.target as HTMLSelectElement).value;
            emit('focus', value);
            changeFocus(true);
        };
    
        const blurHandler = (event: Event) => {
            const value = (event.target as HTMLSelectElement).value;
            emit('blur', value);
            changeFocus(false);
        };
        
        const selectHandler = (event: Event) => {
            const value = (event.target as HTMLSelectElement).value;
            emit('update:modelValue', value);
        }
        
        return {
            isFocus,
            isValue,
            focusHandler,
            blurHandler,
            selectHandler
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.select-label-con {
    &.small {
        width: 30%;
        input {
            font-size: 80%;
        }
    }
    &.normal {
        width: 45%;
        input {
            font-size: 80%;
        }
    }
    &.large {
        width: 90%;
        input {
            font-size: 80%;
        }
    }
}

.select-con {
    display: flex;
    flex-direction: column-reverse;
    min-height: 30px;
    &.label {
        min-height: 55px;
    }
}

select {
    @include setBorder(1px, 'all', $color-border);
    outline: 0;
    color: $color-dark;
    border-radius: 3px;
    font: inherit;
    font-size: 80%;
    padding-left: 5px;
    
    &.disabled {
        padding-left: 25px;
    }
    &:focus {
        outline: 0;
        box-shadow: 0 0 4px 1px $color-primary;
    }
    &::placeholder {
        color: lighten($color-dark, 40%);
    }
}

.input-label {
    color: darken($color-primary, 25%);
    font-size: 80%;
    padding-left: 5px;
}

.label-enter-active {
    opacity: 1;
    transition: all 0.7s ease-in;
}

.label-leave-active {
    opacity: 1;
    transition: all 0.7s ease-out;
}

.label-enter-from,
.label-leave-to {
    opacity: 0;
}

</style>