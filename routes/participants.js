const express = require('express');
const router = express.Router();
const Participant = require('../models/participants');
const sanitize = require('mongo-sanitize');

// Menggunakan async/await untuk menangani operasi asinkron dengan lebih mudah dibaca
router.post('/participants', async (req, res) => {
    try {
        // Melakukan sanitasi data sebelum menyimpan
        const sanitizedData = sanitize(req.body);
        const participant = new Participant(sanitizedData);
        await participant.save();
        res.json({ message: 'Participant added successfully' });
    } catch (error) {
        console.error('Failed to save participant:', error);
        res.status(400).json({ error: 'Unable to save to database' });
    }
});

router.post('/scores', async (req, res) => {
    try {
        const { name, points } = req.body;

        // Temukan peserta berdasarkan nama
        const participant = await Participant.findOne({ name });

        // Perbarui poin peserta jika ditemukan
        if (participant) {
            participant.points += points;
            await participant.save();
            res.status(200).json({ message: 'Poin berhasil disimpan', participant });
        } else {
            // Jika peserta tidak ditemukan, kirim respons dengan status 404
            res.status(404).json({ error: 'Peserta tidak ditemukan' });
        }
    } catch (error) {
        console.error('Gagal menyimpan poin:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan poin' });
    }
});


module.exports = router;
