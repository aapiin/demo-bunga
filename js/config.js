/* ============================================================
   FILE INI ADALAH TEMPAT UTAMA UNTUK MENGEDIT ISI WEBSITE
   ------------------------------------------------------------
   Semua teks, gambar, musik, dan pesan yang tampil di website
   diatur dari sini. Kamu TIDAK perlu menyentuh file lain
   (index.html / style.css / script.js) untuk mengganti isi.

   Petunjuk singkat:
   - Teks    : ganti kalimat di dalam tanda kutip "..."
   - Gambar  : taruh foto baru di folder assets/images/
               lalu ganti nama filenya di bagian "memories"
   - Musik   : taruh file mp3 di folder assets/music/
               lalu ganti nama filenya di bagian "music"
   - Jangan hapus tanda koma "," dan kurung kurawal/kurung siku
     { } [ ] supaya kodenya tidak error.
   ============================================================ */

const CONFIG = {

  // =========================================================
  // 1. PENGATURAN UMUM
  // =========================================================
  general: {
    websiteTitle: "Untuk kamu", // judul tab browser
    recipientName: "YAYAAAAAAAA",   // nama orang yang diberi kejutan
    senderName: "Mas Lupsiiii", // nama kamu (pengirim)
  },

  // =========================================================
  // 2. HALAMAN LOADING (muncul pertama kali dibuka)
  // =========================================================
  loading: {
    text: "Menyiapkan sesuatu yang spesial untuk my Bini Bidadari Gwehj ...",
  },

  // =========================================================
  // 3. HALAMAN KODE RAHASIA (passcode)
  //    Kosongkan passcode "" jika tidak mau pakai kode rahasia
  // =========================================================
  passcode: {
    enabled: true,
    code: "132008",                    // kode yang harus ditebak (angka)
    title: "Untuk YAYA yg udh 18 tahun",
    subtitle: "Masukkan kode password",
    hint: "Petunjuk: tanggal Bidadari dri surga ga sengaja jatuh ke oeroeg 💕",
    wrongMessage: "Walah Bidadari ini kyk nya masih lupa, Coba lagi ya Cantik😘🥰 ",
  },

  // =========================================================
  // 4. ANIMASI PEMBUKA HADIAH (setelah passcode benar)
  // =========================================================
  giftOpening: {
    text: "Membuka hadiah untuk sang bidadari tersayaaaaaaaang...",
  },

  // =========================================================
  // 5. BUKET BUNGA DIGITAL (sentuh tiap bunga untuk buka pesan)
  // =========================================================
  bouquet: {
    label: "Hadiah Pertama untuk bidadari dari mas lupsi",
    title: "Happy Birth Dayyyy Mas Pacaaaaaar",
    subtitle: "Setiap bunga menyimpan pesan kecil untuk bidadari inisial p",
    instruction: "Sentuh tiap bunga untuk membuka pesannya 💕",
    // Kamu boleh menambah / mengurangi jumlah bunga di sini.
    // "emoji" bisa diganti emoji bunga lain: 🌸 🌷 🌹 🌻 🌼 💐
    flowers: [
      { emoji: "🌸", message: "jangan keseringan ke dapur yaa, nanti gula nya insinyur, eh insekyur mksd nya." },
      { emoji: "🌷", message: "sangking manis nya kamu bahkan tanggal ultah kamu aja dijulukin hari coklat internasional" },
      { emoji: "🌻", message: "info rumah makan yg menu nya menua sama km wkwkwkwkwkwkwk 99x" },
      { emoji: "🌹", message: "heran sama kamu mah, aku belum pantun aja kamu udh cakep duluan😋😋😋😋😍😍😍😘😘😘🥰🥰🥰" },
      { emoji: "💐", message: "kali ini aku jujur, kamu itu positive vibes banget, lucu, cantik, imut, udahlahhh kamu itu perfect terus kamu juga smart yaampunn kirain manusia kyk gini mitos, ternyata ada yhhh" },
      { emoji: "🌼", message: "btw klo kamu nanam bunga apapun pasti rontok deh bunga nya, org cantik nya diambil ama km wkwkwkwk, sori yy gajelas soal nya yg jelas mah kecantikan km🤪🤪🤪🤪🤪🤪😘😘😘🥰🥰🥰." },
    ],
  },

  // =========================================================
  // 6. SURAT UNTUKMU
  // =========================================================
  letter: {
    label: "Titipan Untuk Mas Pacallll",
    title: "Kata kata untuk hari ini",
    date: "13 September 2026",
    greeting: "Untuk YAYAAAAA tersayang😘🥰🥳,",
    // setiap baris di dalam [ ] akan jadi satu paragraf terpisah
    paragraphs: [
      "Haloo cantikku, selamat ulang tahun yaa. Semoga di usia yang baru ini rezeki kamu semakin lancar, segala urusan dimudahkan, selalu sehat, dan menjadi pribadi yang semakin dewasa dan lebih baik lagi. 🤍",
      "Terima kasih sudah menjadi perempuan yang kuat dan hebat sampai hari ini. Aku selalu berharap kamu bisa bahagia dan dikelilingi hal-hal baik. Maaf yaa sayang, di hari spesial kamu ini aku belum bisa memberikan apa-apa. Aku cuma bisa memberikan doa terbaik untuk kamu. 🤍💞",
      "Semoga panjang umur, sehat selalu, bahagia terus, dan semoga rasa sayang kamu ke aku nggak pernah berubah. Sekali lagi, HAPPY BIRTHDAY SAYANGKU, CINTAKU! 🤍🥳💞",
      "Di hari ulang tahunmu ini, aku berharap semua mimpimu terwujud, semua doamu terjawab, dan semua kebahagiaanmu berlipat ganda. Kamu pantas mendapatkan semua hal indah yang dunia ini tawarkan.",
      "LOVE YOU MORE CINTAAAAAA, BAHAGIA SELALUUUUUUUU😍😘😍",
    ],
    ps: "P.S. — Jika dunia sebuah buku, maka bersamamu adalah bab favorit ku 🌸",
    signature: "Alfin, Bandung 13/9/2026",
  },

  // =========================================================
  // 7. GALERI KENANGAN (foto polaroid)
  //    "image"   diisi nama file di folder assets/images/
  //    "caption" teks singkat di bawah foto (di polaroid)
  //    "date"    opsional, tanggal/keterangan tambahan yang
  //              muncul saat foto diklik (boleh dikosongkan "")
  //    Klik foto akan membuka pop-up berisi foto lebih besar
  //    beserta caption dan tanggalnya.
  // =========================================================
  memories: {
    label: "Galeri Kenangan",
    title: "Beberapa foto kamu di setiap umur",
    photos: [
      { image: "assets/images/1.jpeg", caption: "ini kamuuu pas masih kecil yaa hihiii lucu bgt" },
      { image: "assets/images/2.jpg", caption: "pass masih mts belum menegerti apa apa" },
      { image: "assets/images/3.jpeg", caption: "dan sekarang kamu sudah tumbuh dewasa, tetap bahagia yaaaa, semogaa masa depan dan impian yg kamu impikan terwujud" },
    ],
  },

  // =========================================================
  // 8. PERJALANAN KITA (timeline vertikal)
  // =========================================================
  journey: {
    label: "PESAN UNTUKMU",
    title: "Pesan untuk mu di umur 18 tahun ini, dari mas Lupsi",
    events: [
      {
        icon: "✨",
        tag: "Tetap Tersenyum",
        title: "Ciamis akan mendung jika kamu murung.",
        description: "Dunia mungkin tak selalu berpihak padamu, tapi jangan pernah berhenti tersenyum. Karena ketika kamu tersenyum, seolah semesta ikut merayakanmu.",
      },
      {
        icon: "💬",
        tag: "Jangan Putus Asa",
        title: "Karena Semangatmu, Dunia Lebih Berwarna.",
        description: "Kalau hidup adalah sebuah perjalanan, semoga setiap langkahmu membawa kamu semakin dekat dengan semua hal yang selama ini kamu impikan.",
      },
      {
        icon: "🌅",
        tag: "Jadilah Diri Sendiri",
        title: "Andai Kamu Tahu Betapa Indahnya Dirimu.",
        description: "“Tidak perlu menjadi sempurna untuk menjadi berharga. Teruslah tumbuh menjadi dirimu sendiri, karena bagiku, kamu sudah menjadi seseorang yang begitu berarti.",
      },
      {
        icon: "🎉",
        tag: "Jangan Pernah Merasa Kesepian",
        title: "Jika langkahmu terasa sepi, percayalah, seseorang tetap di sisimu.",
        description: "Jika suatu hari kamu merasa sendirian, jangan biarkan sunyi membuatmu merasa tak berarti. Ingatlah, selalu ada seseorang yang ingin berjalan di sampingmu, menemani setiap langkahmu, bahkan ketika dirinya tak selalu terlihat.",
      },
    ],
  },

  // =========================================================
  // 9. MUSIK LATAR (background music)
  //    - Taruh file mp3 di folder assets/music/
  //    - Ganti "src" dengan nama file mp3 kamu
  //    - Musik akan otomatis diputar pelan setelah pengguna
  //      berinteraksi (browser tidak izinkan autoplay suara)
  //    - Tidak ada halaman/daftar pemutar musik, hanya tombol
  //      kecil play/pause mengambang di pojok layar
  // =========================================================
  music: {
    enabled: true,
    src: "assets/music/lagu.mp3",
    title: "Musik Latar",
    autoStartAfterUnlock: true, // otomatis mulai setelah kode rahasia benar
    volume: 0.45,
  },

  // =========================================================
  // 10. TOPLES RASA SYUKUR (shake the jar)
  // =========================================================
  gratitude: {
    label: "Dari Hatiku Untukmu",
    title: "Beberapa Pesan Dari Hati Mungielll Lupsiii",
    instruction: "Kocok toplesnya dan ambil satu catatan 📃",
    buttonText: "Kocok Toples",
    // tambah/kurangi catatan sesuka hati
    notes: [
      "Kehadiranmu saja sudah cukup membuat ruangan terasa lebih hangat.",
      "Kamu selalu tahu cara membuatku tersenyum, bahkan di hari terburukku.",
      "Caramu peduli pada orang lain adalah salah satu hal yang paling aku kagumi darimu.",
      "Bersamamu, aku belajar apa artinya dicintai dengan tulus.",
      "Kamu adalah rumah paling nyaman yang pernah aku temukan.",
      "Setiap detik bersamamu seperti anugerah yang tak ingin aku sia-siakan.",
      "Terima kasih sudah selalu sabar menghadapiku.",
      "Kamu membuatku percaya bahwa hal-hal indah itu benar-benar nyata.",
    ],
  },

  // =========================================================
  // 11. PENUTUP (Happy Birthday!)
  // =========================================================
  finale: {
    emoji: "🎂",
    title: "Happy Birthday!",
    subtitle: "Untuk yayaaaa yang paling istimewa",
    closeButtonText: "Tutup ✕",
    footer: "— Menurut orang, cantik itu ada habis nya, tapi dimata ku tidak 💕 —",
  },

  // =========================================================
  // 12. MODE DEMO (tombol kembali + tombol WhatsApp mengapung)
  //     Set enabled: false untuk menyembunyikan keduanya
  //     (misalnya saat website ini sudah dikirim ke pembeli).
  // =========================================================
  demo: {
    enabled: true,

    // tombol kembali ke halaman pemilihan / katalog desain
    backButton: {
      text: "Kembali",
      // GANTI dengan alamat halaman pemilihan kamu, contoh:
      // "../index.html"  atau  "https://namakamu.com/katalog"
      url: "../index.html",
    },

    // tombol WhatsApp mengapung
    whatsapp: {
      // GANTI dengan nomor WA kamu: kode negara tanpa "+" dan tanpa 0 di depan
      // contoh: 0812-3456-789 -> "628123456789"
      number: "6285951529923",
      label: "Saya mau order/bertanya tentang web ini",
      // teks yang sudah terisi otomatis di chat WhatsApp
      message: "Halo, saya mau order/bertanya tentang web ini.",
      // true = alamat demo ini ikut dikirim di chat, jadi kamu tahu desain mana yang dimaksud
      includePageLink: true,
    },
  },

};
