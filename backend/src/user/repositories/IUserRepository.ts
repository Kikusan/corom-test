export interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    addUser(user: NewUser): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getByEmail(email: string): Promise<User | undefined>;
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