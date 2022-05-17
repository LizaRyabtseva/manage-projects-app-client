import IUser from "@/models/IUser";

export default interface IProject {
    id: number;
    code: string;
    status: string;
    title: string;
    user: Partial<IUser> | string;
    description?: string;
    team: number[],
    allTeam: number[]
}