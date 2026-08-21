import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [todo, setTodo] = useState([]);
    const [text, setText] = useState("");

    // GET todos
    const getTodo = async () => {
        const response = await fetch(
            "http://localhost:3000/api/todo"
        );

        const data = await response.json();

        setTodo(data);
    };

    useEffect(() => {
        getTodo();
    }, []);

    // ADD todo
    const addTodo = async () => {
        if (text.trim() === "") return;

        const response = await fetch(
            "http://localhost:3000/api/todo",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: text,
                    complete: false
                })
            }
        );

        const newTodo = await response.json();

        setTodo([...todo, newTodo]);

        setText("");
    };

    // UPDATE completed status
    const radioBtn = async (id, complete) => {
        const response = await fetch(
            `http://localhost:3000/api/todo/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    complete: complete
                })
            }
        );

        const updatedTodo = await response.json();

        setTodo(
            todo.map((item) =>
                item._id === id
                    ? updatedTodo
                    : item
            )
        );
    };

    // DELETE todo
    const delBtn = async (id) => {
        await fetch(
            `http://localhost:3000/api/todo/${id}`,
            {
                method: "DELETE"
            }
        );

        setTodo(
            todo.filter((item) => item._id !== id)
        );
    };

    return (
        <>
            <h1>MY TODO APP</h1>

            <div>
                <input
                    type="text"
                    value={text}
                    placeholder="ENTER YOUR TASK"
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                />

                <button onClick={addTodo}>
                    ADD
                </button>
            </div>

            <div>
                <ul>
                    {todo.map((item) => (
                        <li key={item._id}>
                            {item.title}

                            <label>
                                <input
                                    type="checkbox"
                                    checked={item.complete}
                                    onChange={(e) =>
                                        radioBtn(
                                            item._id,
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    {item.complete
                                        ? "Completed"
                                        : "Incomplete"}
                                </span>
                            </label>

                            <button
                                onClick={() =>
                                    delBtn(item._id)
                                }
                            >
                                DEL
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;