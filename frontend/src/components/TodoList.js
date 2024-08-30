import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem'; // TodoItem bileşenini içe aktar
import TodoForm from './TodoForm';   // TodoForm bileşenini içe aktar

const TodoList = () => {
    const [todos, setTodos] = useState([]); // Görevleri saklamak için durum değişkeni

    // Component yüklendiğinde tüm görevleri almak için useEffect kancası
    useEffect(() => {
        fetch('http://localhost:5000/todos') // API'den görevleri al
            .then(response => response.json()) // JSON formatında yanıtı al
            .then(data => setTodos(data)); // Alınan görev verilerini durum değişkenine ayarla
    }, []); // Boş bağımlılık dizisi, bu kancanın yalnızca bileşen ilk yüklendiğinde çalışmasını sağlar

    // Yeni bir görev eklemek için işlev
    const addTodo = (title) => {
        fetch('http://localhost:5000/todos', {
            method: 'POST', // HTTP POST isteği yap
            headers: {
                'Content-Type': 'application/json', // Gövde içeriğinin JSON formatında olduğunu belirt
            },
            body: JSON.stringify({ title }), // Yeni görev başlığını JSON formatında gönder
        })
            .then(response => response.json()) // JSON formatında yanıtı al
            .then(newTodo => setTodos([...todos, newTodo])); // Yeni görevi mevcut görev listesine ekle
    };

    // Bir görevi silmek için işlev
    const deleteTodo = (id) => {
        fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' }) // HTTP DELETE isteği yap
            .then(() => setTodos(todos.filter(todo => todo._id !== id))); // Görev silindikten sonra, silinen görevi listeden çıkar
    };

    // Bir görevin tamamlanma durumunu güncellemek için işlev
    const toggleTodo = (id, completed) => {
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT', // HTTP PUT isteği yap
            headers: {
                'Content-Type': 'application/json', // Gövde içeriğinin JSON formatında olduğunu belirt
            },
            body: JSON.stringify({ completed }), // Güncellenmiş tamamlanma durumunu JSON formatında gönder
        })
            .then(response => response.json()) // JSON formatında yanıtı al
            .then(updatedTodo => {
                setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo)); // Güncellenmiş görevi listede yerini güncelle
            });
    };

    return (
        <div>
            <h1>To-Do List</h1> {/* Başlık */}
            <TodoForm addTodo={addTodo} /> {/* Görev ekleme formunu render et */}
            <ul>
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id} // Her TodoItem için benzersiz anahtar
                        todo={todo} // TodoItem bileşenine görev verisini geçir
                        deleteTodo={deleteTodo} // TodoItem bileşenine silme işlevini geçir
                        toggleTodo={toggleTodo} // TodoItem bileşenine görev tamamlanma durumunu değiştirme işlevini geçir
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList; // Bileşeni dışa aktar
