// routes/optionsRoutes.js
const {  getMediaTypes } = require('../handlers/optionsHandler');

const optionsRoutes = [

  { method: 'GET', path: '/mediaTypes', handler: getMediaTypes },
];

module.exports = optionsRoutes;

//alur aplikasinya adalah user memilih rating usia dulu, lalu memlih genre film, dan content type atau media type yang dia sukai, serta film dari negara mana yang di cari dan nanti akan muncul list film yang akan di pilih sesuai dengan usia yang di pilih, genre film yang di pilih, content type apa yang di pilih lalu film dari negara mana yang di cari begitu, setelah dia memilih film yang dia pilih baru akan memunculkan output film yang mirip dengan film yang sudah dia pilih, tetapi di halaman berikutnya di tampilkannya begitujadi di bagian const questions id:2 dengan pertanyaan Film seperti apa yang pernah kamu tonton itu memunculkan pilihan film sesuai dengan pilihan user usia yang di pilih, genre film yang di pilih, content type apa yang di pilih lalu film dari negara mana yang di pilih