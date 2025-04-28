import BadRequestError from "../../../utils/errors/BadRequestError";
import NotFoundError from "../../../utils/errors/NotFoundError";
import UnexpectedError from "../../../utils/errors/UnexpectedError";
import { RegisteredUser, TableUser, UserBase } from "./User";
import { UserService } from "./UserService";

describe("UserService", () => {
    const userService = new UserService();
    const userMock = [{
        id: '1',
        firstname: 'Alice',
        lastname: 'Dupont',
        email: 'alice.dupont@email.com',
        birthdate: '1990-04-15'
    },
    {
        id: '2',
        firstname: 'Bob',
        lastname: 'Martin',
        email: 'bob.martin@email.com',
        birthdate: '1985-11-23',
    },]
    describe("getUsers", () => {
        describe("happy case", () => {
            let result: TableUser[];
            beforeEach(async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: true,
                    status: 200,
                    json: vi.fn().mockResolvedValue(userMock),
                } as unknown as Response);
                result = await userService.getUsers();
            });

            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should call the correct url with the correct params", async () => {
                expect(globalThis.fetch).toHaveBeenCalledWith(
                    "http://localhost:4000/user",
                    {
                        headers: {
                            Authorization: "",
                        },
                    });
            });
            it("should return a list of TableUsers", async () => {
                const expectFResult = [{
                    id: 0,
                    technicalId: '1',
                    firstname: 'Alice',
                    lastname: 'Dupont',
                    email: 'alice.dupont@email.com',
                    birthdate: new Date('1990-04-15'),
                },
                {
                    id: 1,
                    technicalId: '2',
                    firstname: 'Bob',
                    lastname: 'Martin',
                    email: 'bob.martin@email.com',
                    birthdate: new Date('1985-11-23'),
                },]
                expect(result).toEqual(expectFResult)
            });
        });

        describe("edge cases", () => {
            beforeEach(async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 500,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);

            });

            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should throw an expected error", async () => {
                try {
                    await userService.getUsers();
                } catch (err) {
                    expect(err).toEqual(new UnexpectedError())
                    return
                }
                expect(true).toBeFalsy()
            });
        });
    });

    describe("deleteUser", () => {
        describe("happy case", () => {
            beforeEach(async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: true,
                    status: 204,

                } as unknown as Response);
                await userService.deleteUser('404');
            });

            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should call the correct url with the correct params", async () => {
                expect(globalThis.fetch).toHaveBeenCalledWith(
                    "http://localhost:4000/user/404",
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: "",
                        },
                    });
            });
        });

        describe("edge cases", () => {
            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should throw an expected error", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 500,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                try {
                    await userService.deleteUser('404');
                } catch (err) {
                    expect(err).toEqual(new UnexpectedError())
                    return
                }
                expect(true).toBeFalsy()
            });

            it("should throw a not found error if the user is not found", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 404,
                    json: vi.fn().mockResolvedValue({
                        statusCode: 404,
                        error: 'Not Found',
                        message: 'User with id 3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65 not found'
                    }),
                } as unknown as Response);
                try {
                    await userService.deleteUser('404');
                } catch (err) {
                    expect(err).toEqual(new NotFoundError('User with id 3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65 not found'))
                    return
                }
                expect(true).toBeFalsy()
            });
        });
    });

    describe("createUser", () => {
        const userToBeCreated: UserBase = {
            firstname: 'toto',
            lastname: 'tata',
            email: 'toto@tata.com',
            birthdate: new Date('1990-09-23')

        }
        describe("happy case", () => {
            beforeEach(async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: true,
                    status: 200,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                await userService.createUser(userToBeCreated);
            });

            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should call the correct url with the correct params", async () => {
                expect(globalThis.fetch).toHaveBeenCalledWith(
                    "http://localhost:4000/user",
                    {
                        method: 'POST',
                        body: '{"firstname":"toto","lastname":"tata","email":"toto@tata.com","birthdate":"1990-09-23"}',
                        headers: {
                            Authorization: "",
                            'Content-Type': 'application/json',
                        },
                    });
            });
        });

        describe("edge cases", () => {
            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should throw an expected error when status code is 500", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 500,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                try {
                    await userService.createUser(userToBeCreated);
                } catch (err) {
                    expect(err).toEqual(new UnexpectedError())
                    return
                }
                expect(true).toBeFalsy()
            });

            it("should throw an bad request error when status code is 400", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 400,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                try {
                    await userService.createUser(userToBeCreated);
                } catch (err) {
                    expect(err).toEqual(new BadRequestError())
                    return
                }
                expect(true).toBeFalsy()
            });
        });
    });
    describe("updateUser", () => {
        const userToBeCreated: RegisteredUser = {
            id: '3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65',
            firstname: 'toto',
            lastname: 'tata',
            email: 'toto@tata.com',
            birthdate: new Date('1990-09-23')

        }
        describe("happy case", () => {
            beforeEach(async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: true,
                    status: 200,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                await userService.updateUser(userToBeCreated);
            });

            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should call the correct url with the correct params", async () => {
                expect(globalThis.fetch).toHaveBeenCalledWith(
                    "http://localhost:4000/user/3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65",
                    {
                        method: 'PUT',
                        body: '{"id":"3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65","firstname":"toto","lastname":"tata","email":"toto@tata.com","birthdate":"1990-09-23"}',
                        headers: {
                            Authorization: "",
                            'Content-Type': 'application/json',
                        },
                    });
            });
        });

        describe("edge cases", () => {
            afterEach(() => {
                vi.restoreAllMocks();
            });
            it("should throw an expected error when status is 500", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 500,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                try {
                    await userService.updateUser(userToBeCreated);
                } catch (err) {
                    expect(err).toEqual(new UnexpectedError())
                    return
                }
                expect(true).toBeFalsy()
            });

            it("should throw an bad request error when status is 400", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 400,
                    json: vi.fn().mockResolvedValue({}),
                } as unknown as Response);
                try {
                    await userService.updateUser(userToBeCreated);
                } catch (err) {
                    expect(err).toEqual(new BadRequestError())
                    return
                }
                expect(true).toBeFalsy()
            });

            it("sshould throw a not found error if the user is not found", async () => {
                vi.spyOn(globalThis, "fetch").mockResolvedValue({
                    ok: false,
                    status: 404,
                    json: vi.fn().mockResolvedValue({
                        statusCode: 404,
                        error: 'Not Found',
                        message: 'User with id 3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65 not found'
                    }),
                } as unknown as Response);
                try {
                    await userService.updateUser(userToBeCreated);
                } catch (err) {
                    expect(err).toEqual(new NotFoundError('User with id 3f32c7ea-8e0e-4b8b-b82c-3e5e2f2e6a65 not found'))
                    return
                }
                expect(true).toBeFalsy()
            });
        });
    });
});