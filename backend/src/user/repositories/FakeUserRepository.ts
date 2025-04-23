import NotFoundError from "../../errors/NotFoundError";
import { IUserRepository, NewUser, User } from "./IUserRepository";

class FakeUserRepository implements IUserRepository {

    private readonly users: User[] = [
        {
            id: '1',
            firstname: 'John',
            lastname: 'Doe',
            email: 'John.Doe@unknown.com',
            birthdate: '1990-01-01',
        },
        {
            id: '2',
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
            throw new NotFoundError(`User with id ${user.id} not found`);
        }
        this.users[index] = user;
        return Promise.resolve(user);
    }

    deleteUser(id: string): Promise<void> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) {
            throw new NotFoundError(`User with id ${id} not found`);
        }
        this.users.splice(index, 1);
        return Promise.resolve();
    }
}

export default FakeUserRepository;