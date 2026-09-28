import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [prompt, setprompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);

  // Reference to the bottom of chat
  const chatEndRef = useRef(null);


  // Automatically scroll to bottom
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);


  async function handleprompt() {

    if (!prompt.trim() || loading) return;

    const userPrompt = prompt;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userPrompt
      }
    ]);

    setprompt("");
    setloading(true);

    try {

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: userPrompt
        })
      });

      const data = await response.json();

      if (data.result) {

        // Add AI response
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: data.result
          }
        ]);

      } else {

        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: data.error || "Something went wrong."
          }
        ]);

      }

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Network error. Failed to reach backend."
        }
      ]);

    } finally {

      setloading(false);

    }
  }


  // Press Enter to send
  function handleKeyDown(e) {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleprompt();

    }
  }
  function Clear(){
    setprompt("");
    setMessages([]);
  }


  return (

    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}

      <div className="bg-black text-white px-5 py-3 flex justify-between items-center">

  <div>
    <p className="text-lg font-bold">
      GOOGLE GEN AI
    </p>

    <p className="text-base">
      🟢 Online
    </p>
  </div>

  <button className="bg-white text-black rounded-lg px-4 py-2 hover:bg-purple-900 hover:text-white"
  onClick={Clear}>
    Clear
  </button>

</div>


      {/* Chat Area */}

      <div className="flex-1 overflow-y-auto p-5 pb-24">

        {messages.map((message, index) => (

          <div
            key={index}
            className={
              message.role === "user"
                ? "flex justify-end mb-4"
                : "flex justify-start mb-4"
            }
          >

            <div
              className={
                message.role === "user"
                  ? "bg-purple-500 text-white p-4 rounded-lg shadow w-fit max-w-2xl"
                  : "bg-white text-gray-800 p-4 rounded-lg shadow w-fit max-w-2xl"
              }
            >

              <p>
                {message.text}
              </p>

            </div>

          </div>

        ))}


        {/* Loading */}

        {loading && (

          <div className="flex justify-start mb-4">

            <div className="bg-white text-gray-600 p-4 rounded-lg shadow w-fit">

              GETTING...

            </div>

          </div>

        )}


        {/* Invisible element at bottom */}

        <div ref={chatEndRef}></div>

      </div>


      {/* Input Area */}

      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">

        <div className="flex gap-2 max-w-4xl mx-auto">

          <textarea
            className="bg-purple-300 w-full border border-gray-700 rounded-lg p-3 resize-none"
            value={prompt}
            placeholder="Enter the prompt here"
            onChange={(e) => setprompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="bg-black hover:bg-purple-900 text-white px-6 rounded-lg"
            onClick={handleprompt}
          >
            SEND
          </button>

        </div>

      </div>

    </div>
  )
}

export default App;