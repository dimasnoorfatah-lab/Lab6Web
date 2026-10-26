const form = document.getElementById("formDaftar");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const sesi = document.getElementById("sesi");
const catatan = document.getElementById("catatan");
const counter = document.getElementById("counter");
const sukses = document.getElementById("sukses");
const btnReset = document.getElementById("btnReset");

// Tampilkan / hapus pesan error pada satu kolom
function setError(input, idError, pesan) {
  document.getElementById(idError).textContent = pesan;
  input.classList.toggle("salah", pesan !== "");
  return pesan === "";
}

function cekNama() {
  const v = nama.value.trim();
  return setError(nama, "errNama", v.length < 3 ? "Nama minimal 3 karakter." : "");
}

function cekEmail() {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  return setError(email, "errEmail", ok ? "" : "Format email tidak valid.");
}

function cekSesi() {
  return setError(sesi, "errSesi", sesi.value ? "" : "Pilih salah satu sesi.");
}

// Penghitung karakter langsung
catatan.addEventListener("input", () => {
  counter.textContent = catatan.value.length + " / 100 karakter";
});

nama.addEventListener("blur", cekNama);
email.addEventListener("blur", cekEmail);
sesi.addEventListener("change", cekSesi);

// Submit: validasi semua, tampilkan pesan sukses
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valid = [cekNama(), cekEmail(), cekSesi()].every(Boolean);
  if (valid) {
    sukses.textContent = "Berhasil! " + nama.value.trim() + " terdaftar di " + sesi.value + ".";
    sukses.hidden = false;
  } else {
    sukses.hidden = true;
  }
});

// Reset
btnReset.addEventListener("click", () => {
  form.reset();
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  document.querySelectorAll(".salah").forEach((el) => el.classList.remove("salah"));
  counter.textContent = "0 / 100 karakter";
  sukses.hidden = true;
});