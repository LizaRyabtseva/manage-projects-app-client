import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IProject from "@/models/IProject";


class ProjectState {
    projects: IProject[] = [];
    
    projectHeader: IProject = {
        id: -1,
        title: 'Project Title',
        code: 'Code',
        user: 'Project Lead'
    };
    
}

class ProjectGetters extends Getters<ProjectState> {
    get projects() {
        return this.state.projects;
    }
    
    get projectHeaderTable() {
        return this.state.projectHeader;
    }
}

class ProjectMutations extends Mutations<ProjectState> {
    setProjects(projects: IProject[]) {
        this.state.projects = projects;
    }
}

class ProjectActions extends Actions<ProjectState, ProjectGetters, ProjectMutations, ProjectActions> {
    async fetchProjects() {
        try {
            const response = await axios.get('http://localhost:5000/projects');
            const projects = response.data.projects;
            
            this.commit('setProjects', projects);
            
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async createProject(data: IProject) {
        try {
            const token = ''; // получить токен из текущего пользователя
            const response = await axios.post(`http://localhost:5000/projects/create`,
                data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`}
                });
            
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
     // this.commit('changeProject', payload);
}

export const projectModule = new Module({
    state: ProjectState,
    getters: ProjectGetters,
    mutations: ProjectMutations,
    actions: ProjectActions
});
