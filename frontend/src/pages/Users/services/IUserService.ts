import { UserBase, RegisteredUser, TableUser } from './User'

export default interface IUserService {
    getUsers(): Promise<TableUser[]>;
    createUser(userToBeCreated: UserBase): Promise<RegisteredUser>
    deleteUser(id: string): Promise<void>;
    updateUser(userToBeUpdated: RegisteredUser): Promise<RegisteredUser[]>;
}