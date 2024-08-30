import React from 'react';

// TodoItem bileşeni, bireysel bir görev öğesini temsil eder
const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
    return (
        <li>
            {
                /* Görev tamamlanma durumunu gösteren onay kutusu */
            }
            <input
                type="checkbox"
                checked={todo.completed} // Onay kutusunun işaretli olup olmadığını belirle
                onChange={() => toggleTodo(todo._id, !todo.completed)} // Onay kutusu değiştiğinde görev tamamlanma durumunu değiştir
            />
            {
                /* Görev başlığını ve tamamlanmışsa ilgili sınıfı uygulayan <span> etiketi */
            }
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.title} {/* Görev başlığını göster */}
            </span>
            {/* Görevi silmek için bir düğme */}
            <button onClick={() => deleteTodo(todo._id)}>Sil</button>
        </li>
    );
};

export default TodoItem; // Bileşeni dışa aktar
