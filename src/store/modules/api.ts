import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IUser from "@/models/IUser";

class AppState {
    foundUsers: IUser[]
}

class AppGetters extends Getters<AppState> {
    get foundUsers() {
        return this.state.foundUsers;
    }
}

class AppMutations extends Mutations<AppState> {
    setFoundUsers(users: IUser[]) {
        this.state.foundUsers = users;
    }
}

class AppActions extends Actions<AppState, AppGetters, AppMutations, Actions> {
    async searchUser(payload: string) {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/find?query=${payload}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            // headers: {
            //     'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + this.state.token
            // }
            
            this.commit('setFoundUsers', response.data.users);
            
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
