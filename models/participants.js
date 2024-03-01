// backend/models/Participant.js

const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true, match: /^\d{10,12}$/ }, // Format nomor telepon harus 10 digit angka
  city: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  points: { type: Number, default: 0 }// Umur harus bilangan bulat positif
});

// Menambahkan indeks pada bidang 'city' untuk pencarian lebih cepat
participantSchema.index({ city: 1 });

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
