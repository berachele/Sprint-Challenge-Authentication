const bcrypt = require('bcryptjs')
const router = require('express').Router();
const Users = require('./auth-model')
const generateToken = require('./generateToken')

router.post('/register', (req, res) => {
  const creds = req.body

  if(isValid(creds)){
    const ROUNDS = process.nextTick.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(creds.password, ROUNDS)
    creds.password = hash

    Users.add(creds)
    .then(user => {
      res.status(201).json({
        data: user
      })
    })
    .catch(err => {
      console.log({err})
      res.status(500).json({
        message: err.message
      })
    })
  }else{
    res.status(400).json({
      message: "Please provide the username and password. Password must be alphanumeric."
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  if(isValid(req.body)){
    Users.findBy({username: username})
    .then(([user]) => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome, ${user.username}`,
          token
        })
      }else{
        res.status(401).json({
          message: "Invalid username or password."
        })
      }
    })
    .catch(err => {
      console.log({err})
      res.status(500).json({
        message: err.message
      })
    })
  }else{
    res.status(400).json({
      message: "Please provide the username and password. Password must be alphanumeric."
    })
  }
});


//other Middleware
function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string")
}


module.exports = router;
