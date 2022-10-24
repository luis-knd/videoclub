const request = require("request")
require("dotenv").config()
const Movies = require("../models/Movies")
const MovieDetails = require("../models/MovieDetails")
const Actor = require("../models/Actor")
const ActorMovie = require("../models/ActorMovies")

const getByTitle = async (req, res) => {
    try {
        let url = process.env.OMDB_API_URL + process.env.OMDB_API_TOKEN + "&t=" + req.query.title
        request(url, async (err, response, body) => {
            if (!err) {
                const movies = JSON.parse(body)
                let movie = await Movies.findOrCreate({
                    where: {name: movies.Title},
                    defaults: {name: movies.Title}
                })

                await MovieDetails.findOrCreate({
                    where: {movie_id: movie[0].id},
                    defaults: {
                        movie_id: movie[0].id,
                        year: movies.Year,
                        released: movies.Released,
                        runtime: movies.Runtime,
                        plot: movies.Plot,
                        country: movies.Country,
                        awards: movies.Awards,
                        poster: movies.Poster
                    }
                })

                let actors = movies.Actors
                actors = actors.split(",")
                for (let actor of actors) {
                    let actorRegistered = await Actor.findOrCreate({
                        where: {name: actor.trim()},
                        defaults: {name: actor.trim()}
                    })
                    Promise.all([movie, actorRegistered]).then((values) => {
                            // find or create relation actors with movie
                            ActorMovie.findOrCreate({
                                where: {
                                    MovieId: values[0][0].id,
                                    ActorId: values[1][0].id
                                },
                                defaults: {
                                    MovieId: values[0][0].id,
                                    ActorId: values[1][0].id
                                }
                            })
                        }
                    )
                }
                res.json(movies)
            }
        })
    } catch (error) {
        console.error("has error occurred to obtain the users.")
        console.error(error)
    }
}

module.exports = {getByTitle}
