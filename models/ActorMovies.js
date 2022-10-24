const {Sequelize} = require("sequelize")
const db = require("../config/database")
const Movie = require("../models/Movies")
const Actor = require("../models/Actor")

const {DataTypes} = Sequelize
const ActorMovies = db.define("actor_movies", {
    MovieId: {
        type: DataTypes.INTEGER,
        reference: {
            model: Movie,
            key: "id"
        }
    },
    ActorId: {
        type: DataTypes.INTEGER,
        reference: {
            model: Actor,
            key: "id"
        }
    }
});

(async () => {
    await db.sync()
})()

module.exports = ActorMovies
