<template>
    <nav>
        <ul class="nav-list">
            <li class="nav-link">
                <RouterLink :to="routes.projects" class="nav-link">WorkBoard</RouterLink>
            </li>
            <li class="nav-link">
                <RouterLink :to="routes.projects" class="nav-link">Projects</RouterLink>
            </li>
        </ul>
        <the-button mode="dark" size="large">Create</the-button>
        <ul v-if="!isAuth" class="account">
            <li class="nav-link">
                <RouterLink :to="routes.auth" class="nav-link">Login</RouterLink>
            </li>
        </ul>
        <ul v-else class="account">
            <li class="nav-link">
                <RouterLink :to="routes.projects" class="nav-link">Settings</RouterLink>
            </li>
            <the-button @click="logout" mode="dark" size="large">Logout</the-button>
        </ul>
        
    </nav>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import routesMap from "@/models/routes";
import TheButton from "@/components/UI/TheButton.vue";

export default defineComponent({
    name: "TheHeader",
    components: {TheButton},
    setup() {
        const store = useStore();
        const router = useRouter();
        
        const logout = () => {
            store.dispatch('auth/logout');
            router.push(routesMap.projects);
        }
        
        const isAuth = inject('isAuth');
       
        return {
            logout,
            isAuth,
            routes: routesMap
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
nav {
    background-color: $color-primary;
    border-bottom: 1px solid$color-border;
    
    &::after {
        content: "";
        display: table;
        clear: both;
    }
}

.nav-list,
.account {
    list-style: none;
    float: left;
    
    li {
        display: inline-block;
        margin-right: 40px;
        padding-top: 13px;
        color: $color-dark;
    
        a {
            text-decoration: none;
            font-weight: 500;
            color: $color-dark;
    
            &.router-link-active,
            &:hover,
            &:active {
                @include setHoverStyles;
            }
        }
    }
}

.nav-list {
    li {
        &:first-child {
            margin-left: 20px;
        }
    }
}

.account {
    float: right;
    li {
        &:last-child {
            margin-right: 20px;
        }
    }
}

</style>