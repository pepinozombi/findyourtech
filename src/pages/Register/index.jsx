import { useState } from "react";
import { register } from "../../firebase/config";

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const credentialUser = await register({email,password})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <h1>
                Register
            </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ingrese mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="ingrese contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">register</button>
            </form>
        </>
    );
};

export default Register;