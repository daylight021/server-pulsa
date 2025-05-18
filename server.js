const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Dummy database transaksi
let transactions = [];

// Endpoint untuk memproses permintaan isi pulsa/token
app.post('/order', (req, res) => {
    const { ref_id, product, amount } = req.body;

    // Simulasi pemrosesan transaksi
    const transaction = {
        ref_id: ref_id,
        product: product,
        amount: amount,
        status: "Sukses", // Simulasi status berhasil
        message: "Transaksi berhasil"
    };

    // Simpan transaksi ke database sementara
    transactions.push(transaction);

    // Kirim respon balik ke aplikasi
    res.json({
        status: 'Sukses',
        message: 'Transaksi berhasil',
        data: transaction
    });
});

// Endpoint untuk mengecek status transaksi
app.get('/status', (req, res) => {
    const { ref_id } = req.query;

    // Cek transaksi berdasarkan ref_id
    const transaction = transactions.find(t => t.ref_id === ref_id);

    if (transaction) {
        res.json({
            status: 'Sukses',
            message: 'Transaksi ditemukan',
            data: transaction
        });
    } else {
        res.status(404).json({
            status: 'Gagal',
            message: 'Transaksi tidak ditemukan'
        });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server pulsa berjalan di http://localhost:${port}`);
});


"scripts": {
  "start": "node server.js"
}
