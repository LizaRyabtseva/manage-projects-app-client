<template>
    <base-container class="center">
        <form @submit.prevent="submitHandler">
            <div v-if="!isLoginMode" class="fields">
                <the-input
                    :error="signupV.fullName.$errors.length > 0"
                    label-placeholder="Full name"
                    size="large"
                    v-model="signupState.fullName"
                />
                <the-input
                    :error="signupV.email.$errors.length > 0"
                    label-placeholder="E-mail"
                    size="large"
                    lower
                    v-model="signupState.email"
                />
                <the-input
                    :error="signupV.password.$errors.length > 0"
                    label-placeholder="Password"
                    size="large"
                    type="password"
                    v-model="signupState.password"
                />
                <the-input
                    :error="signupV.passwordConfirmation.$errors.length > 0"
                    label-placeholder="Password confirmation"
                    size="large"
                    type="password"
                    v-model="signupState.passwordConfirmation"
                />
                <div class="input-errors" v-for="error of signupV.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div v-else class="fields">
                <the-input
                    :error="loginV.email.$errors.length > 0"
                    label-placeholder="E-mail"
                    type="email"
                    size="large"
                    lower
                    v-model.trim="loginState.email"
                />
                <the-input
                    :error="loginV.password.$errors.length > 0"
                    label-placeholder="Password"
                    size="large"
                    type="password"
                    v-model.trim="loginState.password"
                />
                <div class="input-errors" v-for="error of loginV.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
                <div class="input-errors">
                    <div class="error-msg">{{submitError}}</div>
                </div>
            </div>
            <div class="action">
                <the-button mode="dark" size="large">{{ btnTitle }}</the-button>
                <the-button type="button" @click="switchAuthMode" mode="dark" size="large">{{ switchTitle }}</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref, computed, reactive} from "vue";
import useVuelidate from '@vuelidate/core';
import { required, minLength, helpers, email, sameAs } from '@vuelidate/validators';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import BaseContainer from "../UI/BaseContainer.vue";
import TheInput from "../UI/TheInput.vue";
import TheButton from "../UI/TheButton.vue";
import routesMap from "@/models/routes";

export default defineComponent({
    name: "Authorization",
    components: {TheButton, TheInput, BaseContainer},
    setup() {
        const isLoginMode = ref(true);
        // const isLoginMode = ref(false);
        const signupState = reactive({
            fullName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        });
        
        const loginState = reactive({
            email: '',
            password: ''
        });
        
        const store = useStore();
        const router = useRouter();
        
        const isUnique = (input: string, type: string) => {
            if (input === '') return true;
            store.dispatch('api/checkUniqueValue', {value: input, type});
            const res = computed(() => store.getters['api/isUniqueValue']);
            return res.value;
        };

        const isUniqueEmail = helpers.withMessage('This email address is already used',
            () => isUnique(signupState.email, 'email'));
        
        const signupRules = computed(() => {
            return { fullName: {
                required: helpers.withMessage('Name field is required', required),
                minLength: helpers.withMessage('Name field should be at least 3 characters long', minLength(3)),
                $autoDirty: true
            },
            email: {
                required: helpers.withMessage('Email field can not be empty', required),
                email,
                isUniqueEmail,
                $autoDirty: true
            },
            password: {
                required: helpers.withMessage('Password field can not be empty', required),
                minLength: helpers.withMessage('Password field should br at least 4 characters long', minLength(4)),
                $autoDirty: true
            },
            passwordConfirmation: {
                required: helpers.withMessage('Password field can not be empty', required),
                minLength: helpers.withMessage('Password field should be at least 4 characters long', minLength(4)),
                sameAsPassword: helpers.withMessage('Passwords are not the same', sameAs(signupState.password)),
                $autoDirty: true
            }
        }});
        
        const loginRules = {
            email: {
                required: helpers.withMessage('Email field can not be empty', required),
                email,
                $autoDirty: true
            },
            password: {
                required: helpers.withMessage('Password field can not be empty', required),
                minLength: helpers.withMessage('Password field should be at least 4 characters long', minLength(4)),
                $autoDirty: true
            }
        };
        
        const signupV = useVuelidate(signupRules, signupState);
        const loginV = useVuelidate(loginRules, loginState);
        
        let submitError = ref('');
        
        const submitHandler = async () => {
            
            const isFormCorrect = isLoginMode.value ?
                await loginV.value.$validate() :
                await signupV.value.$validate();
            
            submitError.value = '';
            
            if (isFormCorrect) {
                if (isLoginMode.value) {
                    const data = {
                        email: loginState.email,
                        password: loginState.password
                    };
                    
                    try {
                        await store.dispatch('auth/auth', {userData: data, mode: 'login'});
                        await router.push(routesMap.projects);
                    } catch (err) {
                        submitError.value = err;
                    }
                    
                } else {
                    const data = {
                        name: signupState.fullName,
                        email: signupState.email,
                        password: signupState.password
                    };
                    try {
                        await store.dispatch('auth/auth', {userData: data, mode: 'signup'});
                      await router.push(routesMap.projects);
                    } catch (err) {
                        submitError.value = err;
                    }
                }
            }
        }
        
        const switchAuthMode = () => {
            isLoginMode.value = !isLoginMode.value;
        }
        
        const switchTitle = computed(() => {
            return isLoginMode.value ? 'To signup' : 'To login';
        })
        
        const btnTitle = computed(() => {
            return isLoginMode.value ? 'Login' : 'Create account';
        });
        
        return {
            signupState,
            signupV,
            loginState,
            loginV,
            btnTitle,
            switchTitle,
            isLoginMode,
            submitError,
            submitHandler,
            switchAuthMode
        }
    }
})
</script>

<style scoped lang="scss">
@import '../../assets/styles.scss';

.base-container {
    width: 95%;
}

form {
    @include setBorder(1px, 'all', $color-border);
    width: 40%;
    margin: 0 auto;
    box-shadow: 2px 5px 6px 1px $color-border;
    border-radius: 3px;
}

.fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.action {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

</style>