import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IUser from "@/models/IUser";
import IProject from "@/models/IProject";

class AppState {
    foundUsers: IUser[];
    foundProjects: IProject[]
}

class AppGetters extends Getters<AppState> {
    get foundUsers() {
        return this.state.foundUsers;
    }
    
    get foundProjects() {
        return this.state.foundProjects;
    }
}

class AppMutations extends Mutations<AppState> {
    setFoundUsers(users: IUser[]) {
        this.state.foundUsers = users;
    }
    setFoundProjects(projects: IProject[]) {
        this.state.foundProjects = projects;
    }
}

class AppActions extends Actions<AppState, AppGetters, AppMutations, Actions> {
    async searchHandler(payload: {category: string, value: string}) {
        const {category, value} = payload;
        try {
            const url = `http://localhost:5000/api/${category}/find?query=${value}`;
            const response = await axios.get(url, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
    
                // headers: {
                //     'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + this.state.token
                // }
            console.log(response.data);
            if (category === 'users') {
                this.commit('setFoundUsers', response.data.users);
            } else if (category === 'project') {
                this.commit('setFoundProjects', response.data.projects);
            }
            
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const apiModule = new Module({
    state:AppState,
    getters: AppGetters,
    mutations: AppMutations,
    actions: AppActions
});
