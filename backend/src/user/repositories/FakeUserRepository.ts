import { ILogger } from "../../logger/ILogger";
import { NotFoundError } from "../../errors";
import { IUserRepository, NewUser, User } from "./IUserRepository";

class FakeUserRepository implements IUserRepository {
    private readonly logger: ILogger
    private readonly LOG_PREFIX = 'FakeUserRepository';
    constructor(logger: ILogger) {
        this.logger = logger
    }
    private readonly users: User[] = [
        {
            id: '11111111-1111-1111-1111-111111111111',
            firstname: 'John',
            lastname: 'Doe',
            email: 'John.Doe@unknown.com',
            birthdate: '1990-01-01',
        },
        {
            id: '22222222-2222-2222-2222-222222222222',
            firstname: 'Jane',
            lastname: 'Doe',
            email: 'Jane.Doe@unknown.com',
            birthdate: '1990-01-01',
        }
    ];

    getAllUsers() {
        return Promise.resolve(this.users);
    }

    addUser(user: NewUser): Promise<User> {
        const newUser: User = {
            id: (this.users.length + 1).toString(),
            ...user,
        };
        this.users.push(newUser);
        return Promise.resolve(newUser);
    }

    updateUser(user: User): Promise<User> {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index === -1) {
            this.logger.error(`${this.LOG_PREFIX}: User with id ${user.id} not found`)
            throw new NotFoundError(`User with id ${user.id} not found`);
        }
        this.users[index] = user;
        return Promise.resolve(user);
    }

    deleteUser(id: string): Promise<void> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) {
            this.logger.error(`${this.LOG_PREFIX}: User with id ${id} not found`)
            throw new NotFoundError(`User with id ${id} not found`);
        }
        this.users.splice(index, 1);
        return Promise.resolve();
    }

    getByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.email === email)
        return Promise.resolve(user)
    }
}

export default FakeUserRepository;