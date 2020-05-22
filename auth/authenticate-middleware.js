const jwt = require('jsonwebtoken')
const configVars = require('../config/vars')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(token){
    const secret = configVars.jwtSecret

    jwt.verify(token, secret, (err, decodedPayload) => {
      if(err){
        res.status(401).json({
          message: "Invalid credentials."
        })
      }else{
        next()
      }
    })
  }else{
    res.status(401).json({ you: 'shall not pass!' });
  }
};
