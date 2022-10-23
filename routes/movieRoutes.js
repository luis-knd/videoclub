const express = require("express")
const router = express.Router()

const movieController = require("../controllers/moviesController")
const verifyToken = require("../middleware/verifyToken")

router.get("/get-by-title", verifyToken.verifyToken, movieController.getByTitle)

module.exports = router
