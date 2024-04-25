const express = require('express');
const app = express();
const {insert, fetch, rootFetch, deletion} = require('./db/db.js')
const {userSchema} = require('./validation/schema.js');
const validate = require('./validation/validation.js');

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
app.listen(3000, ()=>{
    console.log("run at port 3000")
})

