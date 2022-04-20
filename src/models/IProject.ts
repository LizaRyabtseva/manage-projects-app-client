import IUser from "@/models/IUser";

export default interface IProject {
    id?: number;
    code: string;
    title: string;
    user?: IUser | string;
    description?: string;
    team?: number[]
}