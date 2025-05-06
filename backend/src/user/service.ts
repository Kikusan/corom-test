import { ILogger } from "src/logger/ILogger";
import { IUserRepository, NewUser, User } from "./repositories/IUserRepository";
import BadRequestError from "../errors/BadRequestError";

export type Page = {
    users: User[],
    totalPages: number,
    totalUsers: number
}

export enum SortOrder {
    FirstnameAsc = "firstname:asc",
    FirstnameDesc = "firstname:desc",
    LastnameAsc = "lastname:asc",
    LastnameDesc = "lastname:desc",
    BirthdateAsc = "birthdate:asc",
    BirthdateDesc = "birthdate:desc",
    EmailAsc = "email:asc",
    EmailDesc = "email:desc"
}


export type Search = {
    page: number,
    pageSize: number,
    sort?: SortOrder,
}
export default class UserService {
    private readonly repository: IUserRepository;
    private readonly logger: ILogger;
    private readonly defaultSearch: Search = {
        page: 1,
        pageSize: 10
    }
    constructor(userRepository: IUserRepository, logger: ILogger) {
        this.repository = userRepository;
        this.logger = logger;
    }

    public getUsers(): Promise<User[]> {
        this.logger.info('begin to get users')
        return this.repository.getAllUsers();
    }

    public async searchUsers(search: Search = this.defaultSearch): Promise<Page> {
        const { pageSize } = search;
        this.logger.info('begin to search users')
        const users = await this.repository.searchUsers(search);
        const totalUsers = await this.repository.getUsersCount();
        const totalPages = Math.ceil(totalUsers / pageSize);

        return {
            users,
            totalPages,
            totalUsers,
        };
    }

    public async addUser(user: NewUser): Promise<User> {
        this.logger.info('begin to add a new user', { newUser: user })
        const userWithSameEmail = await this.repository.getByEmail(user.email)
        if (userWithSameEmail) {
            throw new BadRequestError(`User with email ${user.email} already exists`)
        }
        return this.repository.addUser(user);
    }
    public async updateUser(user: User): Promise<User> {
        this.logger.info(`begin to update user ${user.id}`, { updatedUser: user })
        const userWithSameEmail = await this.repository.getByEmail(user.email)
        if (userWithSameEmail && userWithSameEmail.id !== user.id) {
            throw new BadRequestError(`User with email ${user.email} already exists`)
        }
        return this.repository.updateUser(user);
    }
    public deleteUser(id: string): Promise<void> {
        this.logger.info(`begin to delete user ${id}`)
        return this.repository.deleteUser(id);
    }
}