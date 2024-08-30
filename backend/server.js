const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Mongoose şeması ve modeli
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// CRUD işlemleri için API uç noktaları
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        completed: false
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
});

app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Görev bulunamadı');
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).send('Sunucu hatası');
    }
});


app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).send('Görev bulunamadı');
        }
        res.json(deletedTodo);
    } catch (error) {
        res.status(500).send('Sunucu hatası');
    }
});


// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
