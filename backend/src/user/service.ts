import { IUserRepository, NewUser, User } from "./repositories/IUserRepository";

export default class UserService {
    private readonly repository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.repository = userRepository;
    }

    public getUsers(): Promise<User[]> {
        return this.repository.getAllUsers();
    }

    public addUser(user: NewUser): Promise<User> {
        return this.repository.addUser(user);
    }
    public updateUser(user: User): Promise<User> {
        return this.repository.updateUser(user);
    }
    public deleteUser(id: string): Promise<void> {
        return this.repository.deleteUser(id);
    }
}