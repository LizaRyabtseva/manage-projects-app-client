<template>
        <div>
            <form @submit.prevent="submit">
                <div class="form-fields">
                    <the-input
                        textarea
                        label-placeholder="Leave a comment"
                        size="xlarge"
                        v-model="comment"
                        rows="3"
                    />
                </div>
                <div class="action">
                    <the-button type="submit" size="small" mode="dark">LEAVE A COMMENT</the-button>
                </div>
            </form>
        </div>
</template>

<script lang="ts">
import TheInput from "../UI/TheInput.vue";
import {computed, defineComponent, ref} from "vue";
import TheButton from "@/components/UI/TheButton.vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default defineComponent({
    name: "TheComment",
    components: {TheButton, TheInput},
    emits: ['submit'],
    setup(_, {emit}) {
        const comment = ref('');
        const store = useStore();
        const route = useRoute();
        const {taskId} = route.params;
        const userId = computed(() => store.getters['auth/userId']);
        
        const submit = () => {
            const date = new Date();
            emit('submit', {text: comment.value, date, taskId, userId: userId.value});
            comment.value = '';
            // try {
            //     store.dispatch('api/createComment', {text: comment.value, date, taskId, userId: userId.value});
            //     comment.value = '';
            // } catch (err) {
            //     console.log(err);
            // }
        }
        
        return {
            comment,
            submit: submit
        }
    }
})
</script>

<style scoped lang="scss">

.form-fields {
    //border: 1px solid #0ca8d7;
}

.action {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>