import knex, { Knex } from 'knex';
import knexConfig from '../../../knexfile';
import { IUserRepository, NewUser, User } from "./IUserRepository";
import { NotFoundError } from '../../errors';
import { ILogger } from '../../logger/ILogger';
import { Filter, Search, SortOrder } from '../service';


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
        const { page, pageSize, sort, filter } = search;
        const offset = (page - 1) * pageSize;
        const query = this.prepareQuery(sort, filter);
        if (sort) {
            const [field, direction] = sort.split(":") as [keyof User, "asc" | "desc"];
            query.orderBy(field, direction)
        }
        return query.limit(pageSize).offset(offset);
    }

    async getUsersCount(search: Search = this.defaultSearch): Promise<number> {
        const { sort, filter } = search;
        const query = this.prepareQuery(sort, filter);
        const result = await query;
        return result.length
    }


    private prepareQuery(sort: SortOrder | undefined, filter: Filter | undefined) {
        const query = this.db(this.TABLE_NAME).select('*').groupBy('id');
        if (sort) {
            const [field, direction] = sort.split(":") as [keyof User, "asc" | "desc"];
            query.orderBy(field, direction);
        }

        if (filter?.firstname) {
            query.where('firstname', 'ILIKE', `%${filter.firstname}%`);
        }
        if (filter?.lastname) {
            query.where('lastname', 'ILIKE', `%${filter.lastname}%`);
        }
        if (filter?.email) {
            query.where('email', 'ILIKE', `%${filter.email}%`);
        }
        return query;
    }
}

export default KnexRepository;
