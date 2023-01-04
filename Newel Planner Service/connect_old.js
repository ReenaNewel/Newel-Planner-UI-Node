const {Client} = require('pg')

const client = new Client({
    host: "43.204.223.103",
    user: "postgres",
    port: 5432,
    password: "India@123",
    database: "Planner_Prod"
})
// Planner_Prod

module.exports = client
