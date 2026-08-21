import { useState } from 'react'
import './App.css'

function App() {

  const[prompt,setprompt]=useState("");
  const[res,setres]=useState("");
  const[loading,setloading]=useState(false);

  async function handleprompt(){
    //if (!prompt.trim() || loading) return;
    setloading(true);
    setres("");
    try{
      const response= await fetch("http://localhost:5000/api/genai",{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(
          {prompt:prompt})
      })
    
    const data=await response.json();
    if(data.result){
      setres(data.result);
      setprompt("");
      
    }
    else {
        setres(data.error || 'Something went wrong.'); 
      }
    } catch (err) {
      setres('Network error. Failed to reach backend.');
    }finally{
      setloading(false)
    }

  } 
  

  return (
    
    <div>
      <h1>GOOGLE GEN AI </h1>
      <textarea
      value={prompt}
      placeholder="Enter the prompt here"
      onChange={(e)=>setprompt(e.target.value)}/>
      <button 
      onClick={handleprompt}>SEND</button>
      {loading &&
      <p>GETTING...</p>}
      {res &&
      <p>{res}</p>}

    </div>

    
  )
}

export default App
