import {Request, Response} from "express";
import {Pool} from "pg";

export const getConfig = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM workout_config`;
  let values: string[] = [];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = new Map(result.rows.map(({name, value}) => [name, value]));
      res.json(Object.fromEntries(data));
    }
  });
};

export const getExercises = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT id, name, instruction, hints FROM workout_exercises ORDER BY id`;
  let values: string[] = [];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
};

export const getExercise = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT id, name, instruction, hints FROM workout_exercises WHERE id = $1`;
  let values: string[] = [id];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = result.rows;
      if (data.length === 0) {
        res.status(404).json({code: 404, description: "Not Found"});
      } else {
        res.json(data[0]);
      }
    }
  });
};

export const getWorkouts = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT id, type, name, description FROM workout_workouts`;
  let values: string[] = [];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
};

export const getWorkout = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM workout_workouts WHERE id = $1`;
  let values: string[] = [id];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = result.rows;
      if (data.length === 0) {
        res.status(404).json({code: 404, description: "Not Found"});
      } else {
        let workout = data[0];
        let exercises: Record<string, string>[] = [];
        let sqlExercises: string = `SELECT * FROM workout_exercises ORDER BY RANDOM ()`;
        db.query(sqlExercises, [], (err, result: {rows: Record<string, string>[];}) => {
          if (err) {
            res.status(500).json({code: 500, description: err});
          } else {
            exercises = result.rows;
            let filtredExercises: Record<string, string>[] = [];
            workout.target.split(",").map((item) => {
              const [category, target] = item.split("-");
              const exercise = exercises.filter((exercise) => (
                exercise.category.includes(category) &&
                (exercise.target.includes(target) || exercise.target_muscles.includes(target))
              ))[0];
              if (exercise !== undefined) {
                filtredExercises.push(exercise);
                exercises = exercises.filter((item) => (item.id !== exercise.id));
              };
            });
            filtredExercises = [].concat(...Array(Number(workout.repeat)).fill(filtredExercises));
            delete workout.target;
            delete workout.repeat;
            workout.exercises = JSON.stringify(filtredExercises);
            res.json(workout);
          }
        });
      }
    }
  });
};

export const getPrograms = async (req: Request, res: Response) => {
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM workout_programs`;
  let values: string[] = [];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = result.rows;
      res.json(data);
    }
  });
};

export const getProgram = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db: Pool = req.app.get("db");
  let sql: string = `SELECT * FROM workout_programs WHERE id = $1`;
  let values: string[] = [id];
  db.query(sql, values, (err, result: {rows: Record<string, string>[];}) => {
    if (err) {
      res.status(500).json({code: 500, description: err});
    } else {
      const data = result.rows;
      if (data.length === 0) {
        res.status(404).json({code: 404, description: "Not Found"});
      } else {
        res.json(data[0]);
      }
    }
  });
};
