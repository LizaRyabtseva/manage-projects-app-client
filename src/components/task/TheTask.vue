<template>
    <base-container>
        <h4 class="task-title">{{task.project.title}} / {{task.title}} / {{task.code}}</h4>
        <div class="detail links">
            <router-link :to="`/projects/${projectId}/tasks/edit/${taskId}`">Edit</router-link>
        </div>
        <div class="detail">
            <span class="item-title">priority</span>
            <the-priority :priority="task.priority"/>
        </div>
        <div class="detail">
            <span class="item-title">task's type</span>
            <the-type :type="task.type" />
        </div>
        <div class="detail">
            <span class="item-title">status</span>
            <span>{{task.status}}</span>
        </div>
        <div class="detail description">
            <span class="item-title">description</span>
            <span>{{task.description}}</span>
        </div>
        <div class="detail">
            <span class="item-title">assigner</span>
            <span>{{task.assigner[0].name}}</span>
        </div>
        <div class="detail">
            <span class="item-title">creator</span>
            <span>{{task.creator[0].name}}</span>
        </div>
        <span class="comments-title">comment's section</span>
        <the-comment @submit="submitHandler" />
        <comment-container
            class="comments"
            v-for="comment in comments"
            :key="comment.id"
            :id="comment.id"
            :comment="comment"
        />
    </base-container>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onUpdated} from "vue";
import BaseContainer from "../UI/BaseContainer.vue";
import TheType from "@/components/dashboard/TheType.vue";
import ThePriority from "@/components/dashboard/ThePriority.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import TheComment from "@/components/comment/TheComment.vue";
import CommentContainer from "@/components/comment/CommentContainer.vue";
export default defineComponent({
    name: "TheTask",
    components: {CommentContainer, TheComment, ThePriority, TheType, BaseContainer},
    setup() {
        const route = useRoute();
        const store = useStore();
        const {projectId, taskId} = route.params;

        onMounted(() => {
            store.dispatch('task/fetchTask', taskId);
            store.dispatch('api/fetchComments', taskId);
        });

        const fetchedTask = computed(() => store.getters['task/fetchedTask']);
        const fetchedComments = computed(() => store.getters['api/fetchedComments']);

        const submitHandler = (payload: {text: string, date: string, taskId: number, userId: number}) => {
            const {text, date, taskId, userId} = payload;
            try {
                store.dispatch('api/createComment', {text, date, taskId, userId});
                setInterval(() => {
                    store.dispatch('api/fetchComments', taskId);
                    store.dispatch('api/fetchComments', taskId);
                }, 1500)
            } catch (err) {
                console.log(err);
            }
        }

        return {
            comments: fetchedComments,
            task: fetchedTask,
            projectId,
            taskId,
            submitHandler,
        }
    },
    
})
</script>

<style scoped lang="scss">
@import "../../assets/styles";
.task-title {
    background-color: $color-primary;
}

.comments {
    display: flex;
    flex-direction: column;
    @include setBorder(1px, 'all', $color-border);
    border-radius: 3px;
    margin-top: 5px;
    
    .comment {
        padding-right: 200px;
    }
}

.comments-title {
    //padding-top: 600px;
    font-size: 75%;
    color: darken($color-primary, 25%);
}

.description {
    padding-right: 200px;
}
</style>