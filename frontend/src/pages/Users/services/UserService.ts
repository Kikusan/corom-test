import { apiClient } from "../../../utils/apiClient";
import IUserService from "./IUserService";
import { RegisteredUser, TableUser, UserBase } from "./User";

type UserFromApi = {
    id?: string,
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
}


export class UserService implements IUserService {

    async getUsers(): Promise<TableUser[]> {
        const users = await apiClient('/user');
        return users.map((user: UserFromApi, index: number) => ({ ...user, birthdate: new Date(user.birthdate), id: index, technicalId: user.id }))

    }

    async createUser(userToBeCreated: UserBase): Promise<RegisteredUser> {
        const formattedUser: UserFromApi = {
            ...userToBeCreated,
            birthdate: new Date(userToBeCreated.birthdate).toISOString().split('T')[0]
        }
        const newUser = await apiClient('/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formattedUser),
        })
        return { ...newUser, birthdate: new Date(newUser.birthdate) }
    }

    deleteUser(id: string): Promise<void> {
        return apiClient(`/user/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({}),
        })
    }

    updateUser(userToBeUpdated: RegisteredUser): Promise<RegisteredUser> {
        return apiClient(`/user/${userToBeUpdated.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...userToBeUpdated, birthdate: new Date(userToBeUpdated.birthdate).toISOString().split('T')[0] }),
        })
    }
}