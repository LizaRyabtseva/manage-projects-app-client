import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import axios from 'axios';
import IProject from "@/models/IProject";
import ProjectStatus from "@/models/ProjectStatus";
import type from "@/models/Type";


class ProjectState {
    fetchedProjects: Partial<IProject>[] = [];
    fetchedProject: Partial<IProject> = {
        id: 1,
        title: '',
        code: '',
        status: 'Active',
        ownerId: -2,
        owner: {
            id: -1,
            name: '',
            email: ''
        },
        description: '',
        team: []
    };
    
    projectHeader: Partial<IProject> = {
        id: -1,
        title: 'Project Title',
        code: 'Code',
        status: 'Status',
        owner: 'Project Lead'
    };
    
}

class ProjectGetters extends Getters<ProjectState> {
    get fetchedProjects() {
        return this.state.fetchedProjects;
    }
    
    get projectHeaderTable() {
        return this.state.projectHeader;
    }
    
    get fetchedProject() {
        return this.state.fetchedProject;
    }
}

class ProjectMutations extends Mutations<ProjectState> {
    setFetchedProjects(projects: Partial<IProject>[]) {
        this.state.fetchedProjects = projects;
    }
    
    setFetchedProject(project: Partial<IProject>) {
        this.state.fetchedProject = project;
    }
}

class ProjectActions extends Actions<ProjectState, ProjectGetters, ProjectMutations, ProjectActions> {
    async fetchProjects() {
        const url = 'http://localhost:5000/projects';
        try {
            const response = await axios.get(url);
            const projects = response.data.projects;
            
            this.commit('setFetchedProjects', projects);
            
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async fetchProjectByUserId(userId: number) {
        const url = `http://localhost:5000/projects/users/${userId}`;
        try {
            const response = await axios.get(url);
            if (response.data.projects) {
                this.commit('setFetchedProjects', response.data.projects);
            }
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async createProject(data: {project: Partial<IProject>, token: string}) {
        const {project, token} = data; // получить токен из текущего пользователя
        console.log(project);
        try {
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
    
    async updateProject(data: {project: Partial<IProject>, token: string}) {
        const {project, token} = data; // получить токен из текущего пользователя
        console.log(project);
        let url = `http://localhost:5000/projects/${project.id}`;
        try {
            const response = await axios.patch(url,
                project, {
                    headers: {
                        'Content-Type': 'application/json'
                        // Authorization: `Bearer ${token}`
                        }
                });
        } catch (err) {
            throw err.response.data.message;
        }
        console.log(project.status);
        if (project.status === ProjectStatus.finished) {
            url = `http://localhost:5000/projects/finish/${project.id}`;
            try {
                const response = await axios.patch(url, {status: project.status}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (err) {
                console.log(err.response);
                console.log(err.message);
            }
        }
    }
    
    async fetchProject(id: number) {
        console.log(id);
        const url = `http://localhost:5000/projects/${id}`;
        try {
            const response = await axios.get(url);
            const project = response.data.project;
            
            this.commit('setFetchedProject', project);
        } catch (err) {
            console.log(err.response);
            console.log(err.message);
        }
    }
    
    async makeCurrentProject(payload: {projectId: number, userId: number}) {
        const {projectId, userId} = payload;
        const url = `http://localhost:5000/projects/make-current-project`;
        try {
            const response = await axios.patch(url, {
                projectId,
                userId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            throw err.response.data.message;
            // console.log(err.response);
            // console.log(err.message);
        }
    }
}


export const projectModule = new Module({
    state: ProjectState,
    getters: ProjectGetters,
    mutations: ProjectMutations,
    actions: ProjectActions
});
