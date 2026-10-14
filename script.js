/**
 * AYUSH KUMAR // FUTURISTIC CYBER-AI PORTFOLIO
 * High-Tech Interactive Controller, Car Transitions, Audio Synthesizer,
 * Right Vertical Car Rail, and A.Y.U.S.H. Core AI Copilot.
 */

// ==========================================
// 1. GLOBAL STATE & CONFIGURATION
// ==========================================
let currentSectionIndex = 0;
let isTransitioning = false;
let sfxEnabled = true;
const TOTAL_SECTIONS = 6;

const SECTIONS = [
  { id: 'sec-home', title: 'HOME BASE', code: 'SYS::01' },
  { id: 'sec-about', title: 'ABOUT ME', code: 'SYS::02' },
  { id: 'sec-education', title: 'EDUCATION', code: 'SYS::03' },
  { id: 'sec-skills', title: 'SKILLS MATRIX', code: 'SYS::04' },
  { id: 'sec-certifications', title: 'AWARDS & CERTS', code: 'SYS::05' },
  { id: 'sec-contact', title: 'CONTACT TERMINAL', code: 'SYS::06' }
];

// Typewriter strings
const TYPEWRITER_PHRASES = [
  "First-Year B.Tech CSE Student @ JECRC",
  "Exploring Behind-the-Scenes Code & Algorithms",
  "Mastering C / C++ & High-Speed Touch Typing",
  "Leveraging Modern AI Toolbases (ChatGPT, Claude, Copilot)",
  "District Athlete in Badminton & Cricket",
  "Turning Ideas into Practical Digital Realities"
];

// ==========================================
// 2. WEB AUDIO API SYNTHESIZER (Sci-Fi Audio)
// ==========================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Synthesize futuristic hypercar zoom / whoosh
function playCarWarpSound() {
  if (!sfxEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    
    // Low frequency rumble & sweep (turbo spool)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sawtooth';
    filter.type = 'lowpass';

    // Pitch sweep: 80Hz -> 650Hz -> 120Hz
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.8);

    // Filter frequency sweep
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.35);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.8);

    // Volume envelope
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  } catch (e) {
    // Audio contexts may be blocked by browser policy until interaction
  }
}

// Gentle Sci-Fi UI Click
function playUiClickSound() {
  if (!sfxEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {}
}

// ==========================================
// 3. CAR TRANSITION CONTROLLER & PAGE SWITCH
// ==========================================
const carOverlay = document.getElementById('car-transition-overlay');
const hudSpeedVal = document.getElementById('hud-speed-val');
const hudTargetSec = document.getElementById('hud-target-sec');

function navigateToSection(targetIndex) {
  if (targetIndex < 0 || targetIndex >= TOTAL_SECTIONS) return;
  if (isTransitioning) return;
  if (targetIndex === currentSectionIndex) {
    // If clicking same section, smoothly scroll to top of that section
    const secEl = document.getElementById(SECTIONS[targetIndex].id);
    if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  isTransitioning = true;
  playUiClickSound();

  // 1. Play Sound and Activate Overlay
  playCarWarpSound();
  if (carOverlay) {
    carOverlay.classList.add('active');
  }

  // 2. Animate Speedometer Numbers
  if (hudTargetSec) {
    hudTargetSec.textContent = `TARGET: ${SECTIONS[targetIndex].title} [${SECTIONS[targetIndex].code}]`;
  }

  let speedCounter = 120;
  const speedInterval = setInterval(() => {
    speedCounter += Math.floor(Math.random() * 45) + 30;
    if (speedCounter > 540) speedCounter = 540;
    if (hudSpeedVal) hudSpeedVal.textContent = speedCounter;
  }, 40);

  // 3. Mid-transition switch: scroll to destination
  setTimeout(() => {
    const targetElement = document.getElementById(SECTIONS[targetIndex].id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'auto' });
    }

    updateActiveIndicators(targetIndex);
    currentSectionIndex = targetIndex;
  }, 380);

  // 4. Finish Car Transition and restore interaction
  setTimeout(() => {
    clearInterval(speedInterval);
    if (carOverlay) {
      carOverlay.classList.remove('active');
    }
    isTransitioning = false;
  }, 850);
}

// Update Nav Buttons, Vertical Rail Car Slider & Telemetry
function updateActiveIndicators(index) {
  // Update Header Nav
  document.querySelectorAll('.desktop-nav .nav-item').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === index);
  });

  // Update Drawer Nav
  document.querySelectorAll('.drawer-links .drawer-link').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === index);
  });

  // Update Vertical Bar Nodes
  const vertNodes = document.querySelectorAll('.vert-nodes-list .vert-node');
  vertNodes.forEach((node, idx) => {
    node.classList.toggle('active', idx === index);
  });

  // Slide the mini cyber car along the vertical rail track
  const carSlider = document.getElementById('vert-car-slider');
  const railGlow = document.getElementById('vert-rail-glow');
  const activeNode = vertNodes[index];

  if (carSlider && activeNode) {
    const nodeOffsetTop = activeNode.offsetTop + (activeNode.offsetHeight / 2);
    carSlider.style.top = `${nodeOffsetTop}px`;
    
    if (railGlow) {
      const totalHeight = activeNode.parentElement.offsetHeight;
      const pct = Math.min(100, Math.max(10, (nodeOffsetTop / totalHeight) * 100));
      railGlow.style.height = `${pct}%`;
    }
  }

  // Update Telemetry number
  const teleNum = document.getElementById('tele-sec-num');
  if (teleNum) {
    teleNum.textContent = `0${index + 1}`;
  }
}

// ==========================================
// 4. WHEEL & KEYBOARD SCROLL PAGE SWITCHING
// ==========================================
let wheelCooldown = false;

window.addEventListener('wheel', (e) => {
  // If user is inside modal chatbot or active inputs, let default scroll happen
  const modal = document.getElementById('chatbot-modal-overlay');
  if (modal && modal.classList.contains('active')) return;

  if (wheelCooldown || isTransitioning) return;

  if (Math.abs(e.deltaY) > 35) {
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 950);

    if (e.deltaY > 0 && currentSectionIndex < TOTAL_SECTIONS - 1) {
      // Scroll Down -> Next Section
      navigateToSection(currentSectionIndex + 1);
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      // Scroll Up -> Previous Section
      navigateToSection(currentSectionIndex - 1);
    }
  }
}, { passive: true });

// Keyboard Navigation (Page Up, Page Down, Arrow Up, Arrow Down)
window.addEventListener('keydown', (e) => {
  const modal = document.getElementById('chatbot-modal-overlay');
  if (modal && modal.classList.contains('active')) return;
  if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    if (currentSectionIndex < TOTAL_SECTIONS - 1) {
      navigateToSection(currentSectionIndex + 1);
    }
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    if (currentSectionIndex > 0) {
      navigateToSection(currentSectionIndex - 1);
    }
  }
});

// Touch Swipe Detection for Mobile
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  const modal = document.getElementById('chatbot-modal-overlay');
  if (modal && modal.classList.contains('active')) return;
  if (isTransitioning) return;

  const touchEndY = e.changedTouches[0].clientY;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffY) > 60) {
    if (diffY > 0 && currentSectionIndex < TOTAL_SECTIONS - 1) {
      // Swipe Up -> Next Section
      navigateToSection(currentSectionIndex + 1);
    } else if (diffY < 0 && currentSectionIndex > 0) {
      // Swipe Down -> Prev Section
      navigateToSection(currentSectionIndex - 1);
    }
  }
}, { passive: true });

// ==========================================
// 5. INTERSECTION OBSERVER (Native scroll sync)
// ==========================================
const sectionObserver = new IntersectionObserver((entries) => {
  if (isTransitioning) return;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.getAttribute('data-index'), 10);
      if (!isNaN(idx) && idx !== currentSectionIndex) {
        currentSectionIndex = idx;
        updateActiveIndicators(idx);
      }
    }
  });
}, { threshold: 0.55 });

document.querySelectorAll('.page-section').forEach(sec => {
  sectionObserver.observe(sec);
});

// ==========================================
// 6. DYNAMIC TYPING EFFECT (Home Hero)
// ==========================================
const typewriterElement = document.getElementById('dynamic-typewriter');
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function handleTypewriter() {
  if (!typewriterElement) return;

  const currentPhrase = TYPEWRITER_PHRASES[phraseIdx];

  if (!isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentPhrase.length) {
      isDeleting = true;
      setTimeout(handleTypewriter, 2200);
      return;
    }
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % TYPEWRITER_PHRASES.length;
    }
  }

  const speed = isDeleting ? 30 : 65;
  setTimeout(handleTypewriter, speed);
}

// ==========================================
// 7. BACKGROUND NEURAL MATRIX CANVAS
// ==========================================
const canvas = document.getElementById('neural-canvas');
let ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let mouse = { x: null, y: null, radius: 140 };

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 16000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 243, 255, ' : 'rgba(176, 38, 255, '
    });
  }
}

function renderNeuralCanvas() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // Draw particle node
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color + '0.7)';
    ctx.fill();

    // Connect close neighbors with cyan/purple laser links
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        const alpha = (1 - dist / 110) * 0.22;
        ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(renderNeuralCanvas);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  updateActiveIndicators(currentSectionIndex);
});

// ==========================================
// 8. AI CHATBOT SYSTEM ("A.Y.U.S.H. CORE")
// ==========================================
const chatModal = document.getElementById('chatbot-modal-overlay');
const chatMessagesBody = document.getElementById('chat-messages-body');
const chatInput = document.getElementById('chat-user-input');

function openChatbotModal() {
  playUiClickSound();
  if (chatModal) {
    chatModal.classList.add('active');
    if (chatInput) chatInput.focus();
  }
}

function closeChatbotModal() {
  playUiClickSound();
  if (chatModal) {
    chatModal.classList.remove('active');
  }
}

// Close when clicking backdrop
if (chatModal) {
  chatModal.addEventListener('click', (e) => {
    if (e.target === chatModal) closeChatbotModal();
  });
}

// Clear chat history
function clearChatHistory() {
  playUiClickSound();
  if (chatMessagesBody) {
    chatMessagesBody.innerHTML = `
      <div class="chat-msg ai-msg">
        <div class="msg-avatar"><i class="fa-solid fa-microchip"></i></div>
        <div class="msg-bubble">
          <div class="msg-meta">A.Y.U.S.H. CORE &bull; SYSTEM RESET</div>
          <p>Terminal reset complete. Ready for new queries about Ayush's engineering profile, 92% CBSE record, or tech stack.</p>
        </div>
      </div>
    `;
  }
}

// AI Knowledge Base & Intent Resolution
function getAiResponse(userText) {
  const text = userText.toLowerCase();

  if (text.includes('who is') || text.includes('about') || text.includes('bio') || text.includes('background') || text.includes('ayush')) {
    return "Ayush Kumar is an 18-year-old first-year B.Tech Computer Science Engineering student at JECRC, Jaipur. He achieved 92% in his CBSE 12th Board examinations and is passionate about exploring how software works behind the scenes — from low-level C code to cutting-edge AI toolbases!";
  }

  if (text.includes('skill') || text.includes('tech stack') || text.includes('language') || text.includes('code') || text.includes('tools')) {
    return "Ayush's technical repertoire spans:<br>• <strong>Core Systems:</strong> C & C++ Programming (Pointers, Memory, OOP)<br>• <strong>Web Dev:</strong> Semantic HTML5, CSS3 (Glow/Responsive), Modern JS<br>• <strong>AI Toolbase:</strong> ChatGPT, Claude 3.5, Cursor IDE, GitHub Copilot<br>• <strong>Developer Tools:</strong> Git CLI, GitHub, VS Code<br>• <strong>Creative:</strong> Video & Graphic Editing Suites<br>• <strong>Touch Typing:</strong> Verified 75+ WPM at 98% accuracy!";
  }

  if (text.includes('education') || text.includes('college') || text.includes('jecrc') || text.includes('12th') || text.includes('board') || text.includes('school')) {
    return "Ayush is currently pursuing his <strong>B.Tech in Computer Science Engineering (2025–2029)</strong> at <strong>JECRC, Jaipur</strong>. He completed his Senior Secondary (Class 12th CBSE) with an exceptional <strong>92% aggregate</strong> with a strong foundation in Physics, Chemistry, and Mathematics.";
  }

  if (text.includes('district') || text.includes('sport') || text.includes('badminton') || text.includes('cricket') || text.includes('achievement') || text.includes('certificate') || text.includes('olympiad')) {
    return "Ayush is a versatile achiever:<br>🏸 <strong>Badminton:</strong> District-level player with lightning reflexes and strategic court vision.<br>🏏 <strong>Cricket:</strong> District-level competitor with deep teamwork and match composure.<br>🏆 <strong>Academic Merit:</strong> 92% CBSE Distinction, National Science & Cyber Olympiad participations, and verified C Programming coursework!";
  }

  if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('call') || text.includes('reach') || text.includes('hire') || text.includes('gmail')) {
    return "You can connect with Ayush instantly:<br>📧 <strong>Gmail:</strong> <a href='mailto:0008ayushkumar@gmail.com' style='color:#00f3ff;text-decoration:underline;'>0008ayushkumar@gmail.com</a><br>📱 <strong>Phone / WhatsApp:</strong> <a href='tel:+917300656743' style='color:#00f3ff;text-decoration:underline;'>+91 7300656743</a><br>📍 <strong>Campus:</strong> JECRC, Jaipur, Rajasthan.<br>You can also jump directly to Section 06 using the Contact tab!";
  }

  if (text.includes('typing') || text.includes('wpm') || text.includes('speed')) {
    return "Ayush is a certified professional touch typist capable of sustained speeds exceeding <strong>75+ Words Per Minute (WPM)</strong> with over 98% accuracy. This enables rapid code drafting and efficient terminal navigation.";
  }

  if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('sup')) {
    return "Hello! Autonomous copilot online. What section of Ayush's portfolio would you like me to inspect for you?";
  }

  return "Acknowledge query. Ayush is an 18-year-old 1st-year B.Tech CSE undergrad at JECRC (92% CBSE Board) proficient in C, C++, Web Technologies, and modern AI toolbases, as well as a district-level athlete in badminton and cricket. Feel free to ask about his specific projects, skills, or contact channels!";
}

function sendUserMessage() {
  if (!chatInput) return;
  const userText = chatInput.value.trim();
  if (!userText) return;

  chatInput.value = '';
  appendMessage(userText, 'user');

  // Simulate AI Typing
  setTimeout(() => {
    const aiReply = getAiResponse(userText);
    appendMessage(aiReply, 'ai');
    playUiClickSound();
  }, 400);
}

function sendQuickQuery(queryText) {
  if (!chatModal.classList.contains('active')) {
    openChatbotModal();
  }
  appendMessage(queryText, 'user');
  setTimeout(() => {
    const aiReply = getAiResponse(queryText);
    appendMessage(aiReply, 'ai');
    playUiClickSound();
  }, 350);
}

function handleChatInputKey(e) {
  if (e.key === 'Enter') {
    sendUserMessage();
  }
}

function appendMessage(htmlContent, sender) {
  if (!chatMessagesBody) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}-msg`;

  const avatar = sender === 'ai' 
    ? '<div class="msg-avatar"><i class="fa-solid fa-microchip"></i></div>'
    : '<div class="msg-avatar"><i class="fa-solid fa-user"></i></div>';

  const meta = sender === 'ai' 
    ? '<div class="msg-meta">A.Y.U.S.H. CORE &bull; SYNTHESIS</div>'
    : '<div class="msg-meta">GUEST USER</div>';

  msgDiv.innerHTML = `
    ${avatar}
    <div class="msg-bubble">
      ${meta}
      <p>${htmlContent}</p>
    </div>
  `;

  chatMessagesBody.appendChild(msgDiv);
  chatMessagesBody.scrollTop = chatMessagesBody.scrollHeight;
}

// ==========================================
// 9. UTILITIES: CLIPBOARD & FORM DISPATCH
// ==========================================
function copyToClipboard(text, btnElement) {
  playUiClickSound();
  navigator.clipboard.writeText(text).then(() => {
    const origHtml = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> <span>COPIED!</span>';
    btnElement.classList.add('copied');
    setTimeout(() => {
      btnElement.innerHTML = origHtml;
      btnElement.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback if clipboard API blocked
    prompt('Copy to clipboard:', text);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  playUiClickSound();

  const btn = document.getElementById('submit-signal-btn');
  const feedback = document.getElementById('form-feedback');
  const form = document.getElementById('cyber-contact-form');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>TRANSMITTING SIGNAL...</span>';
  }

  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> <span>TRANSMIT SIGNAL</span>';
    }
    if (feedback) {
      feedback.className = 'form-feedback-hud success';
      feedback.innerHTML = '<i class="fa-solid fa-check-circle"></i> TRANSMISSION CONFIRMED // Signal received. Ayush will respond promptly!';
    }
    if (form) form.reset();

    setTimeout(() => {
      if (feedback) feedback.style.display = 'none';
    }, 5000);
  }, 1200);
}

// Audio SFX Toggle Button
const audioToggleBtn = document.getElementById('audio-toggle-btn');
if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', () => {
    sfxEnabled = !sfxEnabled;
    if (sfxEnabled) {
      initAudio();
      audioToggleBtn.classList.remove('muted');
      audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span class="btn-text">SFX: ON</span>';
      playUiClickSound();
    } else {
      audioToggleBtn.classList.add('muted');
      audioToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span class="btn-text">SFX: OFF</span>';
    }
  });
}

// Mobile Menu Drawer Handler
const mobileBtn = document.getElementById('mobile-toggle-btn');
const closeDrawerBtn = document.getElementById('close-drawer-btn');
const drawer = document.getElementById('mobile-menu-drawer');

if (mobileBtn && drawer) {
  mobileBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    playUiClickSound();
  });
}
if (closeDrawerBtn && drawer) {
  closeDrawerBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
    playUiClickSound();
  });
}

// Close drawer when any drawer nav link is clicked
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    if (drawer) drawer.classList.remove('open');
  });
});

// ==========================================
// 10. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Canvas
  resizeCanvas();
  renderNeuralCanvas();

  // 2. Start Typewriter
  setTimeout(handleTypewriter, 500);

  // 3. Align Right Vertical Rail Car Indicator
  updateActiveIndicators(0);

  // 4. Listen for first user click to initialize Web Audio context
  window.addEventListener('click', () => {
    initAudio();
  }, { once: true });
});
