enum routesMap {
    auth = '/join',
    projects = '/projects',
    project = '/projects/:projectId',
    createProject = '/projects/create',
    editProject = '/projects/edit/:projectId',
    dashboard = '/sprints/:sprintId',
    backlog = '/backlog/:backlogId',
    createSprint = '/projects/:projectId/sprints/create',
    updateSprint = '/projects/:projectId/sprints/update/:id',
    updateBacklog = '/projects/:projectId/backlog/update/:id',
    editTask = '/projects/:projectId/tasks/edit/:taskId',
    createTask = '/projects/:projectId/tasks/create',
    task = '/projects/:projectId/tasks/:taskId'
}

export default routesMap;