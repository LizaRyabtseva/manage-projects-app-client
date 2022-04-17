<template>
    <base-container>
        <h4>Browse Projects</h4>
        <the-search/>
        <projects-list />
    </base-container>

</template>

<script>
import ProjectsList from "@/components/project/ProjectsList";
import {defineComponent} from "vue";

import BaseContainer from "@/components/UI/BaseContainer";
import TheSearch from "@/components/UI/TheSearch";

export default defineComponent({
    name: "AllProjects",
    components: {TheSearch, BaseContainer, ProjectsList},
   
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";

.projects-container {
    width: 84%;
    margin: 20px;
}

</style>