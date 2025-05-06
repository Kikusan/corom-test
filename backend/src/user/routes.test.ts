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
        it('should return an list of users with page data', async () => {
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

        it('should return an list of users with pagination param', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).get('/user/search?page=2&pageSize=7').set('Authorization', `Bearer ${token}`)
            const expectedBody = {
                users: [
                    {
                        id: '88888888-8888-8888-8888-888888888888',
                        firstname: 'Laura',
                        lastname: 'Miller',
                        email: 'Laura.Miller@unknown.com',
                        birthdate: '1995-06-25',
                    },
                    {
                        id: '99999999-9999-9999-9999-999999999999',
                        firstname: 'James',
                        lastname: 'Davis',
                        email: 'James.Davis@unknown.com',
                        birthdate: '1991-10-10',
                    },
                    {
                        id: '10101010-1010-1010-1010-101010101010',
                        firstname: 'Olivia',
                        lastname: 'Garcia',
                        email: 'Olivia.Garcia@unknown.com',
                        birthdate: '1989-04-04',
                    },
                    {
                        id: '12121212-1212-1212-1212-121212121212',
                        firstname: 'Christopher',
                        lastname: 'Rodriguez',
                        email: 'Christopher.Rodriguez@unknown.com',
                        birthdate: '1986-09-18',
                    },
                    {
                        id: '13131313-1313-1313-1313-131313131313',
                        firstname: 'Megan',
                        lastname: 'Martinez',
                        email: 'Megan.Martinez@unknown.com',
                        birthdate: '1994-08-08',
                    },
                    {
                        id: '14141414-1414-1414-1414-141414141414',
                        firstname: 'Matthew',
                        lastname: 'Hernandez',
                        email: 'Matthew.Hernandez@unknown.com',
                        birthdate: '1987-12-25',
                    },
                    {
                        id: '15151515-1515-1515-1515-151515151515',
                        firstname: 'Sophia',
                        lastname: 'Lopez',
                        email: 'Sophia.Lopez@unknown.com',
                        birthdate: '1992-02-22',
                    },
                ],
                totalUsers: 19,
                totalPages: 3
            }
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expectedBody)
        });

        it('should return an list of users ordered by firstname with page data', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).get('/user/search?page=1&pageSize=5&sort=firstname:asc').set('Authorization', `Bearer ${token}`)
            const expectedBody = {
                users: [
                    {
                        "id": "20202020-2020-2020-2020-202020202020",
                        "firstname": "Aiden",
                        "lastname": "Taylor",
                        "email": "Aiden.Taylor@unknown.com",
                        "birthdate": "1995-03-30"
                    },
                    {
                        "id": "19191919-1919-1919-1919-191919191919",
                        "firstname": "Chloe",
                        "lastname": "Thomas",
                        "email": "Chloe.Thomas@unknown.com",
                        "birthdate": "1991-09-17"
                    },
                    {
                        "id": "12121212-1212-1212-1212-121212121212",
                        "firstname": "Christopher",
                        "lastname": "Rodriguez",
                        "email": "Christopher.Rodriguez@unknown.com",
                        "birthdate": "1986-09-18"
                    },
                    {
                        "id": "77777777-7777-7777-7777-777777777777",
                        "firstname": "Daniel",
                        "lastname": "Jones",
                        "email": "Daniel.Jones@unknown.com",
                        "birthdate": "1988-03-28"
                    },
                    {
                        "id": "55555555-5555-5555-5555-555555555555",
                        "firstname": "David",
                        "lastname": "Williams",
                        "email": "David.Williams@unknown.com",
                        "birthdate": "1992-11-30"
                    }
                ],
                totalUsers: 19,
                totalPages: 4
            }
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expectedBody)
        });

        it('should return an list of users ordered by firstname with page data and with doe included in lastname', async () => {
            const token = await authenticate(app);
            const res = await supertest(app.server).get('/user/search?page=1&pageSize=5&sort=firstname:asc&lastname=doe').set('Authorization', `Bearer ${token}`)
            const expectedBody = {
                users: [
                    {
                        id: '22222222-2222-2222-2222-222222222222',
                        firstname: 'Jane',
                        lastname: 'Doe',
                        email: 'Jane.Doe@unknown.com',
                        birthdate: '1990-01-01',
                    },
                    {
                        id: '11111111-1111-1111-1111-111111111111',
                        firstname: 'John',
                        lastname: 'Doe',
                        email: 'John.Doe@unknown.com',
                        birthdate: '1990-01-01',
                    },
                ],
                totalUsers: 2,
                totalPages: 1
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
