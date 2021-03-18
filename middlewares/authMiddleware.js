const { Users, Rooms } = require('../models')
const { verifyToken } = require('../helpers/jwtHelper.js')

const authenticate = (request, response, next) => {
    if (request.headers.access_token) {
        let userData = verifyToken(request.headers.access_token)
        if (userData.id && userData.username) {
            Users.findOne({
                where: {
                    id: userData.id,
                    username: userData.username
                }
            })   
            .then(data => {
                request.userData = userData
                next()
            })
            .catch(err => {
                next(err)
            })
        }else{
            next({code:400, msg: 'Invalid Token'})
        }
    }else{
        next({code:400, msg: 'Invalid Token'})
    }
}


module.exports = {authenticate}
