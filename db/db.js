const mysql = require('mysql')
require('dotenv').config()
const response = require('../utils/payload')

const connect = mysql.createConnection({
    host : process.env.DB_IP,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});

const insertCallback = () =>{
    console.log('data berhasil diinputkan');
}

const fetch = (res) => {
    const query = `SELECT * FROM usertable`
    datas = connect.query(query,(err, result)=> {
            if (err){
                console.error("Error Internal" + err.sqlMessage)
                res.status(500).send('Internal Server Error')
            }
            response(200,"Berhasil Load Data dari Database", result, res)})
}

const rootFetch = (username,res) => {
    const query = `SELECT * FROM usertable WHERE username = '${username}' `
    datas = connect.query(query,(err, result)=> {
            if (err){
                console.error("Error Internal" + err.sqlMessage)
                res.status(500).send('Internal Server Error')
            }
            response(200,"Berhasil Load Data dari Database", result, res)})
}

const insert = (data) =>{
    const query = `INSERT INTO usertable (username, postalCode, street, city, country) VALUES (?, ?, ?, ?, ?)`;
    const values = [`${data.username}`, data.postalCode, `${data.address.street}`, `${data.address.city}`, `${data.address.country}` ];
    connect.query(query,values,insertCallback);
}

const deletion = (username) =>{
    const query = `DELETE FROM usertable WHERE username = '${username}'`;
    connect.query(query,()=>{
        console.log(`Data dari ${username} berhasil dihapus`);
    })
}

module.exports = {insert, fetch, rootFetch, deletion};