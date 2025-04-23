import knex, { Knex } from 'knex';
import knexConfig from '../../../knexfile';
import { IUserRepository, NewUser, User } from "./IUserRepository";
import NotFoundError from '../../errors/NotFoundError';


class KnexRepository implements IUserRepository {
    private readonly db: Knex;
    private readonly TABLE_NAME: string = 'users';

    constructor() {
        this.db = knex(knexConfig['development']);
    }
    async addUser(user: NewUser): Promise<User> {
        const [newRecord] = await this.db(this.TABLE_NAME).insert(user).returning('*');
        return newRecord;
    }
    async updateUser(user: User): Promise<User> {

        const now = new Date();
        const updated_at = now.toISOString();
        const [updatedRecord] = await this.db(this.TABLE_NAME).where({ id: user.id }).update({ ...user, updated_at }).returning('*');

        if (!updatedRecord) {
            throw new NotFoundError(`User with id ${user.id} not found`);
        }
        return updatedRecord;
    }
    async deleteUser(id: string): Promise<void> {
        const result = await this.db(this.TABLE_NAME).where({ id }).del();
        if (result === 0) {
            throw new NotFoundError(`User with id ${id} not found`);
        }
    }

    async getAllUsers() {
        return await this.db(this.TABLE_NAME).select('*');
    }

}

export default KnexRepository;
