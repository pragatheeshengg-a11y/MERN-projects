import { useState } from "react";
import{useNavigate} from "react-router-dom";

function Login(){
    const navigate=useNavigate();
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");

    async function handlelogin(){
        const response=await fetch("http://localhost:5000/api/",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        const data=await response.json();

        if(response.ok){
            localStorage.setItem("token",data.token);
            navigate("/profile")
        }
        else{
            alert(data.message);
        }

    }
    return(
        <div 
        style={{
                width: "300px",
                margin: "100px auto",
                textAlign: "center"
            }}
        >
            <h1>Login Page</h1>
            <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e)=>setemail(e.target.value)}/>
            <br/><br/>
            <input
            type="text"
            value={password}
            placeholder="Enter password"
            onChange={(e)=>setpassword(e.target.value)}/>
            <br/><br/>
            <button
            onClick={handlelogin}>Login</button>
        </div>
    )

}
export default Login;