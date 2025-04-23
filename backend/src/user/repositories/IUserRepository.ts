export interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    addUser(user: NewUser): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
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