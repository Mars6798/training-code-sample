import {useState} from 'react';
import './App.css';
import Todo from '../Todo/Todo';
import TodoForm from '../Todo/TodoForm';

function App() {
    const [todos, setTodos] = useState([
      {
        text: "Learn about React",
        isCompleted: false
      },
      {
        text: "Meet friend for lunch",
        isCompleted: false
      },
      {
        text: "Build really cool todo app",
        isCompleted: false
      }
    ]);

    const addTodo = text => {
        setTodos(prevTodos => {
            return [...prevTodos, {
                text,
                isCompleted: false
            }];
        });
    };

    const completeTodo = index => {
        setTodos(prevTodos => {
            const newTodos = [...prevTodos];
            newTodos[index].completed = true;
            return newTodos;
        });
    };

    const removeTodo = (indexRemove) => {
        setTodos(prevTodos =>
          prevTodos.filter((todo, index) => index !== indexRemove)
        );
    };

    return (
        <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
        </div>
    );
}

export default App;