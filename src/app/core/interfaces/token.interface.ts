import { User } from "./user.interface";

export interface Token {
    token: string;
    user:  User;
}