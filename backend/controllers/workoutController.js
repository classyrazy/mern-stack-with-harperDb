const db = require('../configs/dbconfig');
const SCHEMA = process.env.INSTANCE_SCHEMA
// get all workoutes

async function getAllWorkouts(req, res) {
    try {
        const Query = `SELECT * FROM ${SCHEMA}.workout WHERE user_id = "${req.user.id}"`
        const allWorkouts = await db.query(Query)
        res.status(200).json(allWorkouts.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// single workout

async function getSingleWorkout(req, res) {
    const { id } = req.params

    db.searchByValue(
        {
            operation: "search_by_value",
            table: "workout",
            searchAttribute: "id",
            searchValue: id,
            attributes: ["*"],
        }, (err, response) => {
            if (err) {
                return res.status(500).json(err);
            }
            
            res.status(response.statusCode).json(response.data);
        }
    );
}

// create new workout
async function createWorkout(req, res) {
    let { title, load, reps } = req.body
    console.log(req.body)

    // add doc to db
    try {
        const workout = await db.insert(
            {
                table: 'workout',
                records: [
                    {
                        user_id: req.user.id,
                        title: title,
                        load: load,
                        reps: reps
                    }
                ]
            }
        )
        console.log(workout.data.inserted_hashes[0])
        // if(workout.data.inserted_hashes.length > 0) {
        db.searchByValue(
            {
                operation: "search_by_value",
                table: "workout",
                searchAttribute: "id",
                searchValue: workout.data.inserted_hashes[0],
                attributes: ["*"],
            }, (err, response) => {
                if (err) {
                    // return res.status(500).json(err);
                    throw new Error(err)
                    // return res.status(500).json(err);
                }
                // console.log(response)
                res.status(response.statusCode).json(response.data);
                // return response.data
            }
        );
        // }

    } catch (error) {
        // if (err) response.status(500).json(err);
        // response.status(res.).json(res.data);
        res.status(500).json({ error: error.message })
    }
}
// delete a workout
async function deleteWorkout(req, res) {
    const { id: deleteId } = req.params
    db.delete(
        {
            operation: "delete",
            table: "workout",
            hashValues: [deleteId],
        },
        (err, response) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(response.data);
        }
    );

}

// update a workout

async function updateWorkout(req, res) {
    const { title, load, reps } = req.body
    const { id: updateId } = req.params
    db.update(
        {
            operation: "update",
            table: "workout",
            records: [{
                id: updateId,
                title: title,
                load: load,
                reps: reps
            }]
        },
        (err, response) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(response.statusCode).json(response.data);
        }
    );

}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}