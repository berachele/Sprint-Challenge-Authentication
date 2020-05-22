const db = require('../database/dbConfig')

module.exports = {
    add,
    findById,
    findBy,
}

function add(user) {
    return db("users").insert(user)
    .then(show => {
        return findById(show[0])
    })
}

function findById(id) {
    return db("users").where({id}).first()
}

function findById(filter) {
    return db("users").where({filter})
}