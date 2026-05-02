// ============================================================
// DARK / LIGHT MODE TOGGLE
// Cara yang benar: pakai CSS class, bukan ubah style langsung
// ============================================================


// --- 1. Tambahkan warna ke CSS dulu ---
// Tempel ini di style.css kamu (di bagian paling atas atau paling bawah)

/*
body.mode-terang {
  background-color: #f5f3ee;   <- krem lembut, bukan putih polos
  color: #1a1a1a;              <- abu gelap, bukan hitam total
}
*/


// --- 2. Buat tombol toggle ---
const tombolMode = document.createElement("button");
tombolMode.textContent = "☀️";

// Posisi sudut kanan bawah
tombolMode.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  z-index: 9999;
  background: transparent;
`;

document.body.appendChild(tombolMode);


// --- 3. Logika toggle ---
// Pakai class CSS, bukan ubah style langsung → lebih bersih & mudah dikontrol

let modeterang = false; // awal: mode gelap

tombolMode.addEventListener("click", function () {

  modeterang = !modeterang; // balik nilai (true ↔ false)

  if (modeterang) {
    document.body.classList.add("mode-terang");    // aktifkan mode terang
    tombolMode.textContent = "🌙";
  } else {
    document.body.classList.remove("mode-terang"); // kembali ke mode gelap
    tombolMode.textContent = "☀️";
  }

});

// Smooth Scrolling 
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
 
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Typewriter Effect
const kalimat = [
  "I build clean interfaces.",
  "I write readable code.",
  "I love frontend stuff.",
];
 
let indexKalimat = 0;  // kalimat ke berapa sekarang
let indexHuruf   = 0;  // huruf ke berapa sekarang
let sedangHapus  = false; // lagi ngetik atau lagi hapus?
 
const elTeks = document.getElementById("teks");
 
function typewriter() {
  const kalimatAktif = kalimat[indexKalimat];
 
  if (!sedangHapus) {
    // --- MODE NGETIK: tambah 1 huruf ---
    indexHuruf++;
    elTeks.textContent = kalimatAktif.slice(0, indexHuruf);
 
    if (indexHuruf === kalimatAktif.length) {
      // Kalimat selesai → tunggu 1.5 detik lalu mulai hapus
      sedangHapus = true;
      setTimeout(typewriter, 1500);
      return;
    }
  } else {
    // --- MODE HAPUS: kurang 1 huruf ---
    indexHuruf--;
    elTeks.textContent = kalimatAktif.slice(0, indexHuruf);
 
    if (indexHuruf === 0) {
      // Sudah kosong → pindah ke kalimat berikutnya
      sedangHapus = false;
      indexKalimat = (indexKalimat + 1) % kalimat.length;
    }
  }
 
  // Kecepatan ngetik vs hapus berbeda biar lebih natural
  const delay = sedangHapus ? 60 : 110;
  setTimeout(typewriter, delay);
}
 
// Mulai typewriter setelah halaman siap
typewriter();