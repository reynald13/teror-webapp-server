// backend/models/Participant.js

const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true, match: /^\d{10,12}$/ },
  city: { type: String, required: true },
  age: { type: String, required: true },
  points: { type: Number, default: 0 },
  // Tambahkan array untuk menyimpan poin per pertanyaan
  pointsPerQuestion: [Number] // Menyimpan poin yang dipilih oleh pengguna untuk setiap pertanyaan
});

// Menambahkan indeks pada bidang 'city' untuk pencarian lebih cepat
participantSchema.index({ city: 1 });

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
