import {Actions, Getters, Module, Mutations} from 'vuex-smart-module';
import axios from 'axios';
import ITask from "@/models/ITask";
import Priority from "@/models/Priority";
import TaskStatus from "@/models/TaskStatus";
import Type from "@/models/Type";

class TaskState {
    tasks: Partial<ITask>;
    fetchedTask: Partial<ITask> = {
        id: -1,
        title: 'test',
        code: 'TES',
        description: 'Test description',
        estimation: 6,
        priority: Priority.low,
        status: TaskStatus.todo,
        type: Type.task,
        sprintId: 1,
        backlogId: null,
        creatorId: 1,
        assignerId: 4,
        assigner: [{id: -1, email: 'test@mail.com'}]
    };
}

class TaskGetters extends Getters<TaskState> {
    get fetchedTask() {
        return this.state.fetchedTask;
    }
}

class TaskMutations extends Mutations<TaskState> {
    setFetchedTask(task: Partial<ITask>) {
        this.state.fetchedTask = task;
    }
}

class TaskActions extends Actions<TaskState, TaskGetters, TaskMutations, TaskActions> {
    async createTask(payload: {task: Partial<ITask>, token: string, userId: number,projectId: number, backlogId: number}) {
        const {task, token, userId, projectId, backlogId} = payload;
        console.log(task);
        try {
            const url = `http://localhost:5000/tasks`;
            // const url = `http://localhost:5000/projects/${projectId}/sprints/${backlogId}/tasks`;
            const response = await axios.post(url, {
                ...task,
                userId,
                token,
                backlogId
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
    
    async updateTask(payload: {task: Partial<ITask>, taskId: number}) {
        const {task, taskId} = payload;
        const url = `http://localhost:5000/tasks/${taskId}`;
        try {
            const response = await axios.patch(url, task, {
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
    
    async fetchTask(taskId: number) {
        const url = `http://localhost:5000/tasks/${taskId}`;
        // const url = `http://localhost:5000/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`;
        try {
            const response = await axios.get(url);
            this.commit('setFetchedTask', response.data.task);
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


// const fetchedAssigner: WritableComputedRef<{id: number, email: string}> =
//     taskId.value ? computed({
//         get: () => fetchedTask.value.assigner,
//         set: (value) => fetchedTask.value.assigner = value
//     }) : computed({
//         get: () => assigner,
//         set: (value) => assigner.value = value
//     });