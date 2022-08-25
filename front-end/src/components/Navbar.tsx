import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
function Navbar() {
  const { logOut } = useLogout()
  const { user } = useAuthContext()
  function handleClick() {
    logOut()
  }
  return (
    <header>
      <div className="container">
        <Link to="/">Workout Buddy</Link>
        <nav>
          {user && (
            <div className="">
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!user && (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
