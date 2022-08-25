import { useEffect, useState } from "react"
import { useSignup } from "../hooks/useSignup";
function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  {signup, error, loading} = useSignup()
    async function handleSubmit(e :any) {
        e.preventDefault();
        await signup(email, password)
    }
    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor="email">Email:</label>
            <input type="text" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Sign Up"  disabled={loading}/>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default SignUp;