import { ILoginUserRepository, LoginUser } from "./repositories/ILoginUserRepository";

export default class LoginService {
    private readonly loginUserRepository: ILoginUserRepository;

    constructor(loginUserRepository: ILoginUserRepository) {
        this.loginUserRepository = loginUserRepository;
    }

    public isAllowed(user: LoginUser): Promise<boolean> {
        return this.loginUserRepository.isAllowed(user);
    }
}