import {Actions, Getters, Module, Mutations} from 'vuex-smart-module';
import axios from 'axios';
import ITask from "@/models/ITask";
import Priority from "@/models/Priority";
import TaskStatus from "@/models/TaskStatus";
import Type from "@/models/Type";

class TaskState {
    fetchedTasks: Partial<ITask>[] = [];
    fetchedTask: Partial<ITask> = {
        id: -1,
        title: '',
        code: '',
        description: '',
        estimation: 6,
        priority: Priority.low,
        status: TaskStatus.todo,
        type: Type.task,
        sprintId: -11,
        creatorId: 1,
        assignerId: 4,
        assigner: [{id: -1, email: '', name: ''}],
        creator: [{id: -1, email: '', name: ''}],
        project: {
            id: -1,
            title: ''
        },
    };
}

class TaskGetters extends Getters<TaskState> {
    // get fetchedBacklogTasks() {
    //     return this.state.backlogTasks;
    // }
    //
    // get fetchedSprintTasks() {
    //     return this.state.sprintTasks;
    // }
    
    get fetchedTasks() {
        return this.state.fetchedTasks;
    }
    
    get fetchedTask() {
        return this.state.fetchedTask;
    }
}

class TaskMutations extends Mutations<TaskState> {
    // setBacklogTasks(tasks: Partial<ITask>) {
    //     this.state.backlogTasks = tasks;
    // }
    //
    // setSprintTasks(tasks: Partial<ITask>) {
    //     this.state.sprintTasks = tasks;
    // }
    
    setFetchedTasks(tasks: Partial<ITask>[]) {
        this.state.fetchedTasks = tasks;
    }
    
    setFetchedTask(task: Partial<ITask>) {
        this.state.fetchedTask = task;
    }
}

class TaskActions extends Actions<TaskState, TaskGetters, TaskMutations, TaskActions> {
    async createTask(payload: {task: Partial<ITask>, token: string, userId: number,projectId: number, sprintId: number}) {
        const {task, token, userId, projectId, sprintId} = payload;
        console.log(task);
        try {
            const url = `http://localhost:5000/tasks`;
            // const url = `http://localhost:5000/projects/${projectId}/sprints/${backlogId}/tasks`;
            const response = await axios.post(url, {
                ...task,
                userId,
                token,
                sprintId
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

        try {
            const response = await axios.get(url);
            this.commit('setFetchedTask', response.data.task);
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async fetchTasksBySprintId(sprintId: number) {
        const url = `http://localhost:5000/tasks/sprint/${sprintId}`;
        
        try {
            const response = await axios.get(url);
                this.commit('setFetchedTasks', response.data.tasks);
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async fetchTasks(payload: {
        backlogId?: number,
        sprintId?: number,
    }) {
        const {backlogId, sprintId} = payload;
        const sprintUrl = `http://localhost:5000/tasks/sprint/${sprintId}`;
        const backlogUrl = `http://localhost:5000/tasks/sprint/${backlogId}`;
        try {
            const response = [];
            if (sprintId) {
                const sprintResponse = await axios.get(sprintUrl);
                response.push(...sprintResponse.data.tasks);
            }
            if (backlogId) {
                const backlogResponse = await axios.get(backlogUrl);
                response.push(...backlogResponse.data.tasks);
            }
            this.commit('setFetchedTasks', response);
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