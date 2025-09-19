document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value.trim();
      const msg = document.getElementById("loginMessage");

      if (!email || !pass) {
        msg.textContent = "Email dan password wajib diisi";
        msg.style.color = "red";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = "Format email tidak valid";
        msg.style.color = "red";
        return;
      }
      msg.textContent = "Login berhasil (simulasi)";
      msg.style.color = "green";

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", email);

      setTimeout(() => window.location.href = "index.html", 1000);
    });
  }

  // === SIGN UP ===
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const pass = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("confirmPassword").value;
      const phone = document.getElementById("phone").value.trim();
      const msg = document.getElementById("signupMessage");

      if (!fullname || !email || !pass || !confirm || !phone) {
        msg.textContent = "Semua field wajib diisi";
        msg.style.color = "red";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = "Format email salah";
        msg.style.color = "red";
        return;
      }
      if (pass.length < 8) {
        msg.textContent = "Password minimal 8 karakter";
        msg.style.color = "red";
        return;
      }
      if (pass !== confirm) {
        msg.textContent = "Konfirmasi password tidak cocok";
        msg.style.color = "red";
        return;
      }
      if (!/^[A-Za-z ]{3,32}$/.test(fullname)) {
        msg.textContent = "Nama hanya huruf (3–32 karakter)";
        msg.style.color = "red";
        return;
      }
      if (!/^08\d{8,14}$/.test(phone)) {
        msg.textContent = "No HP harus mulai 08 & 10-16 digit";
        msg.style.color = "red";
        return;
      }
      msg.textContent = "Pendaftaran berhasil (simulasi)";
      msg.style.color = "green";
      setTimeout(() => window.location.href = "login.html", 1500);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navMenu = document.getElementById("navMenu");

  if (isLoggedIn) {
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "🔓 Logout";
    logoutBtn.className = "btn logout";
    logoutBtn.style.marginLeft = "1rem";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });

    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    navMenu.appendChild(logoutBtn);
  }
});

// === FUNGSI UMUM ===
function hitungUmur(tgl) {
  const dob = new Date(tgl);
  const now = new Date();
  let umur = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) umur--;
  return umur;
}

// === PREMI KESEHATAN ===
function hitungPremiHealth() {
  const tgl = document.getElementById("tglLahir").value;
  const rokok = parseInt(document.getElementById("merokok").value);
  const hpt = parseInt(document.getElementById("hipertensi").value);
  const dbt = parseInt(document.getElementById("diabetes").value);
  const result = document.getElementById("premiHealth");

  if (!tgl || isNaN(rokok) || isNaN(hpt) || isNaN(dbt)) {
    result.textContent = "Lengkapi semua data sebelum menghitung.";
    result.style.color = "red";
    return;
  }

  const umur = hitungUmur(tgl);
  const P = 2000000;
  let m;
  if (umur <= 20) m = 0.1;
  else if (umur <= 35) m = 0.2;
  else if (umur <= 50) m = 0.25;
  else m = 0.4;

  const premi = P + (m * P) + (rokok * 0.5 * P) + (hpt * 0.4 * P) + (dbt * 0.5 * P);
  result.textContent = `Premi per tahun: Rp ${premi.toLocaleString("id-ID")}`;
  result.style.color = "green";
}

// === EVENT LISTENER FORM KESEHATAN ===
document.addEventListener("DOMContentLoaded", () => {
  const healthForm = document.getElementById("healthForm");
  if (healthForm) {
    healthForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const premiText = document.getElementById("premiHealth").textContent;
      const premiValue = premiText.replace(/[^0-9]/g, "");
      localStorage.setItem("premiTerakhir", premiValue);
      localStorage.setItem("produkTerakhir", "Asuransi Kesehatan");

      window.location.href = "checkout.html";
    });
  }
});

// ==== PREMI ASURANSI MOBIL ====
function hitungPremiMobil() {
  const harga = parseFloat(document.getElementById("harga")?.value);
  const tahun = parseInt(document.getElementById("tahun")?.value);
  const result = document.getElementById("premiResult");

  if (isNaN(harga) || isNaN(tahun)) {
    if (result) {
      result.textContent = "Isi harga dan tahun dengan benar.";
      result.style.color = "red";
    }
    return;
  }

  const umur = new Date().getFullYear() - tahun;
  let premi;
  if (umur <= 3) {
    premi = 0.025 * harga;
  } else if (umur <= 5 && harga < 200000000) {
    premi = 0.04 * harga;
  } else if (umur <= 5 && harga >= 200000000) {
    premi = 0.03 * harga;
  } else {
    premi = 0.05 * harga;
  }

  if (result) {
    result.textContent = `Premi per tahun: Rp ${premi.toLocaleString("id-ID")}`;
    result.style.color = "green";
  }
}

// === EVENT LISTENER FORM MOBIL ===
document.addEventListener("DOMContentLoaded", () => {
  const carForm = document.getElementById("carForm");
  if (carForm) {
    carForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const premiText = document.getElementById("premiResult").textContent;
      const premiValue = premiText.replace(/[^0-9]/g, "");
      localStorage.setItem("premiTerakhir", premiValue);
      localStorage.setItem("produkTerakhir", "Asuransi Mobil");

      alert("Data disimpan. Lanjut ke checkout.");
      window.location.href = "checkout.html";
    });
  }
});

// ==== PREMI ASURANSI JIWA ====
function hitungPremiJiwa() {
  const tgl = document.getElementById("tglLahirJiwa")?.value;
  const pertanggungan = parseInt(document.getElementById("pertanggungan")?.value);
  const result = document.getElementById("premiJiwa");

  if (!tgl || isNaN(pertanggungan)) {
    if (result) {
      result.textContent = "Lengkapi tanggal lahir & pilih pertanggungan.";
      result.style.color = "red";
    }
    return;
  }

  const dob = new Date(tgl);
  const now = new Date();
  let umur = now.getFullYear() - dob.getFullYear();
  const mth = now.getMonth() - dob.getMonth();
  if (mth < 0 || (mth === 0 && now.getDate() < dob.getDate())) umur--;

  let tarif;
  if (umur <= 30) tarif = 0.002;
  else if (umur <= 50) tarif = 0.004;
  else tarif = 0.01;

  const premi = tarif * pertanggungan;
  if (result) {
    result.textContent = `Premi per bulan: Rp ${premi.toLocaleString("id-ID")}`;
    result.style.color = "green";
  }
}

// === EVENT LISTENER FORM JIWA ===
document.addEventListener("DOMContentLoaded", () => {
  const lifeForm = document.getElementById("lifeForm");
  if (lifeForm) {
    lifeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const premiText = document.getElementById("premiJiwa").textContent;
      const premiValue = premiText.replace(/[^0-9]/g, "");
      localStorage.setItem("premiTerakhir", premiValue);
      localStorage.setItem("produkTerakhir", "Asuransi Jiwa");

      alert("Pembelian berhasil (simulasi). Premi akan ditambahkan ke histori.");
      window.location.href = "checkout.html";
    });
  }
});

// === CHECKOUT ===
document.addEventListener("DOMContentLoaded", () => {
  const ringkasan = document.getElementById("ringkasan");
  const checkoutForm = document.getElementById("checkoutForm");
  const statusBayar = document.getElementById("statusBayar");

  if (ringkasan && checkoutForm) {
    const premiTerpilih = localStorage.getItem("premiTerakhir");
    if (premiTerpilih) {
      ringkasan.textContent = `Total premi yang harus dibayar: Rp ${Number(premiTerpilih).toLocaleString("id-ID")}`;
    } else {
      ringkasan.textContent = "Tidak ada premi yang dipilih.";
    }

    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      const metode = document.getElementById("metode").value;
      if (!metode) {
        statusBayar.textContent = "Pilih metode pembayaran.";
        statusBayar.style.color = "red";
        return;
      }

      statusBayar.textContent = "Pembayaran berhasil! (simulasi)";
      statusBayar.style.color = "green";

      const histori = JSON.parse(localStorage.getItem("historiPembelian") || "[]");
      console.log("Histori sebelum push:", histori);

      histori.push({
        produk: localStorage.getItem("produkTerakhir") || "Asuransi",
        tanggal: new Date().toLocaleDateString("id-ID"),
        harga: premiTerpilih,
        status: "Lunas"
      });
      console.log("Histori sesudah push:", histori);

      localStorage.setItem("historiPembelian", JSON.stringify(histori));
      console.log("Histori tersimpan:", localStorage.getItem("historiPembelian"));

      setTimeout(() => window.location.href = "history.html", 1500);
  });

  }
});
