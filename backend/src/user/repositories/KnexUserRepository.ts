import knex, { Knex } from 'knex';
import knexConfig from '../../../knexfile';
import { IUserRepository, NewUser, User } from "./IUserRepository";
import { NotFoundError } from '../../errors';
import { ILogger } from '../../logger/ILogger';


class KnexRepository implements IUserRepository {
    private readonly db: Knex;
    private readonly logger: ILogger;
    private readonly LOG_PREFIX = 'FakeUserRepository';
    private readonly TABLE_NAME: string = 'users';
    private readonly defaultSearch: Search = {
        page: 1,
        pageSize: 10
    }

    constructor(logger: ILogger) {
        this.db = knex(knexConfig['development']);
        this.logger = logger;
    }
    async getByEmail(email: string): Promise<User | undefined> {
        const user = await this.db(this.TABLE_NAME).select('*').where({ email });
        if (user.length === 0)
            return undefined
        return user[0]
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
            this.logger.error(`${this.LOG_PREFIX}: User with id ${user.id} not found`)
            throw new NotFoundError(`User with id ${user.id} not found`);
        }
        return updatedRecord;
    }
    async deleteUser(id: string): Promise<void> {
        const result = await this.db(this.TABLE_NAME).where({ id }).del();
        if (result === 0) {
            this.logger.error(`${this.LOG_PREFIX}: User with id ${id} not found`)
            throw new NotFoundError(`User with id ${id} not found`);
        }
    }

    async getAllUsers() {
        return await this.db(this.TABLE_NAME).select('*');
    }

    async searchUsers(search: Search = this.defaultSearch) {
        const { page, pageSize } = search;
        const offset = (page - 1) * pageSize;

        return this.db(this.TABLE_NAME).select('*')
            .limit(pageSize)
            .offset(offset);
    }

    async getUsersCount(): Promise<number> {
        const result = await this.db(this.TABLE_NAME).count();
        return Number(result[0].count);
    }

}

type Search = {
    page: number,
    pageSize: number
}

export default KnexRepository;
