const { body ,validationResult } = require('express-validator');

exports.ValidatorRegister = [
    body('email', "bad email format").isEmail(),
    body('password', "your password must containt at least 8 characters ").isLength({min : 8})

]

exports.Validation =(req,res,next)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }

    next()

}