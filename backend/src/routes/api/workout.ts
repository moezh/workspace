import {Router} from "express";
const router = Router();

import {getAuth} from "../../middlewares/auth";
import {getConfig} from "../../controllers/workout";
import {getExercises, getExercise, getWorkouts, getWorkout, getPrograms, getProgram} from "../../controllers/workout";

router.get("/", getAuth, getConfig);
router.get("/exercises", getAuth, getExercises);
router.get("/exercises/:id", getAuth, getExercise);
router.get("/workouts", getAuth, getWorkouts);
router.get("/workouts/:id", getAuth, getWorkout);
router.get("/programs", getAuth, getPrograms);
router.get("/programs/:id", getAuth, getProgram);

router.get("*", (req, res) => {
  res.status(404).json({code: 404, description: "Not Found"});
});

export default router;
