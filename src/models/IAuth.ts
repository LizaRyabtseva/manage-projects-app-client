import IUser from "@/models/IUser";

export default interface IAuth {
    userData: Partial<IUser>;
    mode: string;
    expiresIn?: Date;
}