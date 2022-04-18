<template>
    <div class="input-label-con" :class="size">
        <div class="input-con" :class="{textarea: textarea}">
<!--            <span class="material-icons">-->
<!--                search-->
<!--            </span>-->
            <textarea ref="input"
                      v-if="textarea"
                      :placeholder="labelPlaceholder"
                      rows="5"
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
                   @input="inputHandler"
                   @focus="focusHandler"
                   @blur="blurHandler"
            />
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
import {RefValue} from "vue/macros";
import {useStore} from "vuex";

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
        }
    },
    emits: ['update:modelValue', 'blur', 'focus', 'search'],
    setup(props, {emit}) {
        const isFocus = ref(false);
        const input = ref();
        const {textarea, modelValue} = toRefs(props);
   
        const store = useStore();
        
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
            if (!textarea)
                v = (event.target as HTMLInputElement).value;
            else
                v = (event.target as HTMLTextAreaElement).value;
            emit('focus', v);
            changeFocus(true);
            // alert('true')
        };
        
        const blurHandler = (event: Event) => {
            let v;
            if (!textarea)
                v = (event.target as HTMLInputElement).value;
            else
                v = (event.target as HTMLTextAreaElement).value;
            emit('blur', v);
            changeFocus(false);
            
        };
        
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
            focusInput,
            searchEmit
        }
    },
    // data() {
    //     return {
    //         isFocus: false
    //     }
    // },
    // methods: {
        // changeFocus(boolValue: boolean) {
        //     this.isFocus = boolValue;
        // },
        // inputHandler(event: Event) {
        //     let v;
        //     if (!this.textarea)
        //         v = (event.target as HTMLInputElement).value;
        //     else
        //         v = (event.target as HTMLTextAreaElement).value;
        //     this.$emit('update:modelValue', v);
        // },
        // searchHandler(event: Event) {
        //     const value = (event.target as HTMLInputElement).value;
        //     if (value.length > 2) {
        //         this.$store.dispatch('auth/searchUser', value);
        //     }
        // },
        // focusHandler(event: Event) {
        //     let v;
        //     if (!this.textarea)
        //         v = (event.target as HTMLInputElement).value;
        //     else
        //         v = (event.target as HTMLTextAreaElement).value;
        //     this.$emit('focus', v);
        //     this.changeFocus(true);
        // },
        // blurHandler(event: Event) {
        //     let v;
        //     if (!this.textarea)
        //         v = (event.target as HTMLInputElement).value;
        //     else
        //         v = (event.target as HTMLTextAreaElement).value;
        //     this.$emit('blur', v);
        //     this.changeFocus(false);
        // },
        // focusInput() {
        //     if (!this.textarea)
        //         (this.$refs.input as RefValue<HTMLInputElement>).focus();
        //     else
        //         (this.$refs.input as RefValue<HTMLTextAreaElement>).focus();
        // }
    // },
    // computed: {
    //     isValue(){
    //         return !!this.modelValue;
    //     }
    // }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.input-label-con {
    //padding: 20px 0;
    &.small {
        width: 30%;
        input {
            font-size: 75%;
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
    min-height: 60px;
    //background-color: #0ca8d7;
    
    &.textarea {
        min-height: 150px;
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