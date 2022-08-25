import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkDetails"
import WorkoutForm from "../components/WorkoutForm"
import {useAuthContext} from "../hooks/useAuthContext"
function Home() {
  const [workouts, setWorkouts] = useState(null)
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log("fetching workouts")
      const response  = await fetch("http://localhost:5000/api/workouts", {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const resJson = await response.json()

      if(response.ok) {
        setWorkouts(resJson)
        console.log(resJson)
      }
    }
    if(user) {
      fetchWorkouts()
    }
  }, [user])

  return (
    <div className="home">
     {/* <h2>Home</h2> */}
     <div className="workouts">
      {workouts && workouts.map((workout) => (
        // <p key={workout.id}> {workout.title}</p>
        <WorkoutDetails key={workout.id} workout={workout} />
      ))}
     </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
