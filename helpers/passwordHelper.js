const bcrypt = require('bcrypt')

const hash = password => {
    return bcrypt.hashSync(password, 8)
}

const verify = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

module.exports = { hash, verify }