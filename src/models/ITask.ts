import Priority from "@/models/Priority";
import TaskStatus from "@/models/TaskStatus";
import Type from "@/models/Type";
import IUser from "@/models/IUser";
import IProject from "@/models/IProject";

export default interface ITask {
    id: number,
    title: string,
    code: string,
    description: string,
    estimation: number,
    priority: Priority,
    status: TaskStatus,
    type: Type,
    sprintId: number | null,
    creatorId: number,
    assignerId: number,
    assigner: Partial<IUser>[],
    creator: Partial<IUser>[],
    project: Partial<IProject>
}