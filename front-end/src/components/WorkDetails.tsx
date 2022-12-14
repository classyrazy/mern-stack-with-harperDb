
function WorkoutDetails({ workout }) {

  return (
    <div className="workout-details">
    <h2>{workout.title}</h2>
    <p><strong>Load (kg): </strong>{workout.load}</p>
    <p><strong>Reps (kg): </strong>{workout.reps}</p>
    </div>
  )
}

export default WorkoutDetails
