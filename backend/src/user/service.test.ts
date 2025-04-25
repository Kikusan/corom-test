import UserService from "./service";
import FakeUserRepository from "./repositories/FakeUserRepository";
import { IUserRepository, User } from "./repositories/IUserRepository";
import { pinoLogger } from "../logger/pinoLogger";

describe('User service', () => {
    let userRepository: IUserRepository;
    let service: UserService;

    beforeEach(() => {
        userRepository = new FakeUserRepository(pinoLogger)
        service = new UserService(userRepository, pinoLogger);
    });
    describe('getUsers', () => {
        it('should return all users', async () => {
            const expectedUsers: User[] = [
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
            ]

            const users = await service.getUsers();
            expect(users).toEqual(expectedUsers);
        });
    });

    describe('addUser', () => {
        it('should add a user', async () => {
            const newUser = {
                firstname: 'Robert',
                lastname: 'Robichet',
                email: 'RRobichet@gardien-de-la-paix.com',
                birthdate: '1990-01-01',
            };
            const addedUser = await service.addUser(newUser);
            expect(addedUser).toEqual({
                id: '3',
                firstname: 'Robert',
                lastname: 'Robichet',
                email: 'RRobichet@gardien-de-la-paix.com',
                birthdate: '1990-01-01',
            });
        });

    });

    describe('updateUser', () => {
        it('should update a user', async () => {

            const userToBeUpdated = {
                id: '11111111-1111-1111-1111-111111111111',
                firstname: 'Johnny',
                lastname: 'Doowap',
                email: 'John.Doe@unknown.com',
                birthdate: '1980-01-01',
            };

            const updatedUser = await service.updateUser(userToBeUpdated);
            expect(updatedUser).toEqual(userToBeUpdated);
        });

        it('should throw an error if user not found', async () => {
            const userToBeUpdated = {
                id: '100',
                firstname: 'Johnny',
                lastname: 'Doowap',
                email: '',
                birthdate: '1980-01-01',
            };
            try {
                await service.updateUser(userToBeUpdated);
            }
            catch (error) {
                expect(error).toEqual(new Error('User with id 100 not found'));
                return;
            }
            expect(true).toBe(false);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            await service.deleteUser('11111111-1111-1111-1111-111111111111');
            const users = await service.getUsers();
            expect(users).toEqual([
                {
                    id: '22222222-2222-2222-2222-222222222222',
                    firstname: 'Jane',
                    lastname: 'Doe',
                    email: 'Jane.Doe@unknown.com',
                    birthdate: '1990-01-01',
                }]);
        });

        it('should throw an error if user not found', async () => {
            try {
                await service.deleteUser('100');
            }
            catch (error) {
                expect(error).toEqual(new Error('User with id 100 not found'));
                return;
            }
            expect(true).toBe(false);
        });
    });
});