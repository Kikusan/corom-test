export interface ILoginUserRepository {
    isAllowed(user: LoginUser): Promise<boolean>;
}

export type LoginUser = {
    username: string;
    password: string;
}