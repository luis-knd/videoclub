const {Sequelize} = require("sequelize")
const db = require("../config/database")

const {DataTypes} = Sequelize

const Movies = db.define("movies", {
    name : {
        type : DataTypes.STRING
    },
});

(async () => {
    await db.sync()
})()

module.exports = Movies
