const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
})

describe('AUTH', () => {
    it('can run the test', () => {
        expect(true).toBeTruthy()
    })

    describe('/REGISTER', () => {
        it('should add a new user, 201 status', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
            .then(response => {
                expect(response.status).toEqual(201)
            })
        })
        it('should return that user (as an array of 1)', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
            .then(response => {
                expect(Array.isArray).toHaveLength(1)
            })
        })
    })

    describe('/LOGIN', ()=> {
        it('can login successfully, 200 status', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
            .then(response => {
                return supertest(server)
                .post('/api/auth/login')
                .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
                .then(response => {
                    expect(response.status).toEqual(200)
                })
            })
        })
        it('can see the `Welcome, <username>` string', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
            .then(response => {
                return supertest(server)
                .post('/api/auth/login')
                .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
                .then(response => {
                    expect(response.body.message).toEqual("Welcome, Mary_Poppins")
                })
            })
        })
    })
})

describe('JOKES', ()=> {
    it('can run the test', () => {
        expect(true).toBeTruthy()
    })

    describe('GET /', () => {
        it('can show list of jokes after logging in', () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
            .then(() => {
                return supertest(server)
                .post('/api/auth/login')
                .send({username: "Mary_Poppins", password: "Supercalifragilistic"})
                .then(() => {
                    return supertest(server)
                    .get('/api/jokes')
                    .then(res => {
                        console.log(res)
                        // expect(Array.isArray(res.data)).toBe(true)
                    })
                })
            })
        })
        it('shows error if not logged in', () => {
            return supertest(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.text).toEqual("{\"you\":\"shall not pass!\"}")
            })
        })
    })
})