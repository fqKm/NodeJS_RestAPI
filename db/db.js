const mysql = require('mysql')
require('dotenv').config()
const NodeCache = require('node-cache')
const response = require('../utils/payload')
const cache = new NodeCache({stdTTL : 10})

const connect = mysql.createConnection({
    host : process.env.DB_IP,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
});


const fetchDataFromDatabase = (query, res) => {
    connect.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            response(200, 'Successfully loaded data from database', result, res);
            cache.set(query, result);
        }
    });
};
const fetch = (res,limit,offset) => {
    const query = `SELECT * FROM usertable LIMIT ${limit} OFFSET ${offset}`
    const cachedData = cache.get(query);
    if (cachedData) {
        console.log('Data loaded from cache');
        response(200, 'Successfully loaded data from cache', cachedData, res);
    } else {
        console.log('Fetching data from database');
        fetchDataFromDatabase(query, res);};};

const rootFetch = (username,res) => {
    const query = `SELECT * FROM usertable WHERE username = '${username}' `
    const cachedData = cache.get(query);
    if (cachedData) {
        console.log('Data loaded from cache');
        response(200, 'Successfully loaded data from cache', cachedData, res);
    } else {
        console.log('Fetching data from database');
        fetchDataFromDatabase(query, res);
    };
}

const insert = (data) =>{
    const query = `INSERT INTO usertable (username, postalCode, street, city, country) VALUES (?, ?, ?, ?, ?)`;
    const values = [`${data.username}`, `${data.postalCode}`, `${data.address.street}`, `${data.address.city}`, `${data.address.country}` ];
    connect.query(query,values,(err)=>{
        if (err){
            console.err("Error Inserting Data :", err);
        } else {
            console.log("Data Successfully Inserted")
        }
    });
}

const deletion = (username) =>{
    const query = `DELETE FROM usertable WHERE username = '${username}'`;
    connect.query(query,(err)=>{
        if (err) {
            console.err("Error Deleting Data :", err)
        }
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

    connect.query(query, (err, results) => {
        if (err) {
            console.error(`Error updating data for ${username}:`, errr);
        } else {
            console.log(`Data for ${username} successfully updated`);
        }
    });
};

module.exports = {insert, fetch, rootFetch, deletion, update};