import ApiError from "../../../utils/errors/ApiError";
import { LoginService } from "./LoginService";

describe("LoginService", () => {
    const loginService = new LoginService();
    describe("Happy case", () => {
        let result: string;
        beforeEach(async () => {
            vi.spyOn(globalThis, "fetch").mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue({ token: 'token' }),
            } as unknown as Response);
            result = await loginService.login('user', 'pass');
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("should call the correct url with the correct params", async () => {
            expect(globalThis.fetch).toHaveBeenCalledWith(
                "http://localhost:4000/auth/login",
                {
                    method: 'POST',
                    body: '{"username":"user","password":"pass"}',
                    headers: {
                        Authorization: "",
                        'Content-Type': 'application/json',
                    },
                });
        });

        it("should return the token", async () => {
            expect(result).toBe('token')
        });
    });

    describe("KO case", () => {
        beforeEach(async () => {
            vi.spyOn(globalThis, "fetch").mockResolvedValue({
                ok: false,
                status: 500,
                json: vi.fn().mockResolvedValue({ message: 'failed' }),
            } as unknown as Response);
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("should throw an error", async () => {
            try {
                await loginService.login('user', 'pass');
            } catch (err) {
                expect(err).toEqual(new ApiError(500, 'failed'))
                return
            }
            expect(true).toBeFalsy()
        });
    });
});