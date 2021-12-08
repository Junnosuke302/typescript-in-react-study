import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { Todo } from './Todo';
import { TodoType } from "./types/todo";

function App() {
    const [todos, setTodos] = useState<Array<TodoType>>([]);

    const onClickFetchData = (): void => {
        axios
        .get<Array<TodoType>>("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
            setTodos(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };
  
    return (
        <div className="App">
            <button onClick={onClickFetchData}>データ取得</button>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    title={todo.title}
                    userId={todo.userId}
                    completed={todo.completed}
                />
            ))}
        </div>
    );
}

export default App;
