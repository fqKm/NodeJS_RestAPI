// const userSchema = require('./schema.js')
const joi = require('joi')


const validate = (schema, req, res) =>{
    const result = schema.validate(req,{
        abortEarly: false,
        allowUnknown: false
    })
    if(result.error){
        console.error(result.error.details.map(detail => detail.message));
        return res.sendStatus(400)
    } else{
        return result.value;
    }
}
module.exports = validate;