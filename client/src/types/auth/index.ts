import { IUser } from "types/store/user";

export type ILoginRegister = {
    mode: string;
    user: IUser;
};

export type IIsAuth = {
    isAuth: boolean;
    user: IUser;
};