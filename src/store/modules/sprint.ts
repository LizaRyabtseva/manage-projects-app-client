import {Actions, Getters, Module, Mutations} from 'vuex-smart-module';
import axios from 'axios';
import ITask from "@/models/ITask";
import ISprint from "@/models/ISprint";

class SprintState {
    // sprintId: number;
    sprint: Partial<ISprint> = {
        id: -1,
        title: '',
        dateStart: '',
        dateEnd: '',
        projectId: -1
    };
    tasks: Partial<ITask>[] = [];
}

class SprintGetters extends Getters<SprintState> {
    get fetchedSprint() {
        return this.state.sprint;
    }
    
    get tasks() {
        return this.state.tasks;
    }
}

class SprintMutations extends Mutations<SprintState> {
    setSprint(sprint: Partial<ISprint>) {
        this.state.sprint = sprint;
    }
    
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
    
    async startSprint(payload: {dateStart: string, dateEnd: string, projectId: number}) {
        const {dateStart, dateEnd, projectId} = payload;
        const url = `http://localhost:5000/sprints`;
        try {
            const response = await axios.post(url, {
                dateStart,
                dateEnd,
                projectId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                    // Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async fetchSprint(sprintId: number) {
        const url = `http://localhost:5000/sprints/${sprintId}`;
        
        try {
            const response = await axios.get(url);
            if (response.data.sprint) {
                this.commit('setSprint', response.data.sprint);
            }
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