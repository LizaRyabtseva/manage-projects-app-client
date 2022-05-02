import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import ITask from "@/models/ITask";

class TaskState {
    tasks: Partial<ITask>;
    fetchedTask: Partial<ITask>
}

class TaskGetters extends Getters<TaskState> {

}

class TaskMutations extends Mutations<TaskState> {

}

class TaskActions extends Actions<TaskState, TaskGetters, TaskMutations, TaskActions> {
    async createTask(data: {task: Partial<ITask>, token: string, userId: number,projectId: number, backlogId: number}) {
        try {
            const {task, token, userId, projectId, backlogId} = data;
            const url = `http://localhost:5000/projects/${projectId}/sprints/${backlogId}/tasks`;
            const response = await axios.post(url, {
                ...task,
                userId,
                token
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
}

export const taskModule = new Module({
    state: TaskState,
    getters: TaskGetters,
    mutations: TaskMutations,
    actions: TaskActions
});
