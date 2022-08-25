const express = require("express")
const db = require('../configs/dbconfig');
const requireAuth = require('../middleware/requireAuth');

const {createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout} = require("../controllers/workoutController")

const router = express.Router()
router.use(requireAuth)

// get all workouts
router.get("/", getAllWorkouts)
// create a workout
router.post("/", createWorkout)
router.get("/:id", getSingleWorkout)
router.delete("/:id",deleteWorkout)
router.patch("/:id",updateWorkout)



module.exports = router