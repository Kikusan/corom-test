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

    beforeAll(async () => {
        app = createApp(true);
        await app.ready();
    });

    afterAll(async () => {
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
