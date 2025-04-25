import NotFoundError from "../../errors/NotFoundError";
import { ILoginUserRepository, LoginUser } from "./ILoginUserRepository";

class FakeLoginUserRepository implements ILoginUserRepository {

    private readonly users: LoginUser[] = [
        {
            username: 'admin',
            password: 'admin',
        },
        {
            username: 'user',
            password: 'user',
        },
    ];

    isAllowed(user: LoginUser): Promise<boolean> {
        const foundUser = this.users.find(u => u.username === user.username && u.password === user.password);
        if (!foundUser) {
            throw new NotFoundError(`User with username ${user.username} not found`);
        }
        return Promise.resolve(true);
    }
}

export default FakeLoginUserRepository;