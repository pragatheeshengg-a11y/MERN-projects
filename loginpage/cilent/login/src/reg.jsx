import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {

        const response = await fetch("http://localhost:5000/api/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            navigate("/");

        } else {

            alert(data.message);

        }

    }

    return (

        <div
            style={{
                width: "300px",
                margin: "100px auto",
                textAlign: "center"
            }}
        >

            <h1>Register</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleRegister}>
                Register
            </button>

            <br /><br />

            <Link to="/">
                Already have an account? Login
            </Link>

        </div>

    );

}

export default Register;