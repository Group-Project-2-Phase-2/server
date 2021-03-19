const errHandler = (err, request, response, next) => {
    console.log(err);
    if (err.name) {
        if (err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"  || err.name == "SequelizeDatabaseError") {
            let errors = []
            // console.log(err)
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            // console.log(errors)
            response.status(400).json({errors})
        }else if(err.length > 0){
            response.status(400).json({errors: [err.errors[0].message]})
        }else{
            // console.log(err.name,'<=== name')
            // console.log(err,'500')
            response.status(500).json({errors: [err]})
        }
    }else{
        if (err.msg) {
            response.status(err.code).json({errors: [err.msg]})
        }else{
        }
    }
}
module.exports = errHandler