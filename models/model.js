const db = require('../db/connection');
const endpointsJSON = require('../');

const readTopics = () => {
    return db.query(`SELECT * FROM topics;`).then(({
        rows
    }) =>{
        return rows
    });
};







module.exports = {readTopics}