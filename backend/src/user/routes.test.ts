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

            const res = await supertest(app.server).put('/user/1').send(newUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(newUser)
        });

        it('should return status code 404 if user does not exist', async () => {
            const token = await authenticate(app);
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/404').send(newUser).set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
        });

        it('should return an error with the code 401', async () => {
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/1').send(newUser)
            expect(res.status).toBe(401)
        });
    });

    describe('DELETE /user/:id', () => {
        it('should delete a user', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).delete('/user/1').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(204)
        });

        it('should return status code 404 if user does not exist', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).delete('/user/404').set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(404)
        });

        it('should return an error with the code 401', async () => {
            const res = await supertest(app.server).delete('/user/1')
            expect(res.status).toBe(401)
        })
    })
})
