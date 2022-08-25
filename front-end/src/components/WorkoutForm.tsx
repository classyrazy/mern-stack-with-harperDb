import { useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"


function WorkoutForm() {

    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState("");
    const {user} = useAuthContext()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(!user) {
            setError("You must be logged in to create a workout")
            return
        }
        let workout = { title, load, reps }
        const response = await fetch("http://localhost:5000/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.message)
        } else if (response.ok) {
            setError("")
            setTitle("")
            setLoad("")
            setReps("")
            console.log("workout added", json)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exercise Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Load (kg):</label>
            <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
            <label>Reps (kg):</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
