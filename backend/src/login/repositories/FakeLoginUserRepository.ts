import UnauthorizedError from "../../errors/UnauthorizedError";
import { ILoginUserRepository, LoginUser } from "./ILoginUserRepository";
import bcrypt from 'bcrypt';
class FakeLoginUserRepository implements ILoginUserRepository {

    private readonly users: LoginUser[] = [
        {
            username: 'admin',
            password: bcrypt.hashSync('admin', 10),
        },
        {
            username: 'user',
            password: bcrypt.hashSync('user', 10),
        },
    ];

    isAllowed(user: LoginUser): Promise<boolean> {
        const foundUser = this.users.find(u => u.username === user.username);
        if (!foundUser) {
            throw new UnauthorizedError(`User with username ${user.username} not found`);
        }
        if (!bcrypt.compareSync(user.password, foundUser.password)) {
            throw new UnauthorizedError(`Invalid credentials`);
        }
        return Promise.resolve(true);
    }
}

export default FakeLoginUserRepository;