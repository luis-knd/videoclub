const {Sequelize} = require("sequelize")
const db = require("../config/database")
const Movie = require("../models/Movies")

const {DataTypes} = Sequelize
const MovieDetails = db.define("movie_details", {
    movie_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: Movie,
            key: "id"
        }
    },
    year : {
        type : DataTypes.STRING
    },
    released : {
        type : DataTypes.STRING
    },
    runtime : {
        type : DataTypes.STRING
    },
    plot : {
        type : DataTypes.STRING
    },
    country : {
        type : DataTypes.STRING
    },
    awards : {
        type : DataTypes.STRING
    },
    poster : {
        type : DataTypes.STRING
    }
});

(async () => {
    await db.sync()
})()

module.exports = MovieDetails
