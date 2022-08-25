import { useEffect, useState } from "react"
import {useLogin} from "../hooks/useLogin";
function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  {login, error, loading} = useLogin()
    async function handleSubmit(e :any) {
        e.preventDefault();
        await login(email, password)
    }
    return(
        <form className="login" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="email">Email:</label>
            <input type="text" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Log in" disabled={loading} />
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default Login;
