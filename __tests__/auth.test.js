const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
    .then(()=>db.migrate.latest())
    // .then(()=>db.seed.run())
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
        it.todo('can login successfully, 200 status')
        it.todo('can see the `Welcome, <username>` string')
    })
})