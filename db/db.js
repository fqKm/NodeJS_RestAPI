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
    const values = [`${data.username}`, `${data.postalCode}`, `${data.address.street}`, `${data.address.city}`, `${data.address.country}` ];
    connect.query(query,values,insertCallback);
}

const deletion = (username) =>{
    const query = `DELETE FROM usertable WHERE username = '${username}'`;
    connect.query(query,()=>{
        console.log(`Data dari ${username} berhasil dihapus`);
    })
}

const update = (username, data) => {
    let query = `UPDATE usertable SET `;
    const updateFields = [];

    if (data.username) {
        updateFields.push(`name = '${data.username}'`);
    }
    if (data.postalCode) {
        updateFields.push(`postalCode = '${data.postalCode}'`);
    }
    if (data.address) {
        if (data.address.street) {
            updateFields.push(`street = '${data.address.street}'`);
        }
        if (data.address.city) {
            updateFields.push(`city = '${data.address.city}'`);
        }
        if (data.address.country) {
            updateFields.push(`country = '${data.address.country}'`);
        }
    }

    query += updateFields.join(', ');
    query += ` WHERE username = '${username}'`;

    connect.query(query, (error, results) => {
        if (error) {
            console.error(`Error updating data for ${username}:`, error);
        } else {
            console.log(`Data for ${username} successfully updated`);
        }
    });
};

module.exports = {insert, fetch, rootFetch, deletion, update};