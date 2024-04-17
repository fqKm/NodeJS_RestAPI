const joi = require('joi');

const userSchema = joi.object({
    username: joi.string().min(3).max(100).required(),
    postalCode: joi.number(),
    address: {
        street : joi.string(),
        city : joi.string(),
        country : joi.string().required()
    }
})


const sudoUserSchema = joi.object({
    username : joi.string().required().valid('admin'),
    Id : joi.string().required().regex(/^00\d{4}$/)
})
module.exports = {userSchema, sudoUserSchema}