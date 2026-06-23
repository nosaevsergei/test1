// --- 1. WEB AUDIO SYNTHSTAGE ENGINE ---
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Ensure autoplay bypass on first user interaction
window.addEventListener('click', initAudio, { once: true });
window.addEventListener('keydown', initAudio, { once: true });

function createNoiseNode() {
    const bufferSize = audioCtx.sampleRate * 0.15; // Short burst of noise
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    return source;
}

// Synthesis for Linear (deep thock) switch
function playLinear() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const noise = createNoiseNode();
    const filter = audioCtx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

    osc.connect(gainNode);
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    noise.start();
    osc.stop(audioCtx.currentTime + 0.15);
    noise.stop(audioCtx.currentTime + 0.15);

    // Explicitly disconnect nodes on audio decay finish to prevent memory accumulation
    setTimeout(() => {
        osc.disconnect();
        noise.disconnect();
        filter.disconnect();
        gainNode.disconnect();
    }, 200);
}

// Synthesis for Tactile (clack click) switch
function playTactile() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const noise = createNoiseNode();
    const filter = audioCtx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, audioCtx.currentTime);
    filter.Q.setValueAtTime(3, audioCtx.currentTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gainNode);
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    noise.start();
    osc.stop(audioCtx.currentTime + 0.1);
    noise.stop(audioCtx.currentTime + 0.1);

    // Disconnect nodes to prevent memory leaks
    setTimeout(() => {
        osc.disconnect();
        noise.disconnect();
        filter.disconnect();
        gainNode.disconnect();
    }, 150);
}

// Synthesis for Clicky (sharp click) switch
function playClicky() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const noise = createNoiseNode();
    const filter = audioCtx.createBiquadFilter();

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3500, audioCtx.currentTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1700, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.03);

    gainNode.gain.setValueAtTime(0.7, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gainNode);
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    noise.start();
    osc.stop(audioCtx.currentTime + 0.08);
    noise.stop(audioCtx.currentTime + 0.08);

    // Disconnect nodes
    setTimeout(() => {
        osc.disconnect();
        noise.disconnect();
        filter.disconnect();
        gainNode.disconnect();
    }, 120);
}

// Trigger concentric ripple on switch button plate
function triggerRipple(x, y, btnElement) {
    const rect = btnElement.getBoundingClientRect();
    const localX = x - rect.left;
    const localY = y - rect.top;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ripple-svg');
    svg.style.left = `${localX}px`;
    svg.style.top = `${localY}px`;
    svg.style.width = '200px';
    svg.style.height = '200px';
    svg.setAttribute('viewBox', '0 0 200 200');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'ripple-circle');
    circle.setAttribute('cx', '100');
    circle.setAttribute('cy', '100');
    circle.setAttribute('r', '5');

    svg.appendChild(circle);
    btnElement.appendChild(svg);

    setTimeout(() => {
        svg.remove();
    }, 400);
}

// Simulated visualizer waveform trigger
const outputStatus = document.getElementById('output-status');
const acousticLabel = document.getElementById('acoustic-label');
const waveformBars = document.querySelectorAll('.waveform-bar');

function animateWaveform(title) {
    outputStatus.textContent = 'OUTPUT ACTIVE';
    acousticLabel.textContent = title;
    
    waveformBars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });

    setTimeout(() => {
        outputStatus.textContent = 'OUTPUT READY';
        waveformBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }, 800);
}

// Bind clicks to switch plates
const switchButtons = document.querySelectorAll('.switch-btn');
switchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const switchType = btn.dataset.switch;
        const x = e.clientX;
        const y = e.clientY;

        triggerRipple(x, y, btn);

        if (switchType === '1') {
            playLinear();
            animateWaveform('Linear Switch: 35g Thock Resonance // Gasket Active');
        } else if (switchType === '2') {
            playTactile();
            animateWaveform('Tactile Switch: 55g Clack Resonance // Gasket Active');
        } else if (switchType === '3') {
            playClicky();
            animateWaveform('Clicky Switch: 60g Sharp Click Resonance // Plate Active');
        }
    });
});

// Bind global keypress for numbers 1, 2, and 3
window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    let targetBtn = null;
    let switchType = null;
    let label = '';

    if (e.key === '1') {
        targetBtn = document.querySelector('.switch-btn[data-switch="1"]');
        switchType = '1';
        label = 'Linear Switch: 35g Thock Resonance // Gasket Active';
    } else if (e.key === '2') {
        targetBtn = document.querySelector('.switch-btn[data-switch="2"]');
        switchType = '2';
        label = 'Tactile Switch: 55g Clack Resonance // Gasket Active';
    } else if (e.key === '3') {
        targetBtn = document.querySelector('.switch-btn[data-switch="3"]');
        switchType = '3';
        label = 'Clicky Switch: 60g Sharp Click Resonance // Plate Active';
    }

    if (targetBtn) {
        // Emulate pointer click position at center of target button plate
        const rect = targetBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        targetBtn.classList.add('scale-95');
        setTimeout(() => targetBtn.classList.remove('scale-95'), 100);

        triggerRipple(x, y, targetBtn);

        if (switchType === '1') playLinear();
        else if (switchType === '2') playTactile();
        else if (switchType === '3') playClicky();

        animateWaveform(label);
    }
});


// --- 2. SCROLL-DRIVEN ANATOMY EXPLODED VIEW ---
const anatomyContainer = document.querySelector('.scroll-reveal-container');
const layers = document.querySelectorAll('.anatomy-layer');
const callouts = document.querySelectorAll('.layer-callout');

if (anatomyContainer) {
    window.addEventListener('scroll', () => {
        const rect = anatomyContainer.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // If the container is within the active scroll threshold
        if (rect.top <= 0 && rect.bottom >= viewHeight) {
            const scrollRange = rect.height - viewHeight;
            const scrollProgress = -rect.top / scrollRange;

            // Compute sub-pixel translateY offsets for the 5 layers
            // Layer 1 (Top Case): moves up by -160px
            // Layer 2 (Keycaps): moves up by -80px
            // Layer 3 (Plate): static
            // Layer 4 (Switches): moves down by +80px
            // Layer 5 (PCB Base): moves down by +160px
            const translationCoefficients = [-160, -80, 0, 80, 160];

            layers.forEach((layer, index) => {
                const offset = translationCoefficients[index] * scrollProgress;
                layer.style.transform = `translateY(${offset}px)`;
            });

            // Sync layout labels and highlight callouts based on scroll threshold
            callouts.forEach((callout, index) => {
                const step = index / (callouts.length - 1);
                if (Math.abs(scrollProgress - step) < 0.15) {
                    callout.style.opacity = '1';
                    callout.classList.remove('opacity-30');
                    callout.classList.add('border-primary');
                } else {
                    callout.style.opacity = '0.3';
                    callout.classList.add('opacity-30');
                    callout.classList.remove('border-primary');
                }
            });
        }
    });
}


// --- 3. RGB LAB CUSTOMIZER MECHANICS ---
const hueSlider = document.getElementById('hue-slider');
const satSlider = document.getElementById('saturation-slider');
const hueValue = document.getElementById('hue-value');
const satValue = document.getElementById('saturation-value');
const rootElement = document.documentElement;

function updateGlowVariables() {
    const h = hueSlider.value;
    const s = satSlider.value;
    hueValue.textContent = `${h}°`;
    satValue.textContent = `${s}%`;
    rootElement.style.setProperty('--accent-color', `hsl(${h}, ${s}%, 50%)`);
}

if (hueSlider && satSlider) {
    hueSlider.addEventListener('input', updateGlowVariables);
    satSlider.addEventListener('input', updateGlowVariables);
    updateGlowVariables(); // Initialize
}

// Preset mode classes toggling
const btnBreathing = document.getElementById('preset-breathing');
const btnStatic = document.getElementById('preset-static');
const btnWave = document.getElementById('preset-wave');
const glowIndicator = document.getElementById('glow-indicator');

function applyPresetStyle(activeButton, animationClass) {
    [btnBreathing, btnStatic, btnWave].forEach(btn => {
        btn.classList.remove('border-primary', 'text-primary', 'glow-accent');
        btn.classList.add('border-white/10', 'text-on-surface-variant');
    });

    activeButton.classList.remove('border-white/10', 'text-on-surface-variant');
    activeButton.classList.add('border-primary', 'text-primary', 'glow-accent');

    // Reset indicator classes
    glowIndicator.className = 'w-full h-1/2 border border-primary flex items-center justify-center relative overflow-hidden';
    if (animationClass) {
        glowIndicator.classList.add(animationClass);
    }
}

if (btnBreathing && btnStatic && btnWave) {
    btnBreathing.addEventListener('click', () => applyPresetStyle(btnBreathing, 'mode-breathing'));
    btnStatic.addEventListener('click', () => applyPresetStyle(btnStatic, ''));
    btnWave.addEventListener('click', () => applyPresetStyle(btnWave, 'mode-wave'));
}


// --- 4. DENSE SPECS ROW HOVER EFFECT ---
const specCards = document.querySelectorAll('.spec-card');
specCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        specCards.forEach(c => {
            if (c !== card) {
                c.classList.add('opacity-30');
            } else {
                c.classList.add('border-primary', 'glow-accent');
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        specCards.forEach(c => {
            c.classList.remove('opacity-30', 'border-primary', 'glow-accent');
        });
    });
});


// --- 5. PRE-ORDER MODAL DISPATCH SIMULATION ---
const preorderForm = document.getElementById('preorder-form');
const emailInput = document.getElementById('preorder-email');
const preorderModal = document.getElementById('preorder-modal');
const closeModalX = document.getElementById('close-preorder-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const headerCta = document.querySelector('.header-cta');

function openPreorderModal() {
    if (preorderModal) {
        preorderModal.classList.remove('hidden');
    }
}

function closePreorderModal() {
    if (preorderModal) {
        preorderModal.classList.add('hidden');
    }
}

if (preorderForm) {
    preorderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        // Save email mock data in localStorage
        const entries = JSON.parse(localStorage.getItem('spectr_leads') || '[]');
        entries.push({
            email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('spectr_leads', JSON.stringify(entries));

        preorderForm.reset();
        openPreorderModal();
    });
}

if (closeModalX) closeModalX.addEventListener('click', closePreorderModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closePreorderModal);
if (preorderModal) {
    preorderModal.addEventListener('click', (e) => {
        if (e.target === preorderModal) {
            closePreorderModal();
        }
    });
}

if (headerCta) {
    headerCta.addEventListener('click', (e) => {
        e.preventDefault();
        openPreorderModal();
    });
}
