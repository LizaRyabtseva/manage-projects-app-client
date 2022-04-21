<template>
    <div class="input-label-con" :class="size">
        <div class="input-con" :class="[{textarea: textarea, label: !!labelPlaceholder}]">
            <textarea ref="input"
                      v-if="textarea"
                      :placeholder="labelPlaceholder"
                      rows="4"
                      v-bind="$attrs"
                      :value="modelValue"
                      @input="inputHandler"
                      @focus="focusHandler"
                      @blur="blurHandler"
            ></textarea>
            <input ref="input"
                   v-else-if="$attrs.type === 'search'"
                   :placeholder="labelPlaceholder"
                   v-bind="$attrs"
                   :value="modelValue"
                   type="search"
                   @input="searchEmit"
                   @focus="focusHandler"
                   @blur="blurHandler"
            />
            <input v-else
                   ref="input"
                   :placeholder="labelPlaceholder"
                   v-bind="$attrs"
                   :value="modelValue"
                   :type="$attrs.type ? $attrs.type : 'text'"
                   :class="{disabled: disabled}"
                   :disabled="disabled"
                   @input="inputHandler"
                   @focus="focusHandler"
                   @blur="blurHandler"
            />
            <span @click="deleteHandler"
                  v-if="disabled"
                  class="material-icons"
            >clear</span>
            <Transition name="label">
                <label v-if="isFocus || isValue"
                       class="input-label"
                       @click="focusInput">{{ labelPlaceholder }}</label>
            </Transition>
        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, computed} from "vue";
import variables from '../../assets/variables.scss';

export default defineComponent({
    name: "TheInput",
    inheritAttrs: false,
    props: {
        modelValue: {
            default: '',
            type: [String, Number],
            required: false
        },
        labelPlaceholder: {
            default: null,
            type: [String, Number],
            required: false
        },
        color: {
            default: 'color-border',
            type: String,
            required: false
        },
        size: {
            default: 'normal',
            type: String,
            required: false
        },
        textarea: {
            default: false,
            type: Boolean,
            required: false
        },
        disabled: {
            default: false,
            type: Boolean,
            required: false
        }
    },
    emits: ['update:modelValue', 'blur', 'focus', 'search', 'deleteUser'],
    setup(props, {emit}) {
        const isFocus = ref(false);
        const input = ref();
        const {textarea, modelValue} = toRefs(props);

        
        const isValue = computed(() => {
            return !!modelValue.value;
        })
        
        const changeFocus = (value: boolean) => {
            isFocus.value = value;
        };
        
        const inputHandler = (event: Event) => {
            let v;
            if (!textarea)
                v = (event.target as HTMLInputElement).value;
            else
                v = (event.target as HTMLTextAreaElement).value;
            emit('update:modelValue', v);
        };
    
        const focusHandler = (event: Event) => {
            let v;
            if (!textarea.value) {
                v = (event.target as HTMLInputElement).value;
            } else
                v = (event.target as HTMLTextAreaElement).value;
            emit('focus', v);
            changeFocus(true);
        };

        const blurHandler = (event: Event) => {
            let v;
            if (!textarea.value) {
                v = (event.target as HTMLInputElement).value;
            } else
                v = (event.target as HTMLTextAreaElement).value;
            emit('blur', v);
            changeFocus(false);

        };

        const deleteHandler = (value: number) => {
            emit('deleteUser', value);
        }

        const focusInput = () => {
            input.value.focus();
        };
        
        const searchEmit = (event: Event) => {
            const value = (event.target as HTMLInputElement).value;
            emit('update:modelValue', value);
            emit('search', value);
        }
        
        return {
            input,
            isValue,
            isFocus,
            changeFocus,
            inputHandler,
            focusHandler,
            blurHandler,
            deleteHandler,
            focusInput,
            searchEmit
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.input-label-con {
    //padding: 20px 0;
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

.input-con {
    display: flex;
    flex-direction: column-reverse;
    min-height: 30px;
    //background-color: #0ca8d7;
    & span {
        position: absolute;
        &:hover {
            cursor: pointer;
        }

    }
    &.label {
        min-height: 55px;
    }
    
    &.textarea {
        min-height: 125px;
        //background-color: #08a808;
    }
}


input, textarea {
    @include setBorder(1px, 'all', $color-border);
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
        box-shadow: 0px 0px 4px 1px $color-primary;
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