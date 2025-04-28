import supertest from 'supertest';
import { createApp } from '../app';
import { FastifyInstance } from 'fastify';

describe('User routes', () => {
    let app: ReturnType<typeof createApp>;

    async function authenticate(app: FastifyInstance) {
        const loginRes = await supertest(app.server)
            .post('/auth/login')
            .send({ username: 'admin', password: 'admin' });

        const token = loginRes.body.token;
        return token;
    }

    beforeEach(async () => {
        app = createApp(true);
        await app.ready();
    });

    afterEach(async () => {
        await app.close();
    });


    describe('GET /user', () => {
        it('should return an list of users', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).get('/user').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        });

        it('should return an error with the code 401', async () => {
            const res = await supertest(app.server).get('/user')
            expect(res.status).toBe(401)
        });
    })

    describe('GET /user/search', () => {
        it('should return an list of users', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).get('/user/search?page=1&pageSize=5').set('Authorization', `Bearer ${token}`)
            const expectedBody = {
                users: [
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
                    },
                    {
                        id: '33333333-3333-3333-3333-333333333333',
                        firstname: 'Michael',
                        lastname: 'Smith',
                        email: 'Michael.Smith@unknown.com',
                        birthdate: '1985-05-15',
                    },
                    {
                        id: '44444444-4444-4444-4444-444444444444',
                        firstname: 'Sarah',
                        lastname: 'Johnson',
                        email: 'Sarah.Johnson@unknown.com',
                        birthdate: '1987-07-21',
                    },
                    {
                        id: '55555555-5555-5555-5555-555555555555',
                        firstname: 'David',
                        lastname: 'Williams',
                        email: 'David.Williams@unknown.com',
                        birthdate: '1992-11-30',
                    }
                ],
                totalUsers: 19,
                totalPages: 4
            }
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expectedBody)
        });

        it('should return an error with the code 401', async () => {
            const res = await supertest(app.server).get('/user/search?page=1&pageSize=5')
            expect(res.status).toBe(401)
        });
    })

    describe('POST /user', () => {
        it('should create a user', async () => {
            const token = await authenticate(app);
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).post('/user').send(newUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(201)
            expect(res.body).toMatchObject(newUser)
        });

        it('should return an error with the code 400 if email is already used', async () => {
            const token = await authenticate(app);
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'Jane.Doe@unknown.com',
                birthdate: '1992-05-10',
            }

            const expectedBody = {
                error: 'Bad request',
                message: 'User with email Jane.Doe@unknown.com already exists',
                statusCode: 400,
            }

            const res = await supertest(app.server).post('/user').send(newUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(400)
            expect(res.body).toMatchObject(expectedBody)
        });

        it('should return an error with the code 401', async () => {
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).post('/user').send(newUser)
            expect(res.status).toBe(401)
        });

        it('should return an error with the code 400', async () => {
            const newUser = {
                prenom: 'Alice',
                nom: 'Smith',
                email: 'alice sans mail',
                birthdate: 'inconnu',
            }

            const expectedBody = {
                error: "Bad Request",
                message: "body must have required property 'firstname', body must have required property 'lastname', body/email must match format \"email\", body/birthdate must match format \"date\"",
                statusCode: 400
            }

            const res = await supertest(app.server).post('/user').send(newUser)
            expect(res.status).toBe(400)
            expect(res.body).toEqual(expectedBody)
        });
    })

    describe('PUT /user/:id', () => {
        it('should update a user', async () => {
            const token = await authenticate(app);
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/11111111-1111-1111-1111-111111111111').send(newUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body).toEqual({ id: "11111111-1111-1111-1111-111111111111", ...newUser })
        });

        it('should return an error with the code 400 if email is already used', async () => {
            const token = await authenticate(app);
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'Jane.Doe@unknown.com',
                birthdate: '1992-05-10',
            }

            const expectedBody = {
                error: 'Bad request',
                message: 'User with email Jane.Doe@unknown.com already exists',
                statusCode: 400,
            }

            const res = await supertest(app.server).post('/user').send(newUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(400)
            expect(res.body).toMatchObject(expectedBody)
        });

        it('should return status code 404 if user does not exist', async () => {
            const token = await authenticate(app);
            const updatedUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/40411111-1111-1111-1111-111111111111').send(updatedUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
        });

        it('should return an error with the code 401', async () => {
            const updatedUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/11111111-1111-1111-1111-111111111111').send(updatedUser)
            expect(res.status).toBe(401)
        });

        it('should return an error with the code 400 if id is not uuid type', async () => {
            const token = await authenticate(app);
            const updatedUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }
            const expectedBody = {
                error: "Bad Request",
                message: "params/id must match format \"uuid\"",
                statusCode: 400
            }
            const res = await supertest(app.server).put('/user/not-uuid').send(updatedUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(400)
            expect(res.body).toEqual(expectedBody)
        })

        it('should return an error with the code 400', async () => {
            const token = await authenticate(app);
            const updatedUser = {
                prenom: 'Alice',
                nom: 'Smith',
                email: 'alice sans mail',
                birthdate: 'inconnu',
            }

            const expectedBody = {
                error: "Bad Request",
                message: "body must have required property 'firstname', body must have required property 'lastname', body/email must match format \"email\", body/birthdate must match format \"date\"",
                statusCode: 400
            }

            const res = await supertest(app.server).put('/user/11111111-1111-1111-1111-111111111111').send(updatedUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(400)
            expect(res.body).toEqual(expectedBody)
        });
    });

    describe('DELETE /user/:id', () => {
        it('should delete a user', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).delete('/user/11111111-1111-1111-1111-111111111111').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(204)
        });

        it('should return status code 404 if user does not exist', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).delete('/user/40411111-1111-1111-1111-111111111404').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
        });

        it('should return an error with the code 401', async () => {
            const res = await supertest(app.server).delete('/user/11111111-1111-1111-1111-111111111111')
            expect(res.status).toBe(401)
        })

        it('should return an error with the code 400 if id is not uuid type', async () => {
            const token = await authenticate(app);
            const expectedBody = {
                error: "Bad Request",
                message: "params/id must match format \"uuid\"",
                statusCode: 400
            }
            const res = await supertest(app.server).delete('/user/not-uuid').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(400)
            expect(res.body).toEqual(expectedBody)
        })
    })
})
