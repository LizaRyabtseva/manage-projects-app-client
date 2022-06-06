enum routesMap {
    auth = '/join',
    projects = '/projects',
    myProjects = '/my-projects',
    createProject = '/projects/create',
    project = '/projects/:projectId',
    editProject = '/projects/edit/:projectId',
    dashboard = '/dashboard',
    backlog = '/backlog',
    createSprint = '/projects/:projectId/sprints/create',
    updateSprint = '/projects/:projectId/sprints/update/:id',
    updateBacklog = '/projects/:projectId/backlog/update/:id',
    editTask = '/projects/:projectId/tasks/edit/:taskId',
    createTask = '/projects/:projectId/tasks/create',
    task = '/projects/:projectId/tasks/:taskId',
    spinner = '/spinner'
}

export default routesMap;