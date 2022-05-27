import IUser from "@/models/IUser";

export default interface IComment {
    id: number,
    text: string,
    date: string,
    userId: number,
    user: Partial<IUser>,
    taskId: number
}