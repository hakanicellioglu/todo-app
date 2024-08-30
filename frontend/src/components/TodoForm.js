import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Yeni görev ekle"
            />
            <button type="submit">Ekle</button>
        </form>
    );
};

export default TodoForm;
