// const userSchema = require('./schema.js')
const joi = require('joi')


const validate = (schema, req) =>{
    const result = schema.validate(req,{
        abortEarly: false,
        allowUnknown: false
    })
    if(result.error){
        return console.error(result.error.details.map(detail => detail.message));
    } else{
        return result.value;
    }
}
module.exports = validate;