import supertest from 'supertest';
import { createApp } from '../app';

describe('User routes', () => {
    let app: ReturnType<typeof createApp>;
    beforeEach(async () => {
        app = createApp(true); // Paramètre pour tester avec un repo fake
        await app.ready();
    });

    afterEach(async () => {
        await app.close(); // libère les ports, évite conflits entre tests
    });


    describe('GET /user', () => {
        it('should return an array', async () => {
            const res = await supertest(app.server).get('/user')
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('POST /user', () => {
        it('should create a user', async () => {
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).post('/user').send(newUser)
            expect(res.status).toBe(201)
            expect(res.body).toMatchObject(newUser)
        })
    })

    describe('PUT /user/:id', () => {
        it('should update a user', async () => {
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/1').send(newUser)
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(newUser)
        })

        it('should return status code 404 if user does not exist', async () => {
            const newUser = {
                firstname: 'Alice',
                lastname: 'Smith',
                email: 'alice@example.com',
                birthdate: '1992-05-10',
            }

            const res = await supertest(app.server).put('/user/404').send(newUser)
            expect(res.status).toBe(404)
        })
    })

    describe('DELETE /user/:id', () => {
        it('should delete a user', async () => {
            const res = await supertest(app.server).delete('/user/1')
            expect(res.status).toBe(204)
        })

        it('should return status code 404 if user does not exist', async () => {
            const res = await supertest(app.server).delete('/user/404')
            expect(res.status).toBe(404)
        })
    })
})
