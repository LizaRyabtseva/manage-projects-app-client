<template>
    <div class="comment">
        <div>
            <span class="name">{{comment.user.name}}</span>
            <span class="date">{{comment.date}}</span>
        </div>
        <span class="text">{{comment.text}}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "CommentContainer",
    props: {
        comment: {
            type: Object,
            required: false
        }
    }
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.name {
    margin: 5px 10px;
    font-size: 90%;
    color: darken($color-primary, 25%);
}

.date {
    color: $color-dark;
    margin: 5px 10px;
    font-size: 70%;
}

.text {
    margin: 5px 10px;
}

.comment {
    margin-right: 200px;
    //padding-right: 200px;
}
</style>