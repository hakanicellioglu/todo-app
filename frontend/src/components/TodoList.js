import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    const addTodo = (title) => {
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
            .then(response => response.json())
            .then(newTodo => setTodos([...todos, newTodo]));
    };

    const deleteTodo = (id) => {
        fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' })
            .then(() => setTodos(todos.filter(todo => todo._id !== id)));
    };

    const toggleTodo = (id, completed) => {
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        })
            .then(response => response.json())
            .then(updatedTodo => {
                setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
            });
    };


    return (
        <div>
            <h1>To-Do List</h1>
            <TodoForm addTodo={addTodo} />
            <ul>
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        toggleTodo={toggleTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
