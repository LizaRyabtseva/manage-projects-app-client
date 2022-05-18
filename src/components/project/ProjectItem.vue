<template>
    <div class="project-card">
         <span v-if="to" class="item">
                <router-link to="#">{{ project.title }}</router-link>
         </span>
        <span v-else class="item">{{ project.title }}</span>
        <span class="item">{{ project.code }}</span>
        <span class="item">{{ project.status }}</span>
        <span class="item">{{ project.owner.name || project.owner }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
// import IProject from "@/models/IProject";

export default defineComponent({
    name: "ProjectItem",
    props: {
        project: {
            default: null,
            type: Object,
            required: true
        },
        to: {
            default: null,
            type: String,
            required: false
        },
        status: {
            default: null,
            type: String,
            required: false
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.project-card {
    @include setBorder(1px, 'bottom', $color-border);
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.item {
    display: inline-block;
    width: 190px;
    
    a {
        color: $color-dark;
        text-decoration: none;
        
        &:link{
            color: $color-dark;
        }
        
        &:hover {
            @include setHoverStyles;
        }
    }
}
</style>