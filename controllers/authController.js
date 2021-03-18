const { Users } = require('../models')
const {  verify, randomize } = require('../helpers/passwordHelper.js')
const { sign } = require('../helpers/jwtHelper.js')

class authController {
    static index(request, response, next) {
        let registerData = {
            username: request.body.username,
            password: request.body.password
        }
        Users.create(registerData)
            .then (data => {
                let userdata = {
                    id: data.id,
                    username: data.username
                }
                response.status(201).json({success: true, message: "user created", Data: userdata})
            })
            .catch (err => {
                console.log(err)
                next(err)
            })
    }
    static login(request, response, next) {
        let formData = {
            username: request.body.username,
            password: request.body.password
        }
        Users.findOne({
            where: {
                username: formData.username
            }
        })
            .then(data => {
                if (data) {
                    if (verify(formData.password, data.password)){
                        let returnData = {
                            id: data.id,
                            name: data.name
                        }
                        returnData.access_token = sign(returnData)
                        response.status(200).json({success:true,data: returnData})
                    }else{
                        next({code: 400, msg: 'Username or Password is wrong'})
                    }
                }else{
                    next({code: 400, msg: 'Username or Password is wrong'})
                }
            })
    }
}

module.exports = authController