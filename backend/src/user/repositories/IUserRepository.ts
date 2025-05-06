import { Search } from "../service";

export interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    addUser(user: NewUser): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getByEmail(email: string): Promise<User | undefined>;
    searchUsers(search?: Search): Promise<User[]>;
    getUsersCount(search?: Search): Promise<number>
}

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
}

export type NewUser = {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
}


