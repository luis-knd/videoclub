const request = require("request")
require("dotenv").config()

const getByTitle = async (req, res) => {
    try {
        // eslint-disable-next-line no-undef
        let url = process.env.OMDB_API_URL + process.env.OMDB_API_TOKEN + "&t=" + req.query.title
        request(url, (err, response, body) => {
            if (!err) {
                const movies = JSON.parse(body)
                res.json(movies)
            }
        })
    } catch (error) {
        console.error("has error occurred to obtain the users.")
        console.error(error)
    }
}

module.exports = {getByTitle}
