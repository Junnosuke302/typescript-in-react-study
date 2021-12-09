import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { Text } from './Text';
import { Todo } from './Todo';
import { TodoType } from "./types/todo";
import { UserProfile } from './UserProfile';

const user = {
    name: "asdf",
    // hobbies: ["qwer", "zxcv"],
};

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
            <UserProfile user={user} />
            <Text color="red" fontSize="18px" />
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
