enum routesMap {
    auth = '/join',
    projects = '/projects',
    project = '/projects/:id',
    createProject = '/projects/create',
    updateProject = '/projects/update/:id',
    createSprint = '/projects/:projectId/sprints/create',
    updateSprint = '/projects/:projectId/sprints/update/:id',
    updateBacklog = '/projects/:projectId/backlog/update/:id',
    createTask = '/projects/:projectId/:backlogId/tasks/create',
    updateTask = '/projects/:projectId/:backlogId/tasks/update/:id'
}

export default routesMap;