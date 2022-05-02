import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IProject from "@/models/IProject";


class ProjectState {
    projects: IProject[] = [];
    fetchedProject: IProject = {id: 1,
        title: 'rt',
        code: 'dfg',
        description: 'dfg',
        team: [3]
    };
    
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
    
    get fetchedProject() {
        return this.state.fetchedProject;
    }
}

class ProjectMutations extends Mutations<ProjectState> {
    setProjects(projects: IProject[]) {
        this.state.projects = projects;
    }
    
    setFetchedProject(project: IProject) {
        this.state.fetchedProject = project;
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
    
    async createProject(data: {project: IProject, token: string}) {
        try {
            const {project, token} = data; // получить токен из текущего пользователя
            const url = `http://localhost:5000/projects`;
            const response = await axios.post(url,
                project, {
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
    
    async updateProject(data: {project: IProject, token: string}) {
        try {
            const {project, token} = data; // получить токен из текущего пользователя
            
            const url = `http://localhost:5000/projects/${project.id}`;

            const response = await axios.patch(url,
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
    
    async fetchProject(id: number) {
        try {
            const response = await axios.get(`http://localhost:5000/projects/${id}`);
            const project = response.data.project;
    
            this.commit('setFetchedProject', project);
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
