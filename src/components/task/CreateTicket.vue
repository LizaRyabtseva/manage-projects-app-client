<template>
    <form>
        <fieldset>
            <legend>Create ticket</legend>
            <div class="form-control">
                <label for="title">Title</label>
                <input
                    type="text"
                    id="title"
                />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea
                    id="description"
                    rows="5"
                />
            </div>
            <div class="form-control">
                <label for="estimation">Estimation</label>
                <input
                    type="number"
                    id="estimation"
                />
            </div>
            <div class="form-control">
                <label for="estimation">Priority</label>
                <select
                    id="type"
                    name="type">
                    <option value="epic">Epic</option>
                    <option value="story">Story</option>
                    <option value="task">Task</option>
                    <option value="sub-task">Sub-task</option>
                    <option value="bug">Bug</option>
                </select>
            </div>
            <div class="form-control">
                <label for="estimation">Priority</label>
                <select
                    id="priority"
                    name="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-control">
                <label for="creator">Creator</label>
                <input
                    type="text"
                    id="creator"
                />
            </div>
            <div class="form-control">
                <label for="executor">Executor</label>
                <input
                    type="search"
                    id="executor"
                />
            </div>
        </fieldset>
        <div>
            <TheButton>Create</TheButton>
        </div>
    </form>
</template>

<script>
import TheButton from "@/components/UI/TheButton";
export default {
    name: "CreateTicket",
    components: {TheButton}
}
</script>

<style scoped>
form {
    margin: auto;
    width: 25%;
    padding: 0.2rem 0.5rem;
}
fieldset {
    border: none;
    font-size: 1.4rem;
}
.form-control {
    display: flex;
    flex-direction: column;
}
label {
    font-size: 0.8rem;
    width: 50%;
    margin-top: 0.5rem;
    /*margin-left: 0.5rem;*/
}
input, textarea {
    /*width: 40%;*/
    font-size: 1rem;
    border: 0.1rem solid #6a6f6e;
    border-radius: 0.2rem;
}
</style>