import React from 'react';

const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id, !todo.completed)}
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Sil</button>
        </li>
    );
};

export default TodoItem;
