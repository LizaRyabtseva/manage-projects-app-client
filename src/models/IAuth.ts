import IUser from "@/models/IUser";
import IUserShort from "@/models/IUserShort";

export default interface IAuth {
    userData: IUser | IUserShort;
    mode: string;
    expiresIn?: Date;
}