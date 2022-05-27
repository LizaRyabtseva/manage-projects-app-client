<template>
    <nav>
        <ul class="nav-list">
            <li class="nav-link">
                <router-link :to="routes.projects" class="nav-link">WorkBoard</router-link>
            </li>
            <li class="nav-link">
                <router-link :to="routes.projects" class="nav-link">Projects</router-link>
            </li>
        </ul>
        <the-button class="nav-btn" mode="dark" size="large">CREATE</the-button>
        <ul v-if="!isAuth" class="account">
            <li class="nav-link">
                <router-link :to="routes.auth" class="nav-link">Login</router-link>
            </li>
        </ul>
        <ul v-else class="account">
            <li class="nav-link">
                <router-link :to="routes.projects" class="nav-link">Settings</router-link>
            </li>
                <the-button class="nav-btn" @click="logout" mode="dark" size="large">LOGOUT</the-button>
        </ul>
        
    </nav>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
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
    border-bottom: 1px solid $color-border;
    position: absolute;
    top: 0;
    width: 100%;
    
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

.nav-btn {
    margin: 10px 20px;
}
</style>