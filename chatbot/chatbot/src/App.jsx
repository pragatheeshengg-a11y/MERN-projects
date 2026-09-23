import { useState, useEffect, useRef } from "react";
import "./App.css";

function App(){
  const[message,setmessage]=useState("");
  const[reply,setreply]=useState([]);
  const[loading,setloading]=useState(false);

  const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [reply]);

    async function sendMessage(){
      if(!message.trim()){
        return ;
      }
      const userMessage={
        sender:"user",
        text:message
      };
      setreply((prev)=>[...prev,userMessage])
      setmessage("")
      setloading(true)
    
    try{
      const response= await fetch("http://localhost:5000/api/chat",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials: "include",
          body:JSON.stringify({
            message:message
          })
        }
      );
      const data=await response.json();
      const botMessage={
        sender:"Bot",
        text:data.reply
      };
      setreply((prev)=>[...prev,botMessage]);
    }
    catch(error){
      console.log(error);
        const usererror={
          sender:"Bot",
          text:"Something went wrong error"
        }
        setreply((prev)=>[...prev,usererror]);
    }
    finally{
      setloading(false);
    }
  }
    function handlekey(e){
      if(e.key=="Enter"){
        sendMessage();
      }
    }
    function clearchat(){
      setreply([]);
    }

      return (
        <div className="app">

            <div className="chat-container">

                <div className="chat-header">

                    <div>
                        <h2>🤖 DeliveryTracker Chatbot</h2>
                        <p>🟢Online</p>
                    </div>

                    <button onClick={clearchat}>
                        Clear
                    </button>

                </div>


                <div className="chat-body">

                    {reply.length === 0 && (
                        <div className="welcome">
                            <h2>Hello 👋</h2>
                            <p>
                                Ask me something!
                            </p>
                        </div>
                    )}


                    {reply.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender === "user"
                                    ? "message user-message"
                                    : "message bot-message"
                            }
                        >
                            {msg.text}
                        </div>

                    ))}


                    {loading && (
                        <div className="message bot-message">
                            Getting...
                        </div>
                    )}

                    <div ref={chatEndRef}></div>

                </div>


                <div className="chat-input">

                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setmessage(e.target.value)}
                        onKeyDown={handlekey}
                    />

                    <button onClick={sendMessage}>
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}
export default App;