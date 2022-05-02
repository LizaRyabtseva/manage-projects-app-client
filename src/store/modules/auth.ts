import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IAuth from "@/models/IAuth";
// import IUser from "@/models/IUser";

class UserState {
    userId: number | null = null;
    token: string | null = null;
    tokenExpirationDate: null | number = null;
    timer = 0;
    autoLogout = false;
    isAuthenticated = false;
    currentProject: number | null = null;
}

class UserGetters extends Getters<UserState> {
    get tokenExpirationDate() {
        return this.state.tokenExpirationDate;
    }
    get userId() {
        return this.state.userId;
    }
    get token() {
        return this.state.token;
    }
    get isAuthenticated() {
        return this.state.isAuthenticated;
    }
    get currentProject() {
        return this.state.currentProject;
    }
}

class UserMutations extends Mutations<UserState> {
    setUser(payload: {id: number | null, token: string | null, seconds: number | null}) {
        this.state.userId = payload.id;
        this.state.token = payload.token;
        this.state.tokenExpirationDate = payload.seconds;
    }
    setAutoLogout(value: boolean) {
        this.state.autoLogout = value;
    }
    setIsAuthenticated(value: boolean) {
        this.state.isAuthenticated = value;
    }
    setCurrentProject(projectId: number | null) {
        this.state.currentProject = projectId;
    }
}

class UserActions extends Actions<UserState, UserGetters, UserMutations, UserActions> {
    async auth(payload: IAuth) {
        const {userData, mode} = payload;

        try {
            const url = mode === 'signup' ?
                'http://localhost:5000/join/sign-up' :
                'http://localhost:5000/join/login';
           
            const response = await axios.post(url, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const {user, token, expiration} = response.data; //6h
            const expirationDate: number = expiration + new Date().getTime();
            
            localStorage.setItem('userId', user.id);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate.toString());
            
            this.commit('setUser', {id: user.id, token: token, seconds: expirationDate});
            this.commit('setAutoLogout', false);
            this.commit('setIsAuthenticated', true);
            this.commit('setCurrentProject', user.currentProject);
            
            this.state.timer = setTimeout(() => {
                this.dispatch('logout');
            }, expiration);
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
        
    }
    
    async tryLogin() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        let projectId: number | null = null;
        
        if (userId) {
            try {
                await this.dispatch('fetchCurrentProject', +userId);
            } catch (err) {
                console.log(err);
            }
            projectId = this.state.currentProject;
            this.commit('setCurrentProject', projectId);
        }
    
        if (expirationDate && userId && token) {
            const expiresIn = +expirationDate - new Date().getTime();
    
            this.state.timer = setTimeout(() => {
                this.dispatch('logout');
            }, expiresIn);
    
            this.commit('setUser', {id: +userId, token: token, seconds: +expiresIn});
            this.commit('setAutoLogout', false);
            this.commit('setIsAuthenticated', true);
            
        } else {
            console.log('try login failed');
        }
        
    }
    
    logout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        clearTimeout(this.state.timer)
    
        this.commit('setUser', {id: null, token: null, seconds: null});
        this.commit('setIsAuthenticated', false);
    }
    
    autoLogout() {
        this.dispatch('logout');
        this.commit('setAutoLogout', true);
    }
    
    async fetchCurrentProject(userId: number) {
        try {
            const url = `http://localhost:5000/api/users/${userId}/current-project`;
            const response = await axios.get(url);
            this.commit('setCurrentProject', response.data.currentProject);
        } catch (err) {
            console.log(err);
        }
    }
}

export const authModule = new Module({
    state: UserState,
    getters: UserGetters,
    mutations: UserMutations,
    actions: UserActions
});