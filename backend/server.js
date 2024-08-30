const express = require('express'); // Express.js web uygulama çerçevesini içe aktar
const mongoose = require('mongoose'); // MongoDB ile etkileşim için Mongoose'u içe aktar
const cors = require('cors'); // CORS (Cross-Origin Resource Sharing) için gerekli modülü içe aktar
require('dotenv').config(); // .env dosyasındaki ortam değişkenlerini yükle

const app = express(); // Express uygulamasını oluştur
const port = process.env.PORT || 5000; // Ortam değişkenlerinden PORT'u al, eğer tanımlı değilse 5000'i kullan

app.use(cors()); // CORS ayarlarını kullanarak tüm kaynaklardan gelen isteklere izin ver
app.use(express.json()); // JSON veri gövdesini işlemek için middleware ekle

// MongoDB bağlantısını gerçekleştir
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // URL analizini yeni yöntemle yap
    useUnifiedTopology: true, // Birleşik topoloji kullanımını etkinleştir
})
    .then(() => console.log('MongoDB bağlantısı başarılı')) // Bağlantı başarılıysa bilgi mesajı yazdır
    .catch(err => console.error('MongoDB bağlantı hatası:', err)); // Bağlantı hatası varsa hata mesajını yazdır

// Mongoose şeması ve modeli oluştur
const todoSchema = new mongoose.Schema({
    title: String, // Görev başlığı
    completed: Boolean // Görevin tamamlanma durumu
});

const Todo = mongoose.model('Todo', todoSchema); // 'Todo' modelini oluştur

// CRUD işlemleri için API uç noktaları

// GET isteği ile tüm görevleri getir
app.get('/todos', async (req, res) => {
    const todos = await Todo.find(); // Veritabanındaki tüm görevleri getir
    res.json(todos); // Görevleri JSON formatında yanıtla
});

// POST isteği ile yeni bir görev oluştur
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title, // İstek gövdesinden görev başlığını al
        completed: false // Yeni görevler başlangıçta tamamlanmamış olarak ayarla
    });
    const savedTodo = await newTodo.save(); // Yeni görevi veritabanına kaydet
    res.json(savedTodo); // Kaydedilen görevi JSON formatında yanıtla
});

// PUT isteği ile mevcut bir görevi güncelle
app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Görevi güncelle ve yeni haliyle döndür
        if (!updatedTodo) {
            return res.status(404).send('Görev bulunamadı'); // Görev bulunamazsa 404 hata kodu döndür
        }
        res.json(updatedTodo); // Güncellenmiş görevi JSON formatında yanıtla
    } catch (error) {
        res.status(500).send('Sunucu hatası'); // Sunucu hatası durumunda 500 hata kodu döndür
    }
});

// DELETE isteği ile mevcut bir görevi sil
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id); // Görevi sil
        if (!deletedTodo) {
            return res.status(404).send('Görev bulunamadı'); // Görev bulunamazsa 404 hata kodu döndür
        }
        res.json(deletedTodo); // Silinen görevi JSON formatında yanıtla
    } catch (error) {
        res.status(500).send('Sunucu hatası'); // Sunucu hatası durumunda 500 hata kodu döndür
    }
});

// Sunucuyu belirtilen portta başlat
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`); // Sunucu başlatıldığında port bilgisini ekrana yazdır
});
