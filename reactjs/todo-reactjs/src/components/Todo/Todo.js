function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
        >
            <span>{todo.text}</span>
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}

export default Todo;