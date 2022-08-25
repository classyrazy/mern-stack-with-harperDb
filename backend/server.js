const express = require("express")
const dotenv = require("dotenv")
var cors = require('cors')
dotenv.config()
const app = express()
const workoutsRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")

let PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    next()
})
app.use("/api/workouts",workoutsRoutes)
app.use("/api/user",userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})