/**
 * ==============================================================================
 * 🎂 SREEJA'S 21ST BIRTHDAY - MAIN APPLICATION LOGIC
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentPage = 1;
  const totalPages = 5;
  let candlesBlown = false;
  let currentSlide = 0;
  let carouselTimer = null;
  let selectedGiftKey = null;

  // Cache DOM Elements
  const pages = [
    document.getElementById('page-1'),
    document.getElementById('page-2'),
    document.getElementById('page-3'),
    document.getElementById('page-4'),
    document.getElementById('page-5')
  ];

  const pageIndicator = document.getElementById('pageIndicator');
  const musicToggle = document.getElementById('musicToggle');

  // ============================================================================
  // 0. CUTE ASSET PRELOADER (Loads all images & gifts before revealing site)
  // ============================================================================
  function initAssetPreloader() {
    const preloader = document.getElementById('cutePreloader');
    const progressBar = document.getElementById('preloaderProgressBar');
    const percentText = document.getElementById('preloaderPercent');
    const quoteText = document.getElementById('preloaderQuote');

    if (!preloader) return;

    // Engaging, cute loading quotes that rotate while loading
    const quotes = [
      "Baking Sreeja's 21st Birthday Cake... 🎂",
      "Gathering 21 years of golden memories... 📸",
      "Ironing Cousin Sauhardya's party suit... 👔",
      "Packing your 21st birthday surprise gifts... 🎁",
      "Polishing the confetti cannons... 🎊",
      "Tuning the birthday music box... 🎵",
      "Warming up the celebration drums... 🥁",
      "Almost ready for Shuju's grand celebration! ✨"
    ];

    let quoteIdx = 0;
    const quoteInterval = setInterval(() => {
      quoteIdx = (quoteIdx + 1) % quotes.length;
      if (quoteText) {
        quoteText.style.opacity = 0;
        setTimeout(() => {
          quoteText.innerText = quotes[quoteIdx];
          quoteText.style.opacity = 1;
        }, 200);
      }
    }, 1300);

    // Collect all asset URLs to preload
    const assetUrls = [
      'assets/optimized/pic_start.jpg',
      'assets/optimized/pic_end.jpg',
      'assets/gifs/start.gif',
      'assets/gifs/cake_lit.gif',
      'assets/gifs/cake_blown.gif',
      'assets/gifs/dance.gif',
      'assets/gifs/bye.gif'
    ];

    if (window.birthdayMessages?.page2?.photos) {
      window.birthdayMessages.page2.photos.forEach(p => {
        if (p.src && !assetUrls.includes(p.src)) {
          assetUrls.push(p.src);
        }
      });
    }

    let loadedCount = 0;
    const totalAssets = assetUrls.length;
    let finished = false;

    function updateProgress(percent) {
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (percentText) percentText.innerText = `${percent}%`;
    }

    function onComplete() {
      if (finished) return;
      finished = true;
      clearInterval(quoteInterval);

      updateProgress(100);
      if (quoteText) {
        quoteText.innerText = "🎉 All Surprises Loaded! Welcome Shuju!";
      }

      if (window.confetti) {
        window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 40);
      }

      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
          preloader.remove();
        }, 650);
      }, 350);
    }

    assetUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        const pct = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
        updateProgress(pct);
        if (loadedCount >= totalAssets) {
          onComplete();
        }
      };
      img.onerror = () => {
        loadedCount++;
        const pct = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
        updateProgress(pct);
        if (loadedCount >= totalAssets) {
          onComplete();
        }
      };
      img.src = url;
    });

    // Safety fallback timeout: never block user if network drops a packet
    setTimeout(() => {
      if (!finished) onComplete();
    }, 7500);
  }

  // ============================================================================
  // 1. POPULATE CONTENT FROM messages.js
  // ============================================================================
  function loadMessages() {
    const msg = window.birthdayMessages;
    if (!msg) return;

    // Page 1
    if (msg.page1) {
      if (document.getElementById('p1-badge')) document.getElementById('p1-badge').innerText = msg.page1.badge || "Special 21st Birthday Edition";
      if (document.getElementById('p1-title')) document.getElementById('p1-title').innerText = msg.page1.heading || `Happy 21st Birthday, ${msg.recipient.nickname}! 🎂💖`;
      if (document.getElementById('p1-text-1')) document.getElementById('p1-text-1').innerText = msg.page1.welcomeText[0] || "";
      if (document.getElementById('p1-text-2')) document.getElementById('p1-text-2').innerText = msg.page1.welcomeText[1] || "";
      if (document.getElementById('cakePrompt')) document.getElementById('cakePrompt').innerText = msg.page1.candlePrompt || "Tap the candles to blow them out & make a wish! 🕯️";
      if (document.getElementById('p1-btn')) document.getElementById('p1-btn').innerText = msg.page1.buttonText || "Unwrap Your Birthday Surprises 🎁";
    }

    // Page 2
    if (msg.page2) {
      if (document.getElementById('p2-title')) document.getElementById('p2-title').innerText = msg.page2.heading;
      if (document.getElementById('p2-subtitle')) document.getElementById('p2-subtitle').innerText = msg.page2.subtitle;
      if (document.getElementById('p2-btn')) document.getElementById('p2-btn').innerText = msg.page2.buttonText;
      buildCarousel(msg.page2.photos);
    }

    // Page 3 (Gifts)
    if (msg.page3) {
      if (document.getElementById('p3-title')) document.getElementById('p3-title').innerText = msg.page3.heading;
      if (document.getElementById('p3-subtitle')) document.getElementById('p3-subtitle').innerText = msg.page3.subtitle;
      if (document.getElementById('p3-btn')) document.getElementById('p3-btn').innerText = msg.page3.buttonText;
    }

    // Page 4 (Letter & Shayaris)
    if (msg.page4) {
      if (document.getElementById('p4-title')) document.getElementById('p4-title').innerText = msg.page4.heading;
      if (document.getElementById('p4-subtitle')) document.getElementById('p4-subtitle').innerText = msg.page4.subtitle;
      if (document.getElementById('letter-salutation')) document.getElementById('letter-salutation').innerText = msg.page4.salutation;
      if (document.getElementById('letter-opening')) document.getElementById('letter-opening').innerText = msg.page4.openingParagraph;
      
      // Shayaris
      const shayariContainer = document.getElementById('shayari-list');
      if (shayariContainer && msg.page4.shayaris) {
        shayariContainer.innerHTML = '';
        msg.page4.shayaris.forEach(item => {
          const card = document.createElement('div');
          card.className = `shayari-card shayari-${item.colorName || 'brown'}`;
          if (item.colorCode) card.style.borderLeftColor = item.colorCode;
          card.innerHTML = item.lines.map(line => `<div>${line}</div>`).join('');
          shayariContainer.appendChild(card);
        });
      }

      // Body paragraphs
      if (document.getElementById('letter-body') && msg.page4.bodyParagraphs) {
        document.getElementById('letter-body').innerHTML = msg.page4.bodyParagraphs.map(p => `<p class="letter-paragraph">${p}</p>`).join('');
      }

      if (document.getElementById('letter-closing')) document.getElementById('letter-closing').innerText = msg.page4.closing;
      if (document.getElementById('letter-signature')) document.getElementById('letter-signature').innerText = msg.page4.signature;
      if (document.getElementById('p4-btn')) document.getElementById('p4-btn').innerText = msg.page4.buttonText;
    }

    // Page 5 (Finale)
    if (msg.page5) {
      if (document.getElementById('p5-title')) document.getElementById('p5-title').innerText = msg.page5.heading;
      if (document.getElementById('p5-subtitle')) document.getElementById('p5-subtitle').innerText = msg.page5.subtitle;
      if (document.getElementById('p5-text-1') && msg.page5.signingOffText) document.getElementById('p5-text-1').innerText = msg.page5.signingOffText[0] || "";
      if (document.getElementById('p5-text-2') && msg.page5.signingOffText) document.getElementById('p5-text-2').innerText = msg.page5.signingOffText[1] || "";
      if (document.getElementById('p5-text-3') && msg.page5.signingOffText) document.getElementById('p5-text-3').innerText = msg.page5.signingOffText[2] || "";
      if (document.getElementById('cheers-text')) document.getElementById('cheers-text').innerText = msg.page5.cheersNote || "Cheers!! 🥂✨";
    }
  }

  // ============================================================================
  // 2. PAGE NAVIGATION
  // ============================================================================
  window.goToPage = function(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;

    if (window.soundFx) window.soundFx.playPop();

    pages.forEach((page, index) => {
      if (page) {
        if (index + 1 === pageNum) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      }
    });

    currentPage = pageNum;
    if (pageIndicator) pageIndicator.innerText = `Page ${currentPage} of ${totalPages}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific triggers
    if (currentPage === 2) {
      startCarousel();
    } else {
      stopCarousel();
    }

    if (currentPage === 3) {
      if (window.confetti) window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.3, 40);
    }

    if (currentPage === 5) {
      if (window.confetti) {
        window.confetti.cannon();
        setTimeout(() => window.confetti.hearts(window.innerWidth / 2, window.innerHeight * 0.4, 30), 600);
      }
      const finaleBadge = document.getElementById('finaleGiftBadge');
      if (finaleBadge && selectedGiftKey) {
        const reactions = window.birthdayMessages?.page3?.giftReactions || {};
        const title = reactions[selectedGiftKey]?.title || selectedGiftKey.toUpperCase();
        finaleBadge.innerHTML = `🎁 <b>Officially Claimed 21st Gift:</b> ${title}<br><span style="font-size:0.85rem; color:#7A6577;">(Sauhardya is officially bound to fulfill this! ✨)</span>`;
        finaleBadge.style.display = 'block';
      }
    }
  };

  // ============================================================================
  // 3. PAGE 1: INTERACTIVE CAKE & CANDLE BLOW
  // ============================================================================
  const cake = document.getElementById('interactiveCake');
  const cakeGif = document.getElementById('cakeGif');
  const candlePrompt = document.getElementById('cakePrompt');

  if (cake) {
    cake.addEventListener('click', () => {
      if (candlesBlown) {
        // Re-ignite candles playfully
        if (cakeGif) cakeGif.src = 'assets/gifs/cake_lit.gif?t=' + Date.now();
        candlesBlown = false;
        const promptText = window.birthdayMessages?.page1?.candlePrompt || "Tap the candles to blow them out & make a wish! 🕯️";
        if (candlePrompt) candlePrompt.innerText = promptText;
        if (window.soundFx) window.soundFx.playPop();
        return;
      }

      // Blow out candles: switch to cake_blown.gif
      if (cakeGif) cakeGif.src = 'assets/gifs/cake_blown.gif?t=' + Date.now();
      candlesBlown = true;

      // Realistic rising smoke cloud puffs
      spawnSmokeClouds(cake);

      if (window.soundFx) {
        window.soundFx.playBlow();
        setTimeout(() => window.soundFx.playFanfare(), 250);
      }

      if (window.confetti) {
        window.confetti.cannon();
      }

      if (candlePrompt) {
        const blownMsg = window.birthdayMessages?.page1?.candleBlownMessage || "🎉 Yay! Aapki saari ichchayein poori ho jayee.. choo! Now, let's unlock your birthday surprises...";
        candlePrompt.innerHTML = `<span style="color:#06D6A0; font-weight:700;">${blownMsg}</span>`;
      }
    });
  }

  function spawnSmokeClouds(container) {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const cloud = document.createElement('div');
        cloud.className = 'smoke-cloud';
        cloud.innerText = ['💨', '☁️', '💨'][i];
        cloud.style.left = (40 + Math.random() * 20) + '%';
        container.appendChild(cloud);
        setTimeout(() => cloud.remove(), 1900);
      }, i * 180);
    }
  }

  // ============================================================================
  // 4. PAGE 2: MEMORY CAROUSEL LOGIC
  // ============================================================================
  const slidesContainer = document.getElementById('slidesContainer');
  const dotsContainer = document.getElementById('dotsContainer');
  let slides = [];
  let dots = [];

  function buildCarousel(photosList) {
    if (!slidesContainer || !photosList || photosList.length === 0) return;

    slidesContainer.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';

    photosList.forEach((item, index) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `
        <div class="carousel-polaroid">
          <div class="polaroid-tape"></div>
          <img src="${item.src}" alt="Memory ${index + 1}" class="carousel-img" loading="lazy" onerror="this.src='${item.src.replace('assets/optimized/', '')}'">
          <div class="carousel-caption">${item.caption || ''}</div>
          <div class="carousel-date">${item.date || ''}</div>
        </div>
      `;
      slidesContainer.appendChild(slide);

      // Dot
      if (dotsContainer) {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          goToSlide(index);
          if (window.soundFx) window.soundFx.playPop();
        });
        dotsContainer.appendChild(dot);
      }
    });

    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
    goToSlide(0);
  }

  function goToSlide(index) {
    if (slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((d, idx) => {
      if (idx === currentSlide) d.classList.add('active');
      else d.classList.remove('active');
    });
  }

  window.prevSlide = function() {
    goToSlide(currentSlide - 1);
    if (window.soundFx) window.soundFx.playPop();
  };

  window.nextSlide = function() {
    goToSlide(currentSlide + 1);
    if (window.soundFx) window.soundFx.playPop();
  };

  function startCarousel() {
    stopCarousel();
    carouselTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4500);
  }

  function stopCarousel() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
  }

  // Touch Swipe for Mobile
  const carouselWrapper = document.getElementById('carouselWrapper');
  if (carouselWrapper) {
    let startX = 0;
    let endX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopCarousel();
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startCarousel();
    }, { passive: true });

    carouselWrapper.addEventListener('mouseenter', stopCarousel);
    carouselWrapper.addEventListener('mouseleave', startCarousel);
  }

  // Heart Tap Action
  window.triggerHeartTap = function(event) {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (window.confetti) window.confetti.hearts(x, y, 20);
    if (window.soundFx) window.soundFx.playPop();
  };

  // ============================================================================
  // 5. PAGE 3: INTERACTIVE GIFT SELECTION MENU
  // ============================================================================
  const giftCards = document.querySelectorAll('.gift-card');
  const voucherBox = document.getElementById('giftVoucher');
  const voucherTitle = document.getElementById('voucherTitle');
  const voucherText = document.getElementById('voucherText');
  const voucherMeta = document.getElementById('voucherMeta');

  giftCards.forEach(card => {
    card.addEventListener('click', () => {
      const giftKey = card.getAttribute('data-gift');
      selectedGiftKey = giftKey;

      // Update selected card styling
      giftCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      // Play cheerful sounds
      if (window.soundFx) {
        window.soundFx.playPop();
        setTimeout(() => window.soundFx.playFanfare(), 150);
      }

      // Confetti burst
      const rect = card.getBoundingClientRect();
      if (window.confetti) {
        window.confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
      }

      // Show Claim Voucher
      showVoucher(giftKey);
    });
  });

  let giftDispatched = false;

  function generateClaimText(giftKey) {
    const reactions = window.birthdayMessages?.page3?.giftReactions || {};
    const giftTitle = reactions[giftKey]?.title || giftKey.toUpperCase();
    const nickname = window.birthdayMessages?.recipient?.nickname || "Shuju";
    return `Hey Sauhardya! 🥳 For my 21st Birthday, I have officially claimed: ${giftTitle}! 🎁✨\nCoupon Code: BDAY21-${nickname.toUpperCase()}\nYou are officially bound to deliver this! 😉💖`;
  }

  function showVoucher(giftKey) {
    if (!voucherBox) return;

    const reactions = window.birthdayMessages?.page3?.giftReactions || {};
    const data = reactions[giftKey] || {
      title: `🎁 ${giftKey.toUpperCase()} Claimed!`,
      message: `Your choice has been recorded! Sauhardya is officially on duty to fulfill this wish!`
    };

    if (voucherTitle) voucherTitle.innerText = data.title;
    if (voucherText) voucherText.innerText = data.message;
    if (voucherMeta) {
      const recipient = window.birthdayMessages?.recipient?.nickname || "Shuju";
      voucherMeta.innerHTML = `COUPON: <b>BDAY21-${recipient.toUpperCase()}</b> • ISSUED FOR: <b>${recipient}</b> • GUARANTEED BY: <b>Cousin Sauhardya</b>`;
    }

    // Configure Direct Notification Links (Telegram & WhatsApp)
    const claimMsg = generateClaimText(giftKey);
    const encodedMsg = encodeURIComponent(claimMsg);
    const notif = window.birthdayMessages?.notification || {};

    const telegramBtn = document.getElementById('telegramShareBtn');
    if (telegramBtn) {
      if (notif.telegramUsername && notif.telegramUsername.trim()) {
        const cleanUser = notif.telegramUsername.replace('@', '').trim();
        telegramBtn.href = `https://t.me/${cleanUser}?text=${encodedMsg}`;
      } else {
        telegramBtn.href = `https://t.me/share/url?url=&text=${encodedMsg}`;
      }
    }

    const whatsappBtn = document.getElementById('whatsappShareBtn');
    if (whatsappBtn) {
      if (notif.whatsappNumber && notif.whatsappNumber.trim()) {
        const cleanNum = notif.whatsappNumber.replace(/[^0-9]/g, '').trim();
        whatsappBtn.href = `https://wa.me/${cleanNum}?text=${encodedMsg}`;
      } else {
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodedMsg}`;
      }
    }

    // Send silent background webhook if configured
    sendSilentWebhook(giftKey, data.title);

    voucherBox.style.display = 'block';
    voucherBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function sendSilentWebhook(giftKey, giftTitle) {
    const webhookUrl = window.birthdayMessages?.notification?.webhookUrl;
    if (webhookUrl && webhookUrl.trim().startsWith('http')) {
      try {
        fetch(webhookUrl.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            recipient: window.birthdayMessages?.recipient?.name || "Sreeja",
            nickname: window.birthdayMessages?.recipient?.nickname || "Shuju",
            selectedGift: giftTitle || giftKey,
            date: new Date().toLocaleString(),
            source: "Sreeja 21st Birthday Website"
          })
        }).catch(err => console.log('Webhook dispatched'));
      } catch (e) {}
    }
  }

  window.recordGiftSent = function(channel) {
    giftDispatched = true;
    if (window.soundFx) window.soundFx.playPop();
  };

  window.copyGiftVoucher = function() {
    if (!selectedGiftKey) return;
    const text = generateClaimText(selectedGiftKey);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        const btnText = document.getElementById('copyBtnText');
        if (btnText) {
          btnText.innerText = "✓ Copied to Clipboard!";
          setTimeout(() => btnText.innerText = "Copy Claim Code", 2500);
        }
      });
    }
    if (window.soundFx) window.soundFx.playPop();
  };

  window.proceedFromGifts = function(targetPage) {
    if (!selectedGiftKey) {
      alert("Pick any 1 gift first from the menu, Shuju! 🎁😉");
      return;
    }

    // If she hasn't sent it via Telegram yet, give a cute reminder modal
    if (!giftDispatched) {
      const modal = document.getElementById('giftModal');
      const modalGift = document.getElementById('modalChosenGift');
      const modalTelegram = document.getElementById('modalTelegramBtn');
      const claimMsg = generateClaimText(selectedGiftKey);
      const notif = window.birthdayMessages?.notification || {};

      if (modal && modalGift) {
        const reactions = window.birthdayMessages?.page3?.giftReactions || {};
        modalGift.innerText = reactions[selectedGiftKey]?.title || selectedGiftKey.toUpperCase();
        
        if (modalTelegram) {
          if (notif.telegramUsername && notif.telegramUsername.trim()) {
            const cleanUser = notif.telegramUsername.replace('@', '').trim();
            modalTelegram.href = `https://t.me/${cleanUser}?text=${encodeURIComponent(claimMsg)}`;
          } else {
            modalTelegram.href = `https://t.me/share/url?url=&text=${encodeURIComponent(claimMsg)}`;
          }
        }

        modal.classList.add('active');
        if (window.soundFx) window.soundFx.playPop();
        return;
      }
    }

    goToPage(targetPage);
  };

  window.closeModalAndProceed = function(targetPage) {
    const modal = document.getElementById('giftModal');
    if (modal) modal.classList.remove('active');
    giftDispatched = true;
    goToPage(targetPage);
  };

  // ============================================================================
  // 6. PAGE 5: PLAYABLE BIRTHDAY DRUM KIT
  // ============================================================================
  window.playDrum = function(drumType, event) {
    if (window.soundFx) {
      if (drumType === 'kick') window.soundFx.playKick();
      else if (drumType === 'snare') window.soundFx.playSnare();
      else if (drumType === 'tom') window.soundFx.playTom();
      else if (drumType === 'cymbal') {
        window.soundFx.playCymbal();
        if (window.confetti) window.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 25);
      }
    }

    // Visual hit animation
    if (event && event.currentTarget) {
      const pad = event.currentTarget;
      pad.classList.add('hit');
      setTimeout(() => pad.classList.remove('hit'), 120);

      // Spawn floating musical note
      spawnFloatingNote(event.clientX, event.clientY);
    }
  };

  window.playDrumRoll = function(event) {
    if (event && event.currentTarget) {
      const btn = event.currentTarget;
      btn.style.transform = 'scale(0.96)';
      setTimeout(() => btn.style.transform = '', 200);
      spawnFloatingNote(event.clientX, event.clientY);
    }
    if (window.soundFx) {
      window.soundFx.playDrumroll(() => {
        if (window.confetti) window.confetti.cannon();
      });
    }
  };

  function spawnFloatingNote(x, y) {
    const notes = ['🎵', '🎶', '🥁', '✨', '⚡', '💖'];
    const note = document.createElement('div');
    note.className = 'flying-note';
    note.innerText = notes[Math.floor(Math.random() * notes.length)];
    const posX = x !== undefined && x > 0 ? x : window.innerWidth / 2;
    const posY = y !== undefined && y > 0 ? y : window.innerHeight / 2;
    note.style.left = `${posX - 12}px`;
    note.style.top = `${posY - 20}px`;
    note.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 800);
  }

  // Keyboard controls for drums when on Page 5
  document.addEventListener('keydown', (e) => {
    if (currentPage === 5) {
      const key = e.key.toLowerCase();
      if (key === 'b' || key === '1') window.playDrum('kick');
      else if (key === 's' || key === '2') window.playDrum('snare');
      else if (key === 't' || key === '3') window.playDrum('tom');
      else if (key === 'c' || key === '4') window.playDrum('cymbal');
      else if (key === ' ') window.playDrumRoll();
    }
  });

  // ============================================================================
  // 7. BACKGROUND MUSIC AUTOPLAY & CONTINUOUS LOOP
  // ============================================================================
  function startAutoMusic() {
    if (window.soundFx && !window.soundFx.isPlayingMusic) {
      window.soundFx.startBirthdayMelody();
      if (musicToggle) {
        musicToggle.classList.add('active');
        musicToggle.innerHTML = '<span>🎵</span><span>Music: Playing</span>';
      }
    }
  }

  // Attempt to start immediately
  startAutoMusic();

  // Browser Autoplay Policy: resume/start audio on first user gesture anywhere
  const unlockAudio = () => {
    startAutoMusic();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });

  if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.soundFx) {
        const isPlaying = window.soundFx.toggleMusic();
        if (isPlaying) {
          musicToggle.classList.add('active');
          musicToggle.innerHTML = '<span>🎵</span><span>Music: Playing</span>';
        } else {
          musicToggle.classList.remove('active');
          musicToggle.innerHTML = '<span>🎵</span><span>Music: Off</span>';
        }
      }
    });
  }

  // Initialize
  loadMessages();
  goToPage(1);
  initAssetPreloader();
});
