import { ILogger } from "src/logger/ILogger";
import { IUserRepository, NewUser, User } from "./repositories/IUserRepository";

export default class UserService {
    private readonly repository: IUserRepository;
    private readonly logger: ILogger;
    constructor(userRepository: IUserRepository, logger: ILogger) {
        this.repository = userRepository;
        this.logger = logger;
    }

    public getUsers(): Promise<User[]> {
        this.logger.info('begin to get users')
        return this.repository.getAllUsers();
    }

    public addUser(user: NewUser): Promise<User> {
        this.logger.info('begin to add a new user', { newUser: user })
        return this.repository.addUser(user);
    }
    public updateUser(user: User): Promise<User> {
        this.logger.info(`begin to update user ${user.id}`, { updatedUser: user })
        return this.repository.updateUser(user);
    }
    public deleteUser(id: string): Promise<void> {
        this.logger.info(`begin to delete user ${id}`)
        return this.repository.deleteUser(id);
    }
}