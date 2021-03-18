const {Rooms, Users} = require('../models')
const {Op, json} = require('sequelize')

class roomController {
    static matchmake(request, response, next){
        let roomId
        Rooms.findOne({
            where: {
                [Op.or] : [
                    {
                        UserIdA : null
                    },
                    {
                        UserIdB : null
                    },
                    {
                        UserIdA : request.userData.id
                    },
                    {
                        UserIdB : request.userData.id
                    }
                ]
            },
            defaults : {
                status: 1,
                UserIdA : request.userData.id
            }
        })
            .then(data => {
                if (data.UserIdA === request.userData.id || data.UserIdB === request.userData.id) {
                    response.status(200).json(data)
                }else{
                    if (data.UserIdA) {
                        roomId = data.id
                        return Rooms.update({
                            UserIdB : request.userData.id
                        },{
                            where:{
                                id: data.id
                            }
                        })
                    }else{
                        return Rooms.update({
                            UserIdA : request.userData.id
                        },{
                            where:{
                                id: data.id
                            }
                        })
                    }
                }
            })
            .then(data => {
                return Rooms.findOne({
                    where: {
                        id: roomId
                    }
                })
            })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static destroyRoom(request, response, next) {
        Rooms.destroy({
            where: {
                id: request.params.id,
                [Op.or] : [
                    {
                        UserIdA: request.userData.id
                    },
                    {
                        UserIdB: request.userData.id
                    }
                ]
            }
        })
            .then(data => {
                response.status(200).json({msg: 'room successfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = roomController