import { apiClient } from "../../../utils/apiClient";
import ApiError from "../../../utils/errors/ApiError";
import BadRequestError from "../../../utils/errors/BadRequestError";
import NotFoundError from "../../../utils/errors/NotFoundError";
import UnexpectedError from "../../../utils/errors/UnexpectedError";
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
        let result;
        try {
            const users = await apiClient('/user');
            result = users.map((user: UserFromApi, index: number) => ({ ...user, birthdate: new Date(user.birthdate), id: index, technicalId: user.id }))
        } catch (e: unknown) {
            this.handleError(e);
        }
        return result
    }

    async createUser(userToBeCreated: UserBase): Promise<RegisteredUser> {
        let result;
        const formattedUser: UserFromApi = {
            ...userToBeCreated,
            birthdate: new Date(userToBeCreated.birthdate).toISOString().split('T')[0]
        }
        try {
            const newUser = await apiClient('/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedUser),
            })
            result = { ...newUser, birthdate: new Date(newUser.birthdate) }
        } catch (e: unknown) {
            this.handleError(e);
        }
        return result;
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await apiClient(`/user/${id}`, {
                method: 'DELETE',
            })
        } catch (e: unknown) {
            this.handleError(e);
        }
    }



    async updateUser(userToBeUpdated: RegisteredUser): Promise<RegisteredUser> {
        let result;
        try {
            result = await apiClient(`/user/${userToBeUpdated.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userToBeUpdated, birthdate: new Date(userToBeUpdated.birthdate).toISOString().split('T')[0] }),
            })

        } catch (e: unknown) {
            this.handleError(e);
        }
        return result;
    }
    private handleError(e: unknown) {
        let error: Error = new UnexpectedError();
        if (e instanceof ApiError) {
            switch (e.statusCode) {
                case 404:
                    error = new NotFoundError(e.message);
                    break;
                case 400:
                    error = new BadRequestError(e.message);
                    break;
                default:
                    error = new UnexpectedError(e.message);
            }
        }
        throw error;
    }
}