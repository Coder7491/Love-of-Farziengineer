/**
 * Love of Farzi Engineer: Akash ❤️ Sweety
 * Interactive Web Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initLiveCounters();
  initStoryline();
  initQuiz();
  initTerminal();
  initSignaturePads();
  initAgreementActions();
  initLoveCapsuleModal();
  initProposalArena();
  initAudioSynthesizer();
  initScrollReveal();
});

/* ==========================================================================
   1. PARTICLE CANVAS (Ultra-Smooth 60 FPS Romantic Floating Wonderland)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const heartEmojis = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝', '✨', '🌹'];
  const romanticColors = [
    '#ff1744',
    '#ff2a70',
    '#f43f5e',
    '#ec4899',
    '#fb7185',
    '#a855f7',
    '#fda4af'
  ];

  // Helper to trace clean heart
  function traceHeart(c, size) {
    const s = size * 0.5;
    c.beginPath();
    c.moveTo(0, -s * 0.35);
    c.bezierCurveTo(-s * 0.6, -s * 1.15, -s * 1.35, -s * 0.45, -s * 1.35, s * 0.15);
    c.bezierCurveTo(-s * 1.35, s * 0.75, -s * 0.3, s * 1.25, 0, s * 1.55);
    c.bezierCurveTo(s * 0.3, s * 1.25, s * 1.35, s * 0.75, s * 1.35, s * 0.15);
    c.bezierCurveTo(s * 1.35, -s * 0.45, s * 0.6, -s * 1.15, 0, -s * 0.35);
    c.closePath();
  }

  // PRE-RENDER SPRITES (Zero CPU allocations during 60 FPS animation loop)
  const SPRITE_SIZE = 64;
  const vectorSprites = {};
  romanticColors.forEach(color => {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = SPRITE_SIZE;
    sCanvas.height = SPRITE_SIZE;
    const sCtx = sCanvas.getContext('2d');

    // Soft romantic radial glow
    const grad = sCtx.createRadialGradient(SPRITE_SIZE / 2, SPRITE_SIZE * 0.42, 2, SPRITE_SIZE / 2, SPRITE_SIZE * 0.42, SPRITE_SIZE * 0.46);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    sCtx.fillStyle = grad;
    sCtx.beginPath();
    sCtx.arc(SPRITE_SIZE / 2, SPRITE_SIZE * 0.42, SPRITE_SIZE * 0.46, 0, Math.PI * 2);
    sCtx.fill();

    // Sharp vector heart core
    sCtx.save();
    sCtx.translate(SPRITE_SIZE / 2, SPRITE_SIZE * 0.38);
    traceHeart(sCtx, SPRITE_SIZE * 0.42);
    sCtx.fillStyle = color;
    sCtx.fill();
    sCtx.restore();

    vectorSprites[color] = sCanvas;
  });

  const emojiSprites = {};
  heartEmojis.forEach(symbol => {
    const sCanvas = document.createElement('canvas');
    sCanvas.width = SPRITE_SIZE;
    sCanvas.height = SPRITE_SIZE;
    const sCtx = sCanvas.getContext('2d');

    sCtx.font = `${Math.round(SPRITE_SIZE * 0.52)}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    sCtx.textAlign = 'center';
    sCtx.textBaseline = 'middle';
    sCtx.fillText(symbol, SPRITE_SIZE / 2, SPRITE_SIZE / 2 + 2);

    emojiSprites[symbol] = sCanvas;
  });

  const persistentHearts = [];
  const burstHearts = [];
  const isMobile = window.innerWidth < 768;
  const targetCount = isMobile ? 18 : 28; // Clean, high FPS count

  function createHeart(startY = null) {
    const isEmoji = Math.random() < 0.42;
    const size = Math.random() * (isMobile ? 18 : 26) + (isEmoji ? 16 : 14);
    const color = romanticColors[Math.floor(Math.random() * romanticColors.length)];
    const depth = Math.random();

    return {
      x: Math.random() * width,
      y: startY !== null ? startY : Math.random() * height,
      size: size * (0.8 + depth * 0.4),
      baseScale: 1,
      // Fast, brisk, energetic upward floating speed
      speedY: (2.2 + depth * 2.8) * (isMobile ? 1.0 : 1.25),
      swayAmount: Math.random() * 1.5 + 0.6,
      swaySpeed: Math.random() * 0.05 + 0.03,
      swayPhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.09 + 0.05,
      pulsePhase: Math.random() * Math.PI * 2,
      rotation: (Math.random() - 0.5) * 0.4,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      opacity: (Math.random() * 0.35 + 0.4) * (0.6 + depth * 0.4),
      isEmoji: isEmoji,
      symbol: isEmoji ? heartEmojis[Math.floor(Math.random() * heartEmojis.length)] : null,
      color: color
    };
  }

  for (let i = 0; i < targetCount; i++) {
    persistentHearts.push(createHeart());
  }

  // Interactive Burst (Pointer Click / Tap)
  function spawnHeartBurst(originX, originY, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 9.0 + 4.5;
      const isEmoji = Math.random() < 0.6;
      const color = romanticColors[Math.floor(Math.random() * romanticColors.length)];
      burstHearts.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 4.0 + 2.0),
        size: Math.random() * 16 + 12,
        rotation: (Math.random() - 0.5) * 0.6,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        alpha: 1.0,
        decay: Math.random() * 0.032 + 0.024, // Fast clean fade
        isEmoji: isEmoji,
        symbol: isEmoji ? heartEmojis[Math.floor(Math.random() * heartEmojis.length)] : null,
        color: color
      });
    }
  }

  // Snappy Fast Romantic Shower ("Dil Barsao")
  function showerManyHearts(count = 30) {
    const burstCount = isMobile ? Math.min(count, 20) : count;
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        const isEmoji = Math.random() < 0.65;
        const color = romanticColors[Math.floor(Math.random() * romanticColors.length)];
        burstHearts.push({
          x: Math.random() * width,
          y: -25,
          vx: (Math.random() - 0.5) * 2.5,
          vy: Math.random() * 5.5 + 4.0, // Brisk downward speed
          size: Math.random() * 20 + 14,
          rotation: (Math.random() - 0.5) * 0.5,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          alpha: 1.0,
          decay: Math.random() * 0.022 + 0.016, // Snappy fade
          isEmoji: isEmoji,
          symbol: isEmoji ? heartEmojis[Math.floor(Math.random() * heartEmojis.length)] : null,
          color: color
        });
      }, i * 14);
    }
  }

  window.spawnHeartBurst = spawnHeartBurst;
  window.showerManyHearts = showerManyHearts;

  // Pointer Down Burst
  window.addEventListener('pointerdown', (e) => {
    const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'button' || targetTag === 'a') return;
    spawnHeartBurst(e.clientX, e.clientY, isMobile ? 8 : 12);
  });

  // Dock Button: "Dil Barsao"
  const heartRainBtn = document.getElementById('heartRainBtn');
  if (heartRainBtn) {
    heartRainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showerManyHearts(32);
      showToast("Dher Saare Pyar Ke Dil Baras Rahe Hain! 💖✨");
      if (typeof playSoundEffect === 'function') {
        playSoundEffect('success');
      }
    });
  }

  // High-Speed Butter-Smooth Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    // 1. Persistent Floating Hearts
    for (let p of persistentHearts) {
      p.y -= p.speedY;
      p.swayPhase += p.swaySpeed;
      p.x += Math.sin(p.swayPhase) * p.swayAmount;
      p.pulsePhase += p.pulseSpeed;
      p.rotation += p.rotSpeed;

      // Recycle to bottom
      if (p.y < -50) {
        p.y = height + Math.random() * 30 + 10;
        p.x = Math.random() * width;
        p.speedY = (2.2 + Math.random() * 2.8) * (isMobile ? 1.0 : 1.25);
      }

      const drawSize = p.size * (1 + Math.sin(p.pulsePhase) * 0.12);
      const sprite = p.isEmoji ? emojiSprites[p.symbol] : vectorSprites[p.color];

      if (sprite) {
        ctx.save();
        ctx.translate(p.x, p.y);
        if (p.rotation) ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(sprite, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        ctx.restore();
      }
    }

    // 2. Dynamic Burst / Shower Hearts
    for (let i = burstHearts.length - 1; i >= 0; i--) {
      const b = burstHearts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.98;
      b.vy += 0.16;
      b.alpha -= b.decay;
      b.rotation += b.rotSpeed;

      if (b.alpha <= 0 || b.y > height + 50) {
        burstHearts.splice(i, 1);
        continue;
      }

      const sprite = b.isEmoji ? emojiSprites[b.symbol] : vectorSprites[b.color];
      if (sprite) {
        ctx.save();
        ctx.translate(b.x, b.y);
        if (b.rotation) ctx.rotate(b.rotation);
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.drawImage(sprite, -b.size / 2, -b.size / 2, b.size, b.size);
        ctx.restore();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. LIVE RELATIONSHIP CLOCK / MILESTONES
   - First Meetup: 11 June 2025
   - Sweety's Proposal: 19 June 2025
   ========================================================================== */
function initLiveCounters() {
  const meetDate = new Date('2025-06-11T00:00:00');
  const propDate = new Date('2025-06-19T00:00:00');

  function updateTimers() {
    const now = new Date();

    // Meetup Timer
    const meetDiff = now - meetDate;
    if (meetDiff > 0) {
      const days = Math.floor(meetDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((meetDiff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((meetDiff / (1000 * 60)) % 60);
      const secs = Math.floor((meetDiff / 1000) % 60);

      document.getElementById('meetDays').textContent = days;
      document.getElementById('meetHours').textContent = String(hours).padStart(2, '0');
      document.getElementById('meetMins').textContent = String(mins).padStart(2, '0');
      document.getElementById('meetSecs').textContent = String(secs).padStart(2, '0');
    }

    // Proposal Timer
    const propDiff = now - propDate;
    if (propDiff > 0) {
      const pDays = Math.floor(propDiff / (1000 * 60 * 60 * 24));
      const pHours = Math.floor((propDiff / (1000 * 60)) % 24);
      const pMins = Math.floor((propDiff / (1000 * 60)) % 60);
      const pSecs = Math.floor((propDiff / 1000) % 60);

      document.getElementById('propDays').textContent = pDays;
      document.getElementById('propHours').textContent = String(pHours).padStart(2, '0');
      document.getElementById('propMins').textContent = String(pMins).padStart(2, '0');
      document.getElementById('propSecs').textContent = String(pSecs).padStart(2, '0');
    }
  }

  updateTimers();
  setInterval(updateTimers, 1000);
}

/* ==========================================================================
   3. STORIABLE (Timeline Chapters Navigation)
   ========================================================================== */
function initStoryline() {
  const tabs = document.querySelectorAll('.story-tab');
  const chapters = document.querySelectorAll('.story-chapter');
  const prevBtn = document.getElementById('prevChapterBtn');
  const nextBtn = document.getElementById('nextChapterBtn');
  const counterSpan = document.getElementById('currentChapterNum');
  const totalChapters = 5;
  let activeIndex = 1;

  function setChapter(index) {
    if (index < 1 || index > totalChapters) return;
    activeIndex = index;

    tabs.forEach(tab => {
      const tabChap = parseInt(tab.getAttribute('data-chapter'), 10);
      tab.classList.toggle('active', tabChap === activeIndex);
    });

    chapters.forEach((chap, idx) => {
      chap.classList.toggle('active', idx + 1 === activeIndex);
    });

    counterSpan.textContent = activeIndex;
    prevBtn.disabled = activeIndex === 1;
    nextBtn.disabled = activeIndex === totalChapters;

    playSoundEffect('pop');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const chap = parseInt(tab.getAttribute('data-chapter'), 10);
      setChapter(chap);
    });
  });

  prevBtn.addEventListener('click', () => setChapter(activeIndex - 1));
  nextBtn.addEventListener('click', () => setChapter(activeIndex + 1));

  // Hero section buttons
  const startStoryBtn = document.getElementById('startStoryBtn');
  if (startStoryBtn) {
    startStoryBtn.addEventListener('click', () => {
      document.getElementById('storyline').scrollIntoView({ behavior: 'smooth' });
      setChapter(1);
    });
  }

  const openQuizBtn = document.getElementById('openQuizBtn');
  if (openQuizBtn) {
    openQuizBtn.addEventListener('click', () => {
      document.getElementById('quizSection').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const scrollToStoryBtn = document.getElementById('scrollToStoryBtn');
  if (scrollToStoryBtn) {
    scrollToStoryBtn.addEventListener('click', () => {
      document.getElementById('storyline').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   4. FARZI ENGINEER LOVE QUIZ
   ========================================================================== */
const QUIZ_QUESTIONS = [
  {
    title: "11 June 2025 ko jab Akash aur Sweety pehli baar mile, tab Akash ki condition kya thi?",
    context: "Pehli mulaqat ka historical recap!",
    options: [
      { text: "Akash full chill tha, code discuss kar raha tha", correct: false },
      { text: "Akash ka heart rate 200 BPM tha, nervous glasses set kar raha tha aur full fida ho gaya!", correct: true },
      { text: "Akash coffee peena bhool gaya tha aur so gaya tha", correct: false },
      { text: "Dono ne coding interview liya ek doosre ka", correct: false }
    ],
    explanation: "Sahi jawab! Akash ne Sweety ko dekhte hi apne dimaag ke saare tech words bhula diye aur bas Sweety ki smile dekhta reh gaya!"
  },
  {
    title: "19 June 2025 ko historic proposal kisne kiya?",
    context: "The legendary pull request!",
    options: [
      { text: "Akash ne 10-page ka PowerPoint presentation de kar", correct: false },
      { text: "Kisi third party friend ne match karwaya", correct: false },
      { text: "Boss Lady Sweety ne direct swag se propose karke Akash ki single life terminate kar di! 💍", correct: true },
      { text: "ChatGPT ne proposal email bheja", correct: false }
    ],
    explanation: "Bilkul sahi! Akash toh sochte sochte saal nikaal deta, isliye Sweety ne 19 June ko boss ban ke direct propose kiya aur Akash ne instantly accept kar liya!"
  },
  {
    title: "Akash ka favorite notification sound kya hai?",
    context: "Engineering life vs Dil ki baat!",
    options: [
      { text: "'Salary Credited to Account'", correct: false },
      { text: "'GitHub: Build Passed Successfully'", correct: false },
      { text: "Sweety ka WhatsApp message ya incoming phone call! 🔔❤️", correct: true },
      { text: "Zomato delivery partner arrived", correct: false }
    ],
    explanation: "Aur kya! Code build pass hone se bhi 1000 guna zyada dopamine Sweety ke 'Hi Baby' message se milta hai!"
  },
  {
    title: "Agar Akash boley 'Baby bas 2 minute me call karta hu', toh reality kya hoti hai?",
    context: "Classic Farzi Engineer excuse!",
    options: [
      { text: "Sach me exactly 2 minute", correct: false },
      { text: "Minimum 45 minute + Sweety ka warning message! 😤", correct: true },
      { text: "1 microsecond", correct: false },
      { text: "Vo laptop par hi so gaya", correct: false }
    ],
    explanation: "Haha 100% correct! Farzi engineer ka 2 minute hamesha 45 minute hota hai, par Sweety ke gussa hote hi Akash sorry bolke haazir ho jata hai!"
  },
  {
    title: "Sweety ke bina Akash ka server status kya hota hai?",
    context: "System Health Check!",
    options: [
      { text: "Error 404: Happiness Not Found", correct: false },
      { text: "Error 500: Internal Heart Crash", correct: false },
      { text: "Error 403: Life Forbidden Without Sweety", correct: false },
      { text: "All of the above! (Pura system down ho jata hai!)", correct: true }
    ],
    explanation: "Spot on! Sweety hi Akash ke server ki main cooling fan aur power supply hai!"
  },
  {
    title: "Is relationship ka permanent license kis authority ne issue kiya hai?",
    context: "Final verification question!",
    options: [
      { text: "Sweety's Heart Authority (Lifetime validity, Non-transferable, Non-refundable!) 💖", correct: true },
      { text: "Stack Overflow Foundation", correct: false },
      { text: "Department of Farzi Engineers", correct: false },
      { text: "Nobody knows", correct: false }
    ],
    explanation: "Mubarak ho! Sweety ke dil ne Akash ko permanent lifetime license allot kar diya hai!"
  }
];

function initQuiz() {
  let currentIdx = 0;
  let score = 0;
  let answered = false;

  const card = document.getElementById('quizCard');
  const resultCard = document.getElementById('quizResultCard');
  const titleEl = document.getElementById('quizQuestionText');
  const contextEl = document.getElementById('quizQuestionContext');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackText = document.getElementById('feedbackText');
  const nextBtn = document.getElementById('quizNextBtn');
  const counterText = document.getElementById('quizQuestionCounter');
  const currentScoreEl = document.getElementById('currentScore');
  const progressBar = document.getElementById('quizProgressBar');
  const retakeBtn = document.getElementById('retakeQuizBtn');

  function renderQuestion() {
    answered = false;
    const q = QUIZ_QUESTIONS[currentIdx];
    titleEl.textContent = q.title;
    contextEl.textContent = q.context;
    counterText.textContent = `Question ${currentIdx + 1} of ${QUIZ_QUESTIONS.length}`;
    progressBar.style.width = `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`;

    feedbackBox.classList.add('hidden');
    feedbackBox.className = 'quiz-feedback-box hidden';
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="option-prefix">${letters[idx]}</span> <span>${opt.text}</span>`;
      btn.addEventListener('click', () => handleSelectOption(opt, btn));
      optionsContainer.appendChild(btn);
    });
  }

  function handleSelectOption(option, clickedBtn) {
    if (answered) return;
    answered = true;

    const q = QUIZ_QUESTIONS[currentIdx];
    const allButtons = optionsContainer.querySelectorAll('.quiz-option-btn');
    allButtons.forEach(btn => (btn.disabled = true));

    feedbackBox.classList.remove('hidden');

    if (option.correct) {
      score++;
      currentScoreEl.textContent = score;
      clickedBtn.classList.add('correct');
      feedbackBox.classList.add('correct-box');
      feedbackIcon.innerHTML = '🎉';
      feedbackText.innerHTML = `<strong>Mast Jawab!</strong> ${q.explanation}`;
      playSoundEffect('chime');
    } else {
      clickedBtn.classList.add('wrong');
      feedbackBox.classList.add('wrong-box');
      feedbackIcon.innerHTML = '😅';
      // highlight correct one
      allButtons.forEach((btn, idx) => {
        if (q.options[idx].correct) btn.classList.add('correct');
      });
      feedbackText.innerHTML = `<strong>Aree re!</strong> ${q.explanation}`;
      playSoundEffect('buzzer');
    }

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      nextBtn.classList.remove('hidden');
      nextBtn.innerHTML = `Agla Sawaal <i class="fa-solid fa-arrow-right"></i>`;
    } else {
      nextBtn.classList.remove('hidden');
      nextBtn.innerHTML = `Final Score Dekho <i class="fa-solid fa-trophy"></i>`;
    }
  }

  nextBtn.addEventListener('click', () => {
    playSoundEffect('pop');
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      currentIdx++;
      renderQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    card.classList.add('hidden');
    resultCard.classList.remove('hidden');
    document.getElementById('finalPoints').textContent = `${score}/${QUIZ_QUESTIONS.length}`;

    const comm = document.getElementById('resultCommentary');
    if (score === 6) {
      comm.textContent = "Outstanding 100%! Aap Akash aur Sweety ke dil ke expert coder ho! Sweety ka 19 June wala proposal officially masterclass hai!";
      triggerConfetti();
    } else if (score >= 4) {
      comm.textContent = "Superb! Aap Akash aur Sweety ki love story ko bohot acche se jaante ho. Farzi engineer bhi impress ho gaya!";
    } else {
      comm.textContent = "Acha koshish! Ek baar upar ki kahani dobara padh lo, 11 June aur 19 June ke romantic kisse dil chhu lenge!";
    }
    playSoundEffect('fanfare');
  }

  retakeBtn.addEventListener('click', () => {
    currentIdx = 0;
    score = 0;
    currentScoreEl.textContent = '0';
    resultCard.classList.add('hidden');
    card.classList.remove('hidden');
    renderQuestion();
    playSoundEffect('pop');
  });

  renderQuestion();
}

/* ==========================================================================
   5. SECRET LOVE TERMINAL
   ========================================================================== */
function initTerminal() {
  const form = document.getElementById('terminalForm');
  const input = document.getElementById('terminalInput');
  const output = document.getElementById('terminalOutput');
  const pillButtons = document.querySelectorAll('.t-pill-btn');

  const COMMANDS = {
    help: `
Available Secret Love Commands:
  • <span class="cmd-highlight">meetup</span>        - Akash aur Sweety ki pehli mulaqat (11 June 2025)
  • <span class="cmd-highlight">proposal</span>      - Sweety ka legendary proposal (19 June 2025)
  • <span class="cmd-highlight">sweety</span>        - Who is Sweety? (Akash's perspective)
  • <span class="cmd-highlight">akash</span>         - Farzi Engineer bio & habits
  • <span class="cmd-highlight">reasons</span>       - 10 Reasons why Akash loves Sweety
  • <span class="cmd-highlight">apology</span>       - Farzi Engineer's Standard Apology Script
  • <span class="cmd-highlight">coffee</span>        - Brew virtual warm coffee for Sweety ☕
  • <span class="cmd-highlight">secret</span>        - Top secret diary note
  • <span class="cmd-highlight">clear</span>         - Clear the screen
    `,
    meetup: `
📅 <strong>11 June 2025: The First Meetup</strong>
Venue: Cozy Cafe (Delhi Brew vibes)
Status: Akash entered wearing geek glasses, pretending to know tech.
Result: Sweety smiled -> Akash's CPU usage spiked to 100%!
Log: "Stack Overflow has solutions for everything, except how to stop staring at Sweety."
    `,
    proposal: `
💍 <strong>19 June 2025: Sweety's Masterstroke Proposal!</strong>
Author: Sweety (The Boss)
Commit: "Terminate Akash's single life with immediate effect!"
Akash's Reaction: Jaw dropped, eyes sparkling, said YES in 0.001 milliseconds!
Status: Merged directly to Master branch with lifetime protection!
    `,
    sweety: `
👑 <strong>Entity Profile: SWEETY</strong>
Role: Akash's Life Administrator & Ultimate Bug Fixer
Superpowers: 
  - Making Akash smile in 1 second
  - Looking gorgeous in everything she wears
  - Turning Akash's boring code into romantic poetry
Status: Universally loved and protected forever!
    `,
    akash: `
👨‍💻 <strong>Entity Profile: AKASH</strong>
Designation: Farzi Engineer (Sweety's Personal Coder)
Weaknesses: 
  - Sweety's eyes
  - Sweety's cute angry voice
  - Semicolons in code
Strengths: Loves Sweety unconditionally 24x7x365!
    `,
    reasons: `
💖 <strong>10 Reasons Why Akash Loves Sweety:</strong>
 1. Sweety ki pyaari si smile.
 2. 19 June ko usne courage se propose kiya!
 3. Akash ke boring jokes par bhi hasna.
 4. Gusse me bhi khana khane ki chinta karna.
 5. Akash ke har dream ko support karna.
 6. Uska sweet and caring nature.
 7. Uske sath ghanto baat karna bhi 5 min jaisa lagna.
 8. Pure dil ki saaf hona.
 9. Akash ko best version banane me help karna.
 10. Bas Sweety hona! ❤️
    `,
    apology: `
🤖 <strong>Farzi Engineer Apology Generator:</strong>
"Dear Sweety Baby,
Maine mana 'Bas 2 min me call karta hu' bolkar late kiya,
Par sach keh raha hu intentions me koi bug nahi tha!
Chocolates, hugs aur hazaaron sorry aapki seva me haazir hain!
Please gussa mat ho meri pyari Sweety! 🥺❤️"
    `,
    coffee: `
        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> === [ SWEETY'S SPECIAL COFFEE ]
        |             |/ )  Brewed with 100% Love & Extra Sugar!
        |    AKASH    | /   Enjoy with Akash! ☕❤️
        |   +SWEETY   |/
        |_____________|
    `,
    secret: `
🤫 <strong>Akash's Secret Log [ENCRYPTED]:</strong>
"Sweety, tum mere liye sirf meri girlfriend nahi ho, tum meri zindagi ka sukoon ho.
Jab bhi duniya difficult lagti hai, tumhara ek text meri poori thakan mita deta hai.
I will always choose you, every single day!"
    `
  };

  function executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Echo input
    const inputLine = document.createElement('div');
    inputLine.className = 't-line prompt-line';
    inputLine.innerHTML = `<span class="t-prompt">akash@sweety:~$</span> <span class="t-static">${escapeHtml(cmd)}</span>`;
    output.appendChild(inputLine);

    if (cmd === 'clear') {
      output.innerHTML = `
        <div class="t-line info-line">Terminal cleared. Type 'help' for available commands.</div>
      `;
      playSoundEffect('terminal');
      return;
    }

    const response = COMMANDS[cmd] || `
      <span style="color: #ef4444;">bash: command not found: '${escapeHtml(cmd)}'. Type 'help' to see list of valid commands.</span>
    `;

    const outLine = document.createElement('div');
    outLine.className = cmd === 'coffee' ? 't-line output-line ascii' : 't-line output-line';
    outLine.innerHTML = response;
    output.appendChild(outLine);

    output.scrollTop = output.scrollHeight;
    playSoundEffect('terminal');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    executeCommand(val);
    input.value = '';
  });

  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.getAttribute('data-cmd');
      executeCommand(c);
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ==========================================================================
   6. OFFICIAL LOVE AGREEMENT & SIGNATURE PADS
   ========================================================================== */
function initSignaturePads() {
  // Pre-draw Akash Signature on Canvas
  const canvasAkash = document.getElementById('sigCanvasAkash');
  if (canvasAkash) {
    const ctxA = canvasAkash.getContext('2d');
    const sigImg = new Image();
    sigImg.src = 'assets/akash_signature.png';
    const renderSig = () => {
      ctxA.clearRect(0, 0, canvasAkash.width, canvasAkash.height);
      const aspect = sigImg.width / sigImg.height;
      const drawHeight = 72;
      const drawWidth = drawHeight * aspect;
      const drawX = (canvasAkash.width - drawWidth) / 2;
      const drawY = (canvasAkash.height - drawHeight) / 2;
      ctxA.drawImage(sigImg, drawX, drawY, drawWidth, drawHeight);
    };
    if (sigImg.complete) {
      renderSig();
    } else {
      sigImg.onload = renderSig;
    }
  }

  // Sweety Interactive Drawing Canvas & Real Signature
  const canvasSweety = document.getElementById('sigCanvasSweety');
  const sweetySigImg = document.getElementById('sweetySigImg');
  const sweetyStamp = document.getElementById('sweetyStamp');
  const placeholder = document.getElementById('sweetySigPlaceholder');
  const clearBtn = document.getElementById('clearSweetySig');
  const autoSignBtn = document.getElementById('autoSignSweety');

  if (canvasSweety) {
    const ctxS = canvasSweety.getContext('2d');
    let isDrawing = false;
    let hasDrawn = false;

    const sigImgS = new Image();
    sigImgS.src = 'assets/sweety_signature.png';
    const renderSweetyCanvas = () => {
      ctxS.clearRect(0, 0, canvasSweety.width, canvasSweety.height);
      const aspect = sigImgS.width / sigImgS.height;
      const drawHeight = 56;
      const drawWidth = drawHeight * aspect;
      const drawX = (canvasSweety.width - drawWidth) / 2;
      const drawY = (canvasSweety.height - drawHeight) / 2;
      ctxS.drawImage(sigImgS, drawX, drawY, drawWidth, drawHeight);
    };
    if (sigImgS.complete) renderSweetyCanvas();
    else sigImgS.onload = renderSweetyCanvas;

    function getCoords(e) {
      const rect = canvasSweety.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function startDraw(e) {
      isDrawing = true;
      hasDrawn = true;
      if (placeholder) placeholder.style.display = 'none';
      const pos = getCoords(e);
      ctxS.beginPath();
      ctxS.moveTo(pos.x, pos.y);
      ctxS.strokeStyle = "#be185d";
      ctxS.lineWidth = 2.5;
      ctxS.lineCap = "round";
    }

    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getCoords(e);
      ctxS.lineTo(pos.x, pos.y);
      ctxS.stroke();
    }

    function stopDraw() {
      isDrawing = false;
    }

    canvasSweety.addEventListener('mousedown', startDraw);
    canvasSweety.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    canvasSweety.addEventListener('touchstart', startDraw, { passive: false });
    canvasSweety.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDraw);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (sweetySigImg) sweetySigImg.style.display = 'none';
        if (sweetyStamp) sweetyStamp.style.display = 'none';
        canvasSweety.style.display = 'block';
        ctxS.clearRect(0, 0, canvasSweety.width, canvasSweety.height);
        if (placeholder) placeholder.style.display = 'block';
        hasDrawn = false;
        playSoundEffect('pop');
        showToast("Draw mode active: Sweety can now sign on the screen! ✍️");
      });
    }

    if (autoSignBtn) {
      autoSignBtn.addEventListener('click', () => {
        if (sweetySigImg) sweetySigImg.style.display = 'block';
        if (sweetyStamp) sweetyStamp.style.display = 'block';
        canvasSweety.style.display = 'none';
        if (placeholder) placeholder.style.display = 'none';
        renderSweetyCanvas();
        playSoundEffect('chime');
        showToast("Sweety Srivastav real signature applied! 💖");
      });
    }
  }
}

function initAgreementActions() {
  const printBtn = document.getElementById('downloadAgreementBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const originalTitle = document.title;
      document.title = "Akash_and_Sweety_Official_Love_Agreement";
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1500);
    });
  }

  const copyShareBtn = document.getElementById('copyShareBtn');
  if (copyShareBtn) {
    copyShareBtn.addEventListener('click', () => {
      const pledge = `❤️ Akash & Sweety Love Pledge:
11 June 2025 ko pehli mulaqat hui, 19 June 2025 ko Sweety ne propose kiya!
Clause 1.0: Sweety holds 100% Admin Rights on Akash's Heart forever!
No bugs allowed, only infinite love! 💖`;
      navigator.clipboard.writeText(pledge).then(() => {
        showToast("Love pledge copied to clipboard! Share it with Sweety! 💖");
        playSoundEffect('chime');
      });
    });
  }
}

/* ==========================================================================
   7. SECRET LOVE LETTER MODAL
   ========================================================================== */
function initLoveCapsuleModal() {
  const openBtn = document.getElementById('openLetterBtn');
  const closeBtn = document.getElementById('closeLetterBtn');
  const modal = document.getElementById('letterModal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      playSoundEffect('chime');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      playSoundEffect('pop');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
}

/* ==========================================================================
   8. INTERACTIVE PROPOSAL ARENA (RUNAWAY "NO" BUTTON & CELEBRATION "YES")
   ========================================================================== */
function initProposalArena() {
  const yesBtn = document.getElementById('yesLoveBtn');
  const noBtn = document.getElementById('noLoveBtn');
  const arena = document.getElementById('btnArena');
  const celebration = document.getElementById('celebrationScreen');
  const closeCelebrationBtn = document.getElementById('closeCelebrationBtn');
  const hintEl = document.getElementById('runawayHint');

  const runawayMessages = [
    "Error 404: Option Not Found! 😜",
    "Sweety, try again! Hehe 🏃‍♂️",
    "Akash won't allow NO! 💕",
    "Permission Denied by Sweety's Heart! 🙅‍♀️",
    "Are you sure? Click YES baby! 🥺",
    "Button deprecated by Farzi Engineer! 💻",
    "Sweety, system crash: Only YES supported! 💖",
    "Access Restricted: Love is mandatory! 💍"
  ];
  let runawayCount = 0;

  function spawnPuff(x, y) {
    const puff = document.createElement('div');
    puff.className = 'escape-sparkle-puff';
    puff.textContent = ['😜', '💨', '💔', '🏃‍♀️', '✨'][Math.floor(Math.random() * 5)];
    puff.style.left = `${x}px`;
    puff.style.top = `${y}px`;
    if (arena) arena.appendChild(puff);
    setTimeout(() => puff.remove(), 800);
  }

  function dodgeButton(e) {
    if (!arena || !noBtn || !yesBtn) return;
    const arenaRect = arena.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // Position of puff relative to arena
    const puffX = btnRect.left - arenaRect.left + btnRect.width / 2;
    const puffY = btnRect.top - arenaRect.top + btnRect.height / 2;
    spawnPuff(puffX, puffY);

    // Arena bounds with margin
    const minX = 15;
    const maxX = arenaRect.width - btnRect.width - 15;
    const minY = 10;
    const maxY = arenaRect.height - btnRect.height - 10;

    // Pointer coordinates relative to arena
    const pointerX = e && (e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX)) 
      ? (e.clientX || e.touches[0].clientX) - arenaRect.left 
      : arenaRect.width / 2;
    const pointerY = e && (e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY))
      ? (e.clientY || e.touches[0].clientY) - arenaRect.top 
      : arenaRect.height / 2;

    // Pick candidate coordinates away from pointer and NEVER overlapping yesBtn
    let chosenX = minX;
    let chosenY = minY;
    let maxDist = -1;

    // Yes button boundary with safe buffer
    const yesLeft = yesRect.left - arenaRect.left - 25;
    const yesRight = yesRect.right - arenaRect.left + 25;
    const yesTop = yesRect.top - arenaRect.top - 20;
    const yesBottom = yesRect.bottom - arenaRect.top + 20;

    for (let i = 0; i < 15; i++) {
      const candX = minX + Math.random() * (maxX - minX);
      const candY = minY + Math.random() * (maxY - minY);

      // Check collision with YES button
      const overlapsYes = (
        candX + btnRect.width > yesLeft &&
        candX < yesRight &&
        candY + btnRect.height > yesTop &&
        candY < yesBottom
      );

      if (!overlapsYes) {
        const distToPointer = Math.hypot(candX - pointerX, candY - pointerY);
        if (distToPointer > maxDist) {
          maxDist = distToPointer;
          chosenX = candX;
          chosenY = candY;
        }
      }
    }

    // Offset relative to the button's static flow position
    noBtn.style.position = 'relative';
    const offsetX = chosenX - (btnRect.left - arenaRect.left);
    const offsetY = chosenY - (btnRect.top - arenaRect.top);
    const randomRot = (Math.random() - 0.5) * 22;

    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${randomRot}deg)`;
    noBtn.textContent = runawayMessages[runawayCount % runawayMessages.length];
    noBtn.classList.add('dodge-wobble');
    setTimeout(() => noBtn.classList.remove('dodge-wobble'), 400);

    runawayCount++;

    // Enlarge YES button smoothly via CSS variable
    const currentScale = 1 + Math.min(runawayCount * 0.08, 0.45);
    yesBtn.style.setProperty('--yes-scale', currentScale);

    if (hintEl) {
      hintEl.textContent = `Aww, Sweety! You can't click NO! Only YES is authorized! ❤️ (${runawayCount} attempts)`;
    }

    playSoundEffect('pop');
  }

  if (noBtn) {
    noBtn.addEventListener('mouseenter', dodgeButton);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeButton(e);
    }, { passive: false });
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeButton(e);
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      if (celebration) {
        celebration.classList.remove('hidden');
        triggerConfetti();
        if (typeof window.showerManyHearts === 'function') {
          window.showerManyHearts(28);
        }
        playSoundEffect('fanfare');
      }
    });
  }

  if (closeCelebrationBtn && celebration) {
    closeCelebrationBtn.addEventListener('click', () => {
      celebration.classList.add('hidden');
    });
  }

  const replayBtn = document.getElementById('replayCelebrationBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      triggerConfetti();
      if (typeof window.showerManyHearts === 'function') {
        window.showerManyHearts(24);
      }
      playSoundEffect('fanfare');
    });
  }
}

/* ==========================================================================
   9. CELEBRATION CONFETTI CANNON (High-Speed GPU-Optimized Cannon)
   ========================================================================== */
function triggerConfetti() {
  const oldCanvas = document.getElementById('celebrationConfettiCanvas');
  if (oldCanvas) oldCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'celebrationConfettiCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '9999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < 768;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const pieces = [];
  const colors = ['#ff2a70', '#f43f5e', '#38bdf8', '#fbbf24', '#a855f7', '#10b981', '#ec4899', '#ffd166'];
  const count = isMobile ? 45 : 75;

  // Dual cannons with fast snappy explosive velocity
  for (let i = 0; i < count; i++) {
    const isLeft = i % 2 === 0;
    const originX = isLeft ? width * 0.15 : width * 0.85;
    const originY = height * 0.82;
    const baseAngle = isLeft ? -Math.PI / 4 : -Math.PI * 0.75;
    const angle = baseAngle + (Math.random() - 0.5) * 0.6;
    const speed = Math.random() * 24 + 18;

    pieces.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: Math.random() * 10 + 6,
      h: Math.random() * 13 + 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.35,
      tilt: Math.random() * Math.PI * 2,
      vTilt: Math.random() * 0.28 + 0.14,
      alpha: 1.0,
      decay: Math.random() * 0.018 + 0.013, // Snappy ~1.8s cleanup
      isCircle: Math.random() < 0.25
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    let active = 0;

    for (let p of pieces) {
      if (p.alpha <= 0 || p.y > height + 40) continue;
      active++;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96; // Snappy air drag
      p.vy += 0.95; // Lively realistic gravity
      p.rotation += p.vRot;
      p.tilt += p.vTilt;
      p.alpha -= p.decay;

      const scaleX = Math.cos(p.tilt);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(scaleX, 1);
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      if (p.isCircle) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }

    if (active > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animate);
}

/* ==========================================================================
   10. WEB AUDIO API LO-FI ROMANTIC MUSIC SYNTHESIZER
   Plays gentle chill chords & arpeggios out of the box with zero external files!
   ========================================================================== */
let audioCtx = null;
let isPlayingMusic = false;
let musicInterval = null;

function initAudioSynthesizer() {
  const toggleBtn = document.getElementById('musicToggleBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (isPlayingMusic) {
        stopLoFiMusic();
        toggleBtn.classList.remove('playing');
        showToast("Lo-Fi Music Paused ⏸️");
      } else {
        startLoFiMusic();
        toggleBtn.classList.add('playing');
        showToast("Romantic Lo-Fi Chords Playing 🎶❤️");
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('alt-neon-mode');
      showToast("Neon Glow Theme Toggled! ✨");
      playSoundEffect('pop');
    });
  }
}

function startLoFiMusic() {
  isPlayingMusic = true;
  // Beautiful mellow chords: Cmaj7, Am7, Fmaj7, G7
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23]  // G7
  ];

  let chordIndex = 0;

  function playChord(notes) {
    if (!audioCtx || !isPlayingMusic) return;
    const now = audioCtx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      // Low pass filter for that warm, cozy lofi vibe
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.3 + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 3.0);
    });
  }

  playChord(chords[chordIndex]);
  musicInterval = setInterval(() => {
    chordIndex = (chordIndex + 1) % chords.length;
    playChord(chords[chordIndex]);
  }, 2800);
}

function stopLoFiMusic() {
  isPlayingMusic = false;
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

function playSoundEffect(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'buzzer') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'terminal') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(n, now + i * 0.12);
        g.gain.setValueAtTime(0.1, now + i * 0.12);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + i * 0.12);
        o.stop(now + i * 0.12 + 0.5);
      });
    }
  } catch (e) {
    // Audio context not allowed or supported
  }
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '85px';
    toast.style.right = '25px';
    toast.style.background = 'rgba(15, 23, 42, 0.95)';
    toast.style.color = '#fff';
    toast.style.border = '1px solid #ff2a70';
    toast.style.boxShadow = '0 8px 25px rgba(255, 42, 112, 0.4)';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '9999px';
    toast.style.fontSize = '0.92rem';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '5000';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3200);
}

/* ==========================================================================
   11. BUTTERY SMOOTH SCROLL REVEAL SYSTEM
   ========================================================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.hero-content, .hero-card-wrapper, .section-heading, .counter-card, ' +
    '.chapter-grid, .quiz-card, .terminal-window, .contract-paper, ' +
    '.capsule-card, .interactive-proposal-card'
  );

  targets.forEach(el => {
    el.classList.add('reveal-item');
  });

  const ribbon = document.querySelector('.milestone-ribbon');
  if (ribbon) {
    ribbon.classList.add('stagger-group');
    ribbon.querySelectorAll('.ribbon-item').forEach(item => item.classList.add('reveal-item'));
  }

  // Graceful fallback for older engines
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));
}

