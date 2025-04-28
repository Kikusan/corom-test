import { ILogger } from "../../logger/ILogger";
import { NotFoundError } from "../../errors";
import { IUserRepository, NewUser, User } from "./IUserRepository";
import { Search } from "../service";

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
        },
        {
            id: '33333333-3333-3333-3333-333333333333',
            firstname: 'Michael',
            lastname: 'Smith',
            email: 'Michael.Smith@unknown.com',
            birthdate: '1985-05-15',
        },
        {
            id: '44444444-4444-4444-4444-444444444444',
            firstname: 'Sarah',
            lastname: 'Johnson',
            email: 'Sarah.Johnson@unknown.com',
            birthdate: '1987-07-21',
        },
        {
            id: '55555555-5555-5555-5555-555555555555',
            firstname: 'David',
            lastname: 'Williams',
            email: 'David.Williams@unknown.com',
            birthdate: '1992-11-30',
        },
        {
            id: '66666666-6666-6666-6666-666666666666',
            firstname: 'Emily',
            lastname: 'Brown',
            email: 'Emily.Brown@unknown.com',
            birthdate: '1993-02-12',
        },
        {
            id: '77777777-7777-7777-7777-777777777777',
            firstname: 'Daniel',
            lastname: 'Jones',
            email: 'Daniel.Jones@unknown.com',
            birthdate: '1988-03-28',
        },
        {
            id: '88888888-8888-8888-8888-888888888888',
            firstname: 'Laura',
            lastname: 'Miller',
            email: 'Laura.Miller@unknown.com',
            birthdate: '1995-06-25',
        },
        {
            id: '99999999-9999-9999-9999-999999999999',
            firstname: 'James',
            lastname: 'Davis',
            email: 'James.Davis@unknown.com',
            birthdate: '1991-10-10',
        },
        {
            id: '10101010-1010-1010-1010-101010101010',
            firstname: 'Olivia',
            lastname: 'Garcia',
            email: 'Olivia.Garcia@unknown.com',
            birthdate: '1989-04-04',
        },
        {
            id: '12121212-1212-1212-1212-121212121212',
            firstname: 'Christopher',
            lastname: 'Rodriguez',
            email: 'Christopher.Rodriguez@unknown.com',
            birthdate: '1986-09-18',
        },
        {
            id: '13131313-1313-1313-1313-131313131313',
            firstname: 'Megan',
            lastname: 'Martinez',
            email: 'Megan.Martinez@unknown.com',
            birthdate: '1994-08-08',
        },
        {
            id: '14141414-1414-1414-1414-141414141414',
            firstname: 'Matthew',
            lastname: 'Hernandez',
            email: 'Matthew.Hernandez@unknown.com',
            birthdate: '1987-12-25',
        },
        {
            id: '15151515-1515-1515-1515-151515151515',
            firstname: 'Sophia',
            lastname: 'Lopez',
            email: 'Sophia.Lopez@unknown.com',
            birthdate: '1992-02-22',
        },
        {
            id: '16161616-1616-1616-1616-161616161616',
            firstname: 'Joshua',
            lastname: 'Gonzalez',
            email: 'Joshua.Gonzalez@unknown.com',
            birthdate: '1984-07-13',
        },
        {
            id: '17171717-1717-1717-1717-171717171717',
            firstname: 'Madison',
            lastname: 'Wilson',
            email: 'Madison.Wilson@unknown.com',
            birthdate: '1993-01-01',
        },
        {
            id: '18181818-1818-1818-1818-181818181818',
            firstname: 'Ethan',
            lastname: 'Anderson',
            email: 'Ethan.Anderson@unknown.com',
            birthdate: '1996-05-20',
        },
        {
            id: '19191919-1919-1919-1919-191919191919',
            firstname: 'Chloe',
            lastname: 'Thomas',
            email: 'Chloe.Thomas@unknown.com',
            birthdate: '1991-09-17',
        },
        {
            id: '20202020-2020-2020-2020-202020202020',
            firstname: 'Aiden',
            lastname: 'Taylor',
            email: 'Aiden.Taylor@unknown.com',
            birthdate: '1995-03-30',
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

    searchUsers(search: Search): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    getUsersCount(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

export default FakeUserRepository;