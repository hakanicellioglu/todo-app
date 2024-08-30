import React, { useState } from 'react';

// TodoForm bileşeni, bir görev ekleme formunu içerir ve 'addTodo' fonksiyonunu alır
const TodoForm = ({ addTodo }) => {
    const [title, setTitle] = useState(''); // Görev başlığını saklamak için durum değişkeni

    // Form gönderildiğinde tetiklenen işlev
    const handleSubmit = (e) => {
        e.preventDefault(); // Formun varsayılan gönderim davranışını engelle
        if (title.trim()) { // Başlık boş değilse (boşluklardan arındırılmış)
            addTodo(title); // 'addTodo' fonksiyonunu çağırarak yeni görevi ekle
            setTitle(''); // Başlık alanını temizle
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
            <input
                type="text" // Giriş tipi metin
                value={title} // Giriş değerini durum değişkeni ile senkronize et
                onChange={(e) => setTitle(e.target.value)} // Giriş değiştiğinde durum değişkenini güncelle
                placeholder="Yeni görev ekle" // Giriş alanının boşta görünen metni
            />
            <button type="submit">Ekle</button> {/* Formu gönderme düğmesi */}
        </form>
    );
};

export default TodoForm; // Bileşeni dışa aktar
