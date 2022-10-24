const swaggerAutogen = require("swagger-autogen")()

const outputFile = "./swagger_output.json"
const endpointsFiles = ["./routes/authRoutes.js", "./routes/movieRoutes.js", "./routes/usersRoutes.js"]

swaggerAutogen(outputFile, endpointsFiles)
