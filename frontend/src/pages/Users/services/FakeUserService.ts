import IUserService from "./IUserService";
import { RegisteredUser, TableUser, UserBase } from "./User";


export class FakeUserService implements IUserService {
    private users: RegisteredUser[] = [
        {
            id: '1',
            firstname: 'Alice',
            lastname: 'Dupont',
            email: 'alice.dupont@email.com',
            birthdate: new Date('1990-04-15'),
        },
        {
            id: '2',
            firstname: 'Bob',
            lastname: 'Martin',
            email: 'bob.martin@email.com',
            birthdate: new Date('1985-11-23'),
        },
        {
            id: '3',
            firstname: 'Claire',
            lastname: 'Bernard',
            email: 'claire.bernard@email.com',
            birthdate: new Date('1992-07-08'),
        },
        {
            id: '4',
            firstname: 'David',
            lastname: 'Moreau',
            email: 'david.moreau@email.com',
            birthdate: new Date('1988-01-30'),
        },
        {
            id: '5',
            firstname: 'Emma',
            lastname: 'Lefèvre',
            email: 'emma.lefevre@email.com',
            birthdate: new Date('1995-09-12'),
        },
        {
            id: '6',
            firstname: 'François',
            lastname: 'Petit',
            email: 'francois.petit@email.com',
            birthdate: new Date('1987-03-22'),
        },
        {
            id: '7',
            firstname: 'Gabrielle',
            lastname: 'Girard',
            email: 'gabrielle.girard@email.com',
            birthdate: new Date('1993-08-19'),
        },
        {
            id: '8',
            firstname: 'Hugo',
            lastname: 'Blanc',
            email: 'hugo.blanc@email.com',
            birthdate: new Date('1991-05-11'),
        },
        {
            id: '9',
            firstname: 'Isabelle',
            lastname: 'Gauthier',
            email: 'isabelle.gauthier@email.com',
            birthdate: new Date('1989-02-04'),
        },
        {
            id: '10',
            firstname: 'Julien',
            lastname: 'Perrin',
            email: 'julien.perrin@email.com',
            birthdate: new Date('1996-06-18'),
        },
        {
            id: '11',
            firstname: 'Karine',
            lastname: 'Renaud',
            email: 'karine.renaud@email.com',
            birthdate: new Date('1994-12-27'),
        },
        {
            id: '12',
            firstname: 'Laurent',
            lastname: 'Marchand',
            email: 'laurent.marchand@email.com',
            birthdate: new Date('1986-09-15'),
        },
        {
            id: '13',
            firstname: 'Marie',
            lastname: 'Lemoine',
            email: 'marie.lemoine@email.com',
            birthdate: new Date('1990-01-07'),
        },
        {
            id: '14',
            firstname: 'Nicolas',
            lastname: 'Renard',
            email: 'nicolas.renard@email.com',
            birthdate: new Date('1985-04-29'),
        },
        {
            id: '15',
            firstname: 'Ophélie',
            lastname: 'Roy',
            email: 'ophelie.roy@email.com',
            birthdate: new Date('1992-10-10'),
        },
        {
            id: '16',
            firstname: 'Pierre',
            lastname: 'Fabre',
            email: 'pierre.fabre@email.com',
            birthdate: new Date('1988-07-02'),
        },
        {
            id: '17',
            firstname: 'Quentin',
            lastname: 'Barbier',
            email: 'quentin.barbier@email.com',
            birthdate: new Date('1991-11-17'),
        },
        {
            id: '18',
            firstname: 'Romain',
            lastname: 'Muller',
            email: 'romain.muller@email.com',
            birthdate: new Date('1993-03-05'),
        },
        {
            id: '19',
            firstname: 'Sophie',
            lastname: 'Lemoine',
            email: 'sophie.lemoine@email.com',
            birthdate: new Date('1989-08-23'),
        },
        {
            id: '20',
            firstname: 'Thomas',
            lastname: 'Guillot',
            email: 'thomas.guillot@email.com',
            birthdate: new Date('1995-05-30'),
        },
    ];

    getUsers(): Promise<TableUser[]> {
        const formatedUser = this.users.map((user, index) => ({ ...user, id: index, technicalId: user.id }));
        return Promise.resolve(formatedUser);
    }
    createUser(userToBeCreated: UserBase): Promise<RegisteredUser> {
        const newUser: RegisteredUser = {
            id: (this.users.length + 1).toString(),
            ...userToBeCreated
        }
        this.users.push(newUser)
        return Promise.resolve(newUser)
    }
    deleteUser(id: string): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === id)
        if (userIndex !== -1) {
            this.users = [
                ...this.users.slice(0, userIndex),
                ...this.users.slice(userIndex + 1),
            ];
            console.log(`User with ID ${id} has been deleted.`);
        } else {
            throw new Error(`User with ID ${id} not found.`);
        }
        return Promise.resolve()
    }
    updateUser(userToBeUpdated: RegisteredUser): Promise<RegisteredUser> {
        const userIndex = this.users.findIndex(user => user.id === userToBeUpdated.id);
        if (userIndex === -1) {
            return Promise.reject(new Error(`User with ID ${userToBeUpdated.id} not found.`));
        }

        this.users[userIndex] = userToBeUpdated;
        return Promise.resolve(this.users[userIndex]);
    }

}