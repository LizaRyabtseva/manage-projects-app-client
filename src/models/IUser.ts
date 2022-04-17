export default interface IUser {
    id?: number;
    name: string;
    login: string;
    email: string;
    password?: string;
    role?: string;
    imgUrl: string;
}