const mongoose = require("mongoose");
const config = require("./config.json")
const connectDB = () =>
{
    mongoose
        .connect(process.env.DB_URL || config.database.mongodb.local, {
            dbName: "blogapp",
        }, config.database.mongodb.confingRules)
        .then((c) => console.log(`Database Connected with ${c.connection.host}`))
        .catch((e) => console.log(e));
};

module.exports = connectDB;