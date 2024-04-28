const express = require('express');
const app = express();
const {insert, fetch, rootFetch, deletion,update} = require('./db/db.js')
const {userSchema, updateUserSchema} = require('./validation/schema.js');
const validate = require('./validation/validation.js');
require('dotenv').config
app.use(express.json());


app.get('/all/:limit?/:offset?', (req, res)=>{
    const offset = req.params.offset || 0;
    const limit = req.params.limit || 10;
    fetch(res,limit,offset)
});

app.post('/', (req,res)=>{
    const result = validate(userSchema, req.body, res)
    insert(result)
    res.send(result)
})

app.get('/find/:username?', (req, res)=>{
    const username = req.params.username
    rootFetch(username,res)
    console.log(username)
})

app.delete('/delete/:username',(req,res)=>{
    const username = req.params.username
    deletion(username)
    res.status(200)
})

app.put('/update/:username', (req,res)=>{
    const username = req.params.username
    const data = validate(updateUserSchema,req.body,res);
    update(username,data);
    const get = rootFetch(username,res)
})
app.listen(process.env.PORT, ()=>{
    console.log(`listen at port ${process.env.PORT}`)
})

