const express = require("express")
const router = express.Router()

const userController = require("../controllers/usersController")
const verifyToken = require("../middleware/verifyToken")

router.get("/", verifyToken.verifyToken, userController.index)
router.post("/register", userController.register)
router.post("/login/", userController.login)
router.delete("/logout", userController.logout)

module.exports = router
