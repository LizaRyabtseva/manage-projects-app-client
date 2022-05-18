enum routesMap {
    auth = '/join',
    projects = '/projects',
    project = '/projects/:projectId',
    createProject = '/projects/create',
    updateProject = '/projects/update/:id',
    dashboard = '/sprints/:sprintId',
    createSprint = '/projects/:projectId/sprints/create',
    updateSprint = '/projects/:projectId/sprints/update/:id',
    updateBacklog = '/projects/:projectId/backlog/update/:id',
    createTask = '/projects/:projectId/:backlogId/tasks/create',
    updateTask = '/projects/:projectId/:backlogId/tasks/update/:id',
    task = '/projects/:projectId/:backlogId/tasks/:taskId'
}

export default routesMap;