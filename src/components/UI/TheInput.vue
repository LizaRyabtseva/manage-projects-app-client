<template>
    <div class="input-label-con" :class="size">
        <div class="input-con" :class="[{textarea: textarea, label: !!labelPlaceholder}]">
            <textarea ref="input"
                      v-if="textarea"
                      :placeholder="labelPlaceholder"
                      :rows="rows"
                      v-bind="$attrs"
                      :value="modelValue"
                      :class="{deleted: deleted, error: error}"
                      @input="inputHandler"
                      @focus="focusHandler"
                      @blur="blurHandler"
            />
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
                   :class="{deleted: deleted, error: error}"
                   :disabled="disabled"
                   :maxlength="length"
                   @input="inputHandler"
                   @focus="focusHandler"
                   @blur="blurHandler"
            />
            <span @click="deleteHandler"
                  v-if="deleted"
                  class="material-icons"
            >clear</span>
            <Transition name="label">
                <label v-if="isFocus || isValue"
                       class="input-label"
                       :class="{error: error}"
                       @click="focusInput">{{ labelPlaceholder }}
                </label>
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
        length: {
            type: String,
            required: false
        },
        upper: {
            default: false,
            type: Boolean,
            required: false
        },
        lower: {
            default: false,
            type: Boolean,
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
        },
        deleted: {
            default: false,
            type: Boolean,
            required: false
        },
        error: {
            type: Boolean,
            required: false
        },
        rows: {
            default: "4",
            type: String,
            required: false
        }
    },
    emits: ['update:modelValue', 'blur', 'focus', 'search', 'deleteValue'],
    setup(props, {emit}) {
        const isFocus = ref(false);
        const input = ref();
        const {textarea, modelValue, upper, lower} = toRefs(props);

        
        const isValue = computed(() => {
            return !!modelValue.value;
        })
        
        const changeFocus = (value: boolean) => {
            isFocus.value = value;
        };
        
        const inputHandler = (event: Event) => {
            let v;
            if (!textarea) {
                v = (event.target as HTMLInputElement).value;
            } else {
                v = (event.target as HTMLTextAreaElement).value;
            }
            if (upper.value) {
                v = v.toUpperCase();
            }
            if (lower.value) {
                v = v.toLowerCase();
            }
            emit('update:modelValue', v);
        };
    
        const focusHandler = (event: Event) => {
            let v;
            if (!textarea.value) {
                v = (event.target as HTMLInputElement).value;
            } else {
                v = (event.target as HTMLTextAreaElement).value;
            }
            emit('focus', v);
            changeFocus(true);
        };

        const blurHandler = (event: Event) => {
            let v;
            if (!textarea.value) {
                v = (event.target as HTMLInputElement).value;
            } else {
                v = (event.target as HTMLTextAreaElement).value;
            }
            emit('blur', v);
            changeFocus(false);

        };

        const deleteHandler = (value: number) => {
            emit('deleteValue', value);
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
    &.xlarge {
        width: 100%;
        input {
            font-size: 80%;
        }
        textarea {
            min-height: 90px;
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

    &.deleted {
        padding-left: 25px;
    }
    &:focus {
        outline: 0;
        box-shadow: 0 0 4px 1px $color-primary;
        
    }
    &::placeholder {
        color: lighten($color-dark, 40%);
    }
    
    &.error {
        @include setBorder(1px, 'all', $color-bug);
    
        &.deleted {
            padding-left: 25px;
        }
        &:focus {
            outline: 0;
            box-shadow: 0 0 4px 1px $color-bug;
        }
    }
}

.input-label {
    color: darken($color-primary, 25%);
    font-size: 80%;
    padding-left: 5px;
    
    &.error {
        color: $color-bug;
    }
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