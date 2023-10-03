import { useState } from "react";
import { login } from "../../firebase/config";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            
            const credentialUser = await login({email,password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <h1>
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ingrese mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="ingrese contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;