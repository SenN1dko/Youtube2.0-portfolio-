import type { IUser } from "./user.type";

export interface IEmailVerificationResponse {
    message: string,
    user: IUser
} 