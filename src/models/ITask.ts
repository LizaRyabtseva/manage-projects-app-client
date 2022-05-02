import Priority from "@/models/Priority";
import Status from "@/models/Status";
import Type from "@/models/Type";

export default interface ITask {
    id: number,
    title: string,
    code: string,
    description: string,
    estimation: number,
    priority: Priority,
    status: Status,
    type: Type,
    sprintId: number | null,
    backlogId: number | null,
    creatorId: number,
    assignerId: number
}