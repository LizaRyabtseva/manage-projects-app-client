<template>
    <the-header></the-header>
    <div class="container">
        <navigation v-if="isAuth"></navigation>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import {defineComponent, provide, computed} from 'vue';
import {useStore} from "vuex";
import TheHeader from '@/components/nav/TheHeader.vue';
import Navigation from "@/components/nav/TheNavigation.vue";

export default defineComponent({
    components: {Navigation, TheHeader},
    setup() {
        const store = useStore();
        store.dispatch('auth/tryLogin')
        let isAuth = computed( () => store.getters['auth/isAuthenticated']);
        provide('isAuth', isAuth);
        // onMounted(async () => {
        //     isAuth.value = await store.getters['auth/isAuthenticated'];
        //     console.log(isAuth.value);
        //     console.log('is logged in');
        // });

        return {
            isAuth
        }
    }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 14pt;
}

body {
    width: 100%;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
}

.container{
    display: flex;
    flex-direction: row;
}
</style>
