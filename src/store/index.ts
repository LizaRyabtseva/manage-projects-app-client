import {createStore, Module} from "vuex-smart-module";
import {authModule} from "@/store/modules/auth";
import {apiModule} from "@/store/modules/api";
import {projectModule} from '@/store/modules/project';
import {taskModule} from "@/store/modules/task";
import {sprintModule} from "@/store/modules/sprint";


export const root = new Module({
    modules: {
        auth: authModule,
        api: apiModule,
        project: projectModule,
        sprint: sprintModule,
        task: taskModule,
    }
});

export const store = createStore(root);

// type Project = {
//     id: number,
//     code: string,
//     title: string,
//     description: string
// }
//
// type Ticket = {
//     id: number,
//     title: string,
//     description: string,
//     estimation: number,
//     type: string,
//     status: string,
//     priority: string,
//     creator: {
//         name: string,
//         email: string
//     },
//     executor: {
//         name: string,
//         email: string
//     }
// };
//
// enum TaskStatus {
//     TODO = 'TO DO',
//     INPROGRESS = 'IN PROGRESS',
//     TESTING = 'TESTING',
//     DONE = 'DONE'
// }
//
// export interface State {
//     projects: Array<Project>;
//     tickets: Array<Ticket>;
//     statuses: Array<TaskStatus>;
// }
//
// export default createStore<State>({
//     modules: {
//         prModule: project
//     },
//     state() {
//         return {
//             // projects: [
//             //     {
//             //         id: 1,
//             //         title: 'First Project',
//             //         description: 'Some description for project.'
//             //     },
//             //     {
//             //         id: 2,
//             //         title: 'Second Project',
//             //         description: 'Some description for second project.'
//             //     }
//             // ],
//             tickets: [
//                 {
//                     id: 1,
//                     title: 'First title',
//                     description: 'Some description for first task.',
//                     estimation: 5,
//                     priority: 'Low',
//                     type: 'Bug',
//                     status: 'TO DO',
//                     creator: {
//                         name: 'Liza Rabtsava',
//                         email: 'lizaveta.rabtsava@gmail.com'
//                     },
//                     executor: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     }
//                 },
//                 {
//                     id: 2,
//                     title: 'Second title',
//                     description: 'Ut enim ad minima veniam, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, ut et voluptates repudiandae sint et molestiae non recusandae? Quis autem vel eum iure reprehenderit, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, sunt in culpa qui officia deserunt mollit anim id est laborum!',
//                     estimation: 7,
//                     priority: 'High',
//                     type: 'Story',
//                     status: 'IN PROGRESS',
//                     creator: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     },
//                     executor: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     }
//                 },
//                 {
//                     id: 3,
//                     title: 'Third title',
//                     description: 'Some description for second task.',
//                     estimation: 7,
//                     priority: 'Medium',
//                     type: 'Task',
//                     status: 'DONE',
//                     creator: {
//                         name: 'Vlad Vlasenko',
//                         email: 'vlad.vlasenko@gmail.com'
//                     },
//                     executor: {
//                         name: 'Vlad Vlasenko',
//                         email: 'vlad.vlasenko@gmail.com'
//                     }
//                 },
//                 {
//                     id: 4,
//                     title: 'Forth title',
//                     description: 'Some description for second task.',
//                     estimation: 7,
//                     priority: 'High',
//                     type: 'Epic',
//                     status: 'TESTING',
//                     creator: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     },
//                     executor: {
//                         name: 'Yulia Yurkova',
//                         email: 'yulia.yurkova@gmail.com'
//                     }
//                 },
//                 {
//                     id: 5,
//                     title: 'Fifth title',
//                     description: 'Some description for second task.',
//                     estimation: 7,
//                     priority: 'High',
//                     type: 'Epic',
//                     status: 'TO DO',
//                     creator: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     },
//                     executor: {
//                         name: 'Liza Rabtsava',
//                         email: 'lizaveta.rabtsava@gmail.com'
//                     }
//                 },
//                 {
//                     id: 6,
//                     title: 'Sixth title',
//                     description: 'Some description for second task.',
//                     estimation: 7,
//                     priority: 'High',
//                     type: 'Sub-task',
//                     status: 'DONE',
//                     creator: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     },
//                     executor: {
//                         name: 'Vlad Vlasenko',
//                         email: 'vlad.vlasenko@gmail.com'
//                     }
//                 },
//                 {
//                     id: 7,
//                     title: 'Seventh title',
//                     description: 'Some description for second task.',
//                     estimation: 7,
//                     priority: 'Medium',
//                     type: 'Task',
//                     status: 'TO DO',
//                     creator: {
//                         name: 'Anna Drapeza',
//                         email: 'anna.drapeza@gmail.com'
//                     },
//                     executor: {
//                         name: 'Vlad Vlasenko',
//                         email: 'vlad.vlasenko@gmail.com'
//                     }
//                 },
//
//             ],
//             statuses: [TaskStatus.TODO, TaskStatus.INPROGRESS, TaskStatus.TESTING, TaskStatus.DONE],
//
//         }
//     },
//     mutations: {
//
//     },
//     actions: {
//
//     },
//     getters: {
//         projects(state) {
//             return state.projects;
//         },
//         tickets(state) {
//             return state.tickets;
//         },
//         statuses(state) {
//             return state.statuses;
//         },
//         getTicketById: state => (id: number) => {
//                 return state.tickets.find(task => task.id === id);
//             }
//     }
// })
