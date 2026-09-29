/* ============================================================
   SCRIPT.js
   Logika & animasi website. Biasanya kamu TIDAK perlu mengedit
   file ini — cukup ubah isi di js/config.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     0. ISI TEKS DARI CONFIG.JS KE HALAMAN
  --------------------------------------------------------- */
  document.title = CONFIG.general.websiteTitle;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("loadingText", CONFIG.loading.text);

  setText("passcodeTitle", CONFIG.passcode.title);
  setText("passcodeSubtitle", CONFIG.passcode.subtitle);
  setText("passcodeHint", CONFIG.passcode.hint);

  setText("giftText", CONFIG.giftOpening.text);

  setText("bouquetLabel", CONFIG.bouquet.label);
  setText("bouquetTitle", CONFIG.bouquet.title);
  setText("bouquetSubtitle", CONFIG.bouquet.subtitle);
  setText("bouquetInstruction", CONFIG.bouquet.instruction);

  setText("letterLabel", CONFIG.letter.label);
  setText("letterTitle", CONFIG.letter.title);
  setText("letterDate", CONFIG.letter.date);
  setText("letterGreeting", CONFIG.letter.greeting);
  setText("letterPs", CONFIG.letter.ps);
  setText("letterSignature", CONFIG.letter.signature);

  const letterBody = document.getElementById("letterBody");
  CONFIG.letter.paragraphs.forEach(p => {
    const para = document.createElement("p");
    para.textContent = p;
    letterBody.appendChild(para);
  });

  setText("memoriesLabel", CONFIG.memories.label);
  setText("memoriesTitle", CONFIG.memories.title);

  setText("journeyLabel", CONFIG.journey.label);
  setText("journeyTitle", CONFIG.journey.title);

  setText("gratitudeLabel", CONFIG.gratitude.label);
  setText("gratitudeTitle", CONFIG.gratitude.title);
  setText("gratitudeInstruction", CONFIG.gratitude.instruction);
  setText("jarButton", CONFIG.gratitude.buttonText);

  setText("finaleEmoji", CONFIG.finale.emoji);
  setText("finaleTitle", CONFIG.finale.title);
  setText("finaleSubtitle", CONFIG.finale.subtitle);
  setText("finaleClose", CONFIG.finale.closeButtonText);
  setText("finaleFooter", CONFIG.finale.footer);

  /* ---------------------------------------------------------
     0b. MODE DEMO: tombol kembali + WhatsApp mengapung
  --------------------------------------------------------- */
  if (CONFIG.demo && CONFIG.demo.enabled) {
    const backEl = document.getElementById("demoBack");
    const waEl = document.getElementById("demoWa");
    const d = CONFIG.demo;

    if (backEl && d.backButton) {
      backEl.href = d.backButton.url || "#";
      document.getElementById("demoBackText").textContent = d.backButton.text || "Kembali";
      backEl.classList.remove("hidden");
    }

    if (waEl && d.whatsapp && d.whatsapp.number) {
      let msg = d.whatsapp.message || "";
      if (d.whatsapp.includePageLink) msg += "\n" + window.location.href;
      waEl.href = "https://wa.me/" + String(d.whatsapp.number).replace(/\D/g, "") +
                  "?text=" + encodeURIComponent(msg);
      document.getElementById("demoWaLabel").textContent = d.whatsapp.label;
      waEl.classList.remove("hidden");
    }
  }

  /* ---------------------------------------------------------
     1. KELOPAK BUNGA BERJATUHAN (background di semua layar)
  --------------------------------------------------------- */
  const petalsLayer = document.getElementById("petalsLayer");
  const petalEmojis = ["🌸", "🌺", "🌷", "✿", "❀", "🌼"];

  function spawnPetal() {
    const petal = document.createElement("span");
    petal.className = "petal-item";
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    const startX = Math.random() * 100;
    const drift = (Math.random() * 120 - 60).toFixed(0) + "px";
    const duration = 9 + Math.random() * 9;
    const size = 14 + Math.random() * 14;

    petal.style.left = startX + "vw";
    petal.style.fontSize = size + "px";
    petal.style.setProperty("--drift", drift);
    petal.style.animationDuration = duration + "s";

    petalsLayer.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 500);
  }

  // populate a handful immediately, then keep spawning slowly
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnPetal, i * 700);
  }
  setInterval(spawnPetal, 1400);

  /* ---------------------------------------------------------
     2. LOADING SCREEN -> PASSCODE (atau langsung ke isi)
  --------------------------------------------------------- */
  const loadingScreen = document.getElementById("loadingScreen");
  const passcodeScreen = document.getElementById("passcodeScreen");
  const giftScreen = document.getElementById("giftScreen");
  const mainContent = document.getElementById("mainContent");

  function goTo(hideEl, showEl) {
    hideEl.classList.add("fade-out");
    setTimeout(() => {
      hideEl.classList.add("hidden");
      showEl.classList.remove("hidden");
    }, 650);
  }

  setTimeout(() => {
    if (CONFIG.passcode.enabled && CONFIG.passcode.code) {
      goTo(loadingScreen, passcodeScreen);
    } else {
      goTo(loadingScreen, giftScreen);
      startGiftSequence();
    }
  }, 2600);

  /* ---------------------------------------------------------
     3. PASSCODE KEYPAD
  --------------------------------------------------------- */
  const dotsWrap = document.getElementById("passcodeDots");
  const keypadWrap = document.getElementById("passcodeKeypad");
  const hintEl = document.getElementById("passcodeHint");
  let enteredCode = "";

  if (CONFIG.passcode.enabled) {
    const codeLength = String(CONFIG.passcode.code).length;

    for (let i = 0; i < codeLength; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dotsWrap.appendChild(dot);
    }

    const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
    keys.forEach(k => {
      const btn = document.createElement("button");
      btn.className = "key" + (k === "" ? " key-empty" : "");
      btn.textContent = k;
      btn.type = "button";
      if (k !== "") {
        btn.addEventListener("click", () => handleKey(k));
      }
      keypadWrap.appendChild(btn);
    });

    function handleKey(k) {
      if (k === "⌫") {
        enteredCode = enteredCode.slice(0, -1);
        renderDots();
        return;
      }
      if (enteredCode.length >= codeLength) return;
      enteredCode += k;
      renderDots();

      if (enteredCode.length === codeLength) {
        setTimeout(checkCode, 250);
      }
    }

    function renderDots() {
      const dots = dotsWrap.querySelectorAll(".dot");
      dots.forEach((d, i) => {
        d.classList.toggle("filled", i < enteredCode.length);
      });
    }

    function checkCode() {
      if (enteredCode === String(CONFIG.passcode.code)) {
        hintEl.textContent = "";
        goTo(passcodeScreen, giftScreen);
        startGiftSequence();
        tryStartMusic();
      } else {
        dotsWrap.classList.add("shake");
        hintEl.textContent = CONFIG.passcode.wrongMessage;
        hintEl.classList.add("error");
        setTimeout(() => {
          dotsWrap.classList.remove("shake");
          enteredCode = "";
          renderDots();
          hintEl.textContent = CONFIG.passcode.hint;
          hintEl.classList.remove("error");
        }, 900);
      }
    }
  }

  /* ---------------------------------------------------------
     4. GIFT OPENING -> MAIN CONTENT
  --------------------------------------------------------- */
  function startGiftSequence() {
    const box = document.getElementById("giftBox");
    const particlesWrap = document.getElementById("giftParticles");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // giftScreen baru tampil ~650ms setelah fungsi ini dipanggil (lihat goTo)
    const SHOW_DELAY  = 650;
    const SHAKE_AT    = SHOW_DELAY + 1400;  // mulai bergoyang
    const OPEN_AT     = SHAKE_AT + 1300;    // tutup terlempar + ledakan
    const FINISH_AT   = OPEN_AT + 2400;     // pindah ke halaman utama

    setTimeout(() => giftScreen.classList.add("phase-shake"), SHAKE_AT);

    setTimeout(() => {
      giftScreen.classList.remove("phase-shake");
      giftScreen.classList.add("phase-open");
      if (!reduceMotion) explode(particlesWrap);
      if (navigator.vibrate) { try { navigator.vibrate([40, 30, 80]); } catch (e) {} }
    }, OPEN_AT);

    setTimeout(() => {
      goTo(giftScreen, mainContent);
      initBouquet();
      initPolaroids();
      initTimeline();
      setupScrollReveal();
    }, FINISH_AT);
  }

  // ledakan konfeti, hati, dan kelopak dari dalam kotak
  function explode(wrap) {
    const colors = ["#ff9ec7", "#f6c9d6", "#e8c07d", "#fdf3ec", "#e17ba0", "#f2cf8a"];
    const emojis = ["💖", "🌸", "✨", "💕", "🌷", "💗"];
    const COUNT = 90;

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("span");
      el.className = "gift-particle";
      const isEmoji = Math.random() < 0.28;

      if (isEmoji) {
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.fontSize = (14 + Math.random() * 14) + "px";
      } else {
        const w = 6 + Math.random() * 7;
        const h = Math.random() < 0.5 ? w : w * (1.8 + Math.random());
        el.style.width = w + "px";
        el.style.height = h + "px";
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = Math.random() < 0.35 ? "50%" : "2px";
      }
      wrap.appendChild(el);

      // arah: dominan ke atas, menyebar ke samping
      const angle = (-90 + (Math.random() * 150 - 75)) * Math.PI / 180;
      const power = 110 + Math.random() * 200;
      const dx = Math.cos(angle) * power;
      const peakY = Math.sin(angle) * power;                   // titik tertinggi (negatif)
      const fall = 260 + Math.random() * 260;                  // jatuh karena gravitasi
      const spin = (Math.random() * 720 - 360);
      const dur = 1700 + Math.random() * 900;

      el.animate([
        { transform: "translate(0,0) scale(0) rotate(0deg)", opacity: 1, offset: 0 },
        { transform: `translate(${dx * 0.75}px, ${peakY}px) scale(1) rotate(${spin * 0.5}deg)`, opacity: 1, offset: 0.4, easing: "cubic-bezier(.3,0,.9,.6)" },
        { transform: `translate(${dx}px, ${peakY + fall}px) scale(0.9) rotate(${spin}deg)`, opacity: 0, offset: 1 }
      ], { duration: dur, delay: Math.random() * 120, easing: "cubic-bezier(.1,.7,.3,1)", fill: "forwards" });
    }
    setTimeout(() => { wrap.innerHTML = ""; }, 3400);
  }

  /* ---------------------------------------------------------
     5. BOUQUET BUNGA (klik untuk lihat pesan)
  --------------------------------------------------------- */
  const bouquetStage = document.getElementById("bouquetStage");
  const bouquetStems = document.getElementById("bouquetStems");
  const flowerPopup = document.getElementById("flowerPopup");
  const popupEmoji = document.getElementById("popupEmoji");
  const popupMessage = document.getElementById("popupMessage");
  const popupClose = document.getElementById("popupClose");

  // ukuran "kanvas" buket dalam satuan px, harus sama dengan
  // viewBox svg (.bouquet-stems) dan ukuran .bouquet-stage di CSS
  const STAGE_W = 320;
  const STAGE_H = 340;
  // titik ikatan tangkai (persis di atas mulut vas)
  const TIE_POINT = { x: STAGE_W / 2, y: 296 };

  function initBouquet() {
    const flowers = CONFIG.bouquet.flowers;
    const n = flowers.length;
    const svgNS = "http://www.w3.org/2000/svg";

    // buat gradasi hijau untuk tangkai (sekali saja)
    const defs = document.createElementNS(svgNS, "defs");
    defs.innerHTML = `
      <linearGradient id="stemGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7fae72"/>
        <stop offset="100%" stop-color="#3f6b3f"/>
      </linearGradient>`;
    bouquetStems.appendChild(defs);

    flowers.forEach((flower, i) => {
      // sebarkan bunga membentuk kipas rapi, bunga tengah paling
      // tinggi, semakin ke pinggir semakin pendek — seperti buket asli
      const t = n > 1 ? i / (n - 1) : 0.5;
      const angleDeg = -58 + 116 * t;               // -58° s/d +58°
      const dome = 1 - Math.pow((t - 0.5) * 2, 2);   // 0 di pinggir, 1 di tengah
      const radius = 118 + 55 * dome;                // tangkai tengah lebih panjang
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = TIE_POINT.x + radius * Math.sin(angleRad);
      const y = TIE_POINT.y - radius * Math.cos(angleRad);

      // --- gambar tangkai (sedikit melengkung natural) ---
      const midX = (x + TIE_POINT.x) / 2 + Math.sin(angleRad) * 10;
      const midY = (y + TIE_POINT.y) / 2;
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute(
        "d",
        `M ${TIE_POINT.x} ${TIE_POINT.y} Q ${midX} ${midY} ${x} ${y}`
      );
      path.setAttribute("stroke", "url(#stemGradient)");
      path.setAttribute("stroke-width", "3.5");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("class", "stem-path");
      path.style.strokeDasharray = "220";
      path.style.strokeDashoffset = "220";
      bouquetStems.appendChild(path);

      // daun kecil di tengah tangkai
      if (i % 2 === 0) {
        const leaf = document.createElementNS(svgNS, "ellipse");
        leaf.setAttribute("cx", midX + (angleDeg < 0 ? -7 : 7));
        leaf.setAttribute("cy", midY + 8);
        leaf.setAttribute("rx", "9");
        leaf.setAttribute("ry", "4.5");
        leaf.setAttribute("fill", "#5c9159");
        leaf.setAttribute(
          "transform",
          `rotate(${angleDeg < 0 ? -35 : 35} ${midX} ${midY + 8})`
        );
        leaf.style.opacity = "0";
        leaf.style.transition = "opacity 0.6s ease";
        leaf.classList.add("stem-leaf");
        bouquetStems.appendChild(leaf);
        setTimeout(() => { leaf.style.opacity = "0.9"; }, 500 + i * 160);
      }

      // --- bunga ---
      const el = document.createElement("span");
      el.className = "flower-item";
      el.textContent = flower.emoji;
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = "translate(-50%, -140%) scale(0.6)";
      el.style.opacity = "0";

      el.addEventListener("click", () => {
        el.classList.add("picked");
        popupEmoji.textContent = flower.emoji;
        popupMessage.textContent = flower.message;
        flowerPopup.classList.remove("hidden");
      });

      bouquetStage.appendChild(el);

      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translate(-50%, -60%) scale(1)";
        el.classList.add("dropped");
        path.style.transition = "stroke-dashoffset 0.7s ease";
        path.style.strokeDashoffset = "0";
      }, 280 + i * 180);
    });
  }

  popupClose.addEventListener("click", () => flowerPopup.classList.add("hidden"));
  flowerPopup.addEventListener("click", (e) => {
    if (e.target === flowerPopup) flowerPopup.classList.add("hidden");
  });

  /* ---------------------------------------------------------
     6. GALERI POLAROID
  --------------------------------------------------------- */
  const photoPopup = document.getElementById("photoPopup");
  const photoPopupImg = document.getElementById("photoPopupImg");
  const photoPopupCaption = document.getElementById("photoPopupCaption");
  const photoPopupDate = document.getElementById("photoPopupDate");
  const photoPopupClose = document.getElementById("photoPopupClose");

  function initPolaroids() {
    const wrap = document.getElementById("polaroidStack");
    CONFIG.memories.photos.forEach(photo => {
      const card = document.createElement("div");
      card.className = "polaroid reveal-item";
      card.innerHTML = `
        <div class="polaroid-tape"></div>
        <img src="${photo.image}" alt="${photo.caption}">
        <p class="polaroid-caption">${photo.caption}</p>
      `;
      card.addEventListener("click", () => {
        photoPopupImg.src = photo.image;
        photoPopupImg.alt = photo.caption;
        photoPopupCaption.textContent = photo.caption;
        photoPopupDate.textContent = photo.date || "";
        photoPopupDate.style.display = photo.date ? "block" : "none";
        photoPopup.classList.remove("hidden");
      });
      wrap.appendChild(card);
    });
  }

  photoPopupClose.addEventListener("click", () => photoPopup.classList.add("hidden"));
  photoPopup.addEventListener("click", (e) => {
    if (e.target === photoPopup) photoPopup.classList.add("hidden");
  });

  /* ---------------------------------------------------------
     7. TIMELINE PERJALANAN
  --------------------------------------------------------- */
  function initTimeline() {
    const wrap = document.getElementById("timeline");
    CONFIG.journey.events.forEach(ev => {
      const item = document.createElement("div");
      item.className = "timeline-item reveal-item";
      item.innerHTML = `
        <span class="timeline-dot"></span>
        <div class="timeline-card">
          <span class="timeline-icon">${ev.icon}</span>
          <p class="timeline-tag">${ev.tag}</p>
          <h3 class="timeline-title">${ev.title}</h3>
          <p class="timeline-desc">${ev.description}</p>
        </div>
      `;
      wrap.appendChild(item);
    });
  }

  /* ---------------------------------------------------------
     8. SCROLL REVEAL (fade + slide saat elemen masuk layar)
  --------------------------------------------------------- */
  function setupScrollReveal() {
    document.querySelectorAll(".reveal-item").forEach(el => {
      // in case some elements already exist in the initial HTML
    });

    const items = document.querySelectorAll(".reveal-item, .letter-paper, .jar-wrap");
    items.forEach(el => el.classList.add("reveal-item"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal-item").forEach(el => observer.observe(el));
  }

  /* ---------------------------------------------------------
     9. MUSIK LATAR (tanpa halaman pemutar, hanya tombol kecil)
  --------------------------------------------------------- */
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  let musicReady = false;

  if (CONFIG.music.enabled && CONFIG.music.src) {
    bgMusic.src = CONFIG.music.src;
    bgMusic.volume = CONFIG.music.volume ?? 0.5;
    musicReady = true;
  } else {
    musicToggle.classList.add("hidden");
  }

  function tryStartMusic() {
    if (!musicReady || !CONFIG.music.autoStartAfterUnlock) return;
    bgMusic.play()
      .then(() => musicToggle.classList.add("playing"))
      .catch(() => {
        // browser memblokir autoplay suara — tunggu pengguna menekan tombol musik
      });
  }

  musicToggle.addEventListener("click", () => {
    if (!musicReady) return;
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicToggle.classList.add("playing");
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    }
  });

  /* ---------------------------------------------------------
     10. TOPLES RASA SYUKUR (shake the jar)
  --------------------------------------------------------- */
  const jar = document.getElementById("jar");
  const jarButton = document.getElementById("jarButton");
  const noteCard = document.getElementById("noteCard");
  const noteIndex = document.getElementById("noteIndex");
  const noteText = document.getElementById("noteText");
  let lastNoteIdx = -1;
  let notesOpened = 0;

  jarButton.addEventListener("click", () => {
    jar.classList.remove("shaking");
    void jar.offsetWidth; // restart animasi
    jar.classList.add("shaking");

    jarButton.disabled = true;

    setTimeout(() => {
      const notes = CONFIG.gratitude.notes;
      let idx;
      do {
        idx = Math.floor(Math.random() * notes.length);
      } while (idx === lastNoteIdx && notes.length > 1);
      lastNoteIdx = idx;
      notesOpened++;

      noteIndex.textContent = "Catatan #" + notesOpened;
      noteText.textContent = notes[idx];
      noteCard.classList.remove("hidden");
      jarButton.disabled = false;
    }, 600);
  });

  /* ---------------------------------------------------------
     11. FINALE
  --------------------------------------------------------- */
  const finaleClose = document.getElementById("finaleClose");
  const finaleCard = document.querySelector(".finale-card");
  finaleClose.addEventListener("click", () => {
    finaleCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    finaleCard.style.opacity = "0";
    finaleCard.style.transform = "scale(0.92)";
    setTimeout(() => { finaleCard.style.display = "none"; }, 500);
  });

});
