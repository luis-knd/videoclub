const {Sequelize} = require("sequelize")
const db = require("../config/database")

const {DataTypes} = Sequelize
const Actor = db.define("actors", {
    name : {
        type : DataTypes.STRING
    },
});

(async () => {
    await db.sync()
})()

module.exports = Actor
