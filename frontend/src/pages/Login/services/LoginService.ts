import { apiClient } from "../../../utils/apiClient";
import ILoginService from "./ILoginService";

export class LoginService implements ILoginService {
    async login(username: string, password: string): Promise<string> {
        const response = await apiClient('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })


        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.token;
    }

}