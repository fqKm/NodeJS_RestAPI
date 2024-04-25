const express = require('express');
const app = express();
const {insert, fetch, rootFetch, deletion,update} = require('./db/db.js')
const {userSchema, updateUserSchema} = require('./validation/schema.js');
const validate = require('./validation/validation.js');
require('dotenv').config
app.use(express.json());


app.get('/', (req, res)=>{
    fetch(res);
});

app.post('/', (req,res)=>{
    const result = validate(userSchema, req.body)
    insert(result)
    res.send(result)
})

app.get('/find', (req, res)=>{
   const username = `${req.query.username}`
    rootFetch(username,res)
    console.log(username)
})

app.delete('/delete',(req,res)=>{
    const username = `${req.query.username}`
    deletion(username)
    res.status(200)
})

app.put('/update', (req,res)=>{
    const username = `${req.query.username}`
    const data = validate(updateUserSchema,req.body);
    update(username,data);
    const get = rootFetch(username,res)
})
app.listen(process.env.PORT, ()=>{
    console.log(`listen at port ${process.env.PORT}`)
})

