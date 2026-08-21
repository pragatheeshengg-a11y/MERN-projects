import { useEffect, useState } from "react";


function Profile(){
    const [profile,setprofile]=useState(null);

    async function showprofile(){
        const token=localStorage.getItem("token");
        const response=await fetch("http://localhost:5000/api/profile",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const data=await response.json()
        setprofile(data)
        
    }

    useEffect(()=>{
        showprofile()
    },[])
    if (!profile) {
    return <h2>Loading...</h2>;
}

    return (
        <div>
            <h1>{profile.text}</h1>

        </div>
    )
}
export default Profile;