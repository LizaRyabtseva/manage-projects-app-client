<template>
    <base-container class="center">
        <form @submit.prevent="submitHandler">
            <div v-if="!isLoginMode" class="fields">
                <the-input
                    label-placeholder="Full name"
                    size="large"
                    v-model="fullName"
                ></the-input>
                <the-input
                    label-placeholder="Login"
                    size="large"
                    v-model="login"
                ></the-input>
                <the-input
                    label-placeholder="E-mail"
                    size="large"
                    v-model="email"
                ></the-input>
                <the-input
                    label-placeholder="Password"
                    size="large"
                    type="password"
                    v-model="password"
                ></the-input>
                <the-input
                    label-placeholder="Repeat password"
                    size="large"
                    type="password"
                    v-model="repeatPassword"
                ></the-input>
            </div>
            <div v-else class="fields">
                <the-input
                    label-placeholder="E-mail"
                    size="large"
                    v-model="email"
                ></the-input>
                <the-input
                    label-placeholder="Password"
                    size="large"
                    type="password"
                    v-model="password"
                ></the-input>
            </div>
            <div class="action">
                <the-button mode="dark" size="large">{{ btnTitle }}</the-button>
                <the-button type="button" @click="switchAuthMode" mode="dark" size="large">{{ switchTitle }}</the-button>
            </div>
        </form>
    </base-container>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from "vue";
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
        const fullName = ref('');
        const login = ref('');
        const email = ref('');
        const password = ref('');
        const repeatPassword = ref('');
        const store = useStore();
        const router = useRouter();
        
        const submitHandler = () => {
            const data = {
                name: fullName.value,
                login: login.value,
                email: email.value,
                password: password.value
            };
            
            if (isLoginMode.value)
                store.dispatch('auth/auth', {userData: data, mode: 'login'});
            else
                store.dispatch('auth/auth', {userData: data, mode: 'signup'});
            
            router.push(routesMap.projects);
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
            fullName,
            login,
            email,
            password,
            repeatPassword,
            btnTitle,
            switchTitle,
            isLoginMode,
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