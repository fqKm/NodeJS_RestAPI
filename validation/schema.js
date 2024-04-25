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

const updateUserSchema = joi.object({
        username : joi.string(),
        postalCode : joi.number(),
        address : joi.object({
            street : joi.string(),
            city : joi.string(),
            country : joi.string(),
        }).min(1)
})

module.exports = {userSchema, sudoUserSchema, updateUserSchema}