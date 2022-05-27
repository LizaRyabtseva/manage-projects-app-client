import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IUser from "@/models/IUser";
import IProject from "@/models/IProject";
import IComment from "@/models/IComment";

class AppState {
    foundUsers: Partial<IUser>[];
    foundProjects: Partial<IProject>[];
    countTasks = 0;
    isUniqueValue = true;
    comments: Partial<IComment>[] = [];
    
}

class AppGetters extends Getters<AppState> {
    get foundUsers() {
        return this.state.foundUsers;
    }
    
    get foundProjects() {
        return this.state.foundProjects;
    }
    
    get countTasks() {
        return this.state.countTasks;
    }
    
    get isUniqueValue() {
        return this.state.isUniqueValue;
    }
    
    get comments() {
        return this.state.comments;
    }
}

class AppMutations extends Mutations<AppState> {
    setFoundUsers(users: Partial<IUser>[]) {
        this.state.foundUsers = users;
    }
    
    setFoundProjects(projects: Partial<IProject>[]) {
        this.state.foundProjects = projects;
    }
    
    setCountTasks(count: number) {
        this.state.countTasks = count;
    }
    
    setIsUniqueValue(value: boolean) {
        this.state.isUniqueValue = value;
    }
    
    setComments(comments: Partial<IComment>[]) {
        this.state.comments = comments;
    }
}

class AppActions extends Actions<AppState, AppGetters, AppMutations, Actions> {
    async searchHandler(payload: {category: string, value: string, projectId?: number}) {
        const {category, value, projectId} = payload;
        try {
            const url = projectId ?
                `http://localhost:5000/api/${category}/find?query=${value}&projectId=${projectId}` :
                `http://localhost:5000/api/${category}/find?query=${value}`;
            const response = await axios.get(url, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
    
            // headers: {
                //     'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + this.state.token
                // }
            // console.log(response.data);
            if (category === 'users' || category === 'usersInProject') {
                this.commit('setFoundUsers', response.data.users);
            } else if (category === 'projects') {
                this.commit('setFoundProjects', response.data.projects);
            }
            
        } catch (err) {
            console.log(err.message);
        }
    }
    
    async countTasks(projectId: number) {
        const url = `http://localhost:5000/api/projects/${projectId}/count-tasks`;
        try {
            const response = await axios.get(url);
            this.commit('setCountTasks', response.data.count);
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async checkUniqueValue(payload: {value: string, type: string}) {
        const {value, type} = payload;

        const url = `http://localhost:5000/api/users/is-unique?type=${type}&value=${value}`;
        try {
            const response = await axios.get(url);
            const result = response.data.valid;
            this.commit('setIsUniqueValue', result);
            
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async createComment(payload: {text: string, date: string, taskId: number, userId: number,}) {
        console.log(payload);
        const {text, date, taskId, userId} = payload;
        const url = `http://localhost:5000/api/tasks/${taskId}/comment`;
        try {
            const response = await axios.post(url, {
                text,
                date,
                userId
            }, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        } catch (err) {
            throw err.response.data.message;
            // console.log(err.response);
            // console.log(err.message);
        }
    }
    
    async fetchComments(taskId: number) {
        const url = `http://localhost:5000/api/tasks/${taskId}/comments`;
        
        try {
            const response = await axios.get(url);
            if (response.data.comments) {
                this.commit('setComments', response.data.comments);
            }
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
}

export const apiModule = new Module({
    state: AppState,
    getters: AppGetters,
    mutations: AppMutations,
    actions: AppActions
});
