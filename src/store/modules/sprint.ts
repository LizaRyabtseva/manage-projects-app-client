import {Actions, Getters, Module, Mutations} from 'vuex-smart-module';
import axios from 'axios';
import ITask from "@/models/ITask";

class SprintState {
    // sprintId: number;
    tasks: Partial<ITask>[] = [];
}

class SprintGetters extends Getters<SprintState> {
    get tasks() {
        return this.state.tasks;
    }
}

class SprintMutations extends Mutations<SprintState> {
    setTasks(tasks: Partial<ITask>[]) {
        this.state.tasks = tasks;
    }
}

class SprintActions extends Actions<SprintState, SprintGetters, SprintMutations, SprintActions> {
    async fetchTasksBySprintId(sprintId: number) {
        const url = `http://localhost:5000/sprints/${sprintId}/tasks`;
        try {
            const response = await axios.get(url);
            this.commit('setTasks', response.data.tasks);
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
}

export const sprintModule = new Module({
    state: SprintState,
    getters: SprintGetters,
    mutations: SprintMutations,
    actions: SprintActions
});