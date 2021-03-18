const jwt = require('jsonwebtoken')

const sign = (data)  => {
    return jwt.sign(data, process.env.JWT_SECRET)
}
const verifyToken = (data)  => {
    return jwt.verify(data, process.env.JWT_SECRET)
}

module.exports = {sign, verifyToken}