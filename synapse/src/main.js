// Helper function for Matrix-style text decoding
function decodeText(element, targetText, duration = 300) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const start = performance.now();
    const originalLength = targetText.length;
    
    if (element._animationFrameId) {
        cancelAnimationFrame(element._animationFrameId);
    }

    function update(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        
        let result = '';
        for (let i = 0; i < originalLength; i++) {
            if (progress >= (i / originalLength)) {
                result += targetText[i];
            } else {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        
        element.textContent = result;
        
        if (progress < 1) {
            element._animationFrameId = requestAnimationFrame(update);
        }
    }
    
    element._animationFrameId = requestAnimationFrame(update);
}

// 1. Mouse-Tracking Dot Grid Glow (requestAnimationFrame optimized)
const dotGrid = document.querySelector('.dot-grid');
let lastX = 0, lastY = 0;
let ticking = false;

if (dotGrid) {
    document.body.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = dotGrid.getBoundingClientRect();
                const x = lastX - rect.left;
                const y = lastY - rect.top;
                dotGrid.style.setProperty('--glow-x', `${x}px`);
                dotGrid.style.setProperty('--glow-y', `${y}px`);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// 2. Command Menu System (Cmd + K / Ctrl + K)
let activeIndex = 0;
const commandMenu = document.getElementById('command-menu');
const commandSearch = document.getElementById('command-search');
const commandItems = Array.from(document.querySelectorAll('.command-item'));

function openCommandMenu() {
    commandMenu.classList.remove('hidden');
    commandSearch.focus();
    commandSearch.value = '';
    filterCommands('');
    setActiveItem(0);
}

function closeCommandMenu() {
    commandMenu.classList.add('hidden');
}

function setActiveItem(index) {
    const visibleItems = commandItems.filter(item => !item.classList.contains('hidden'));
    if (visibleItems.length === 0) return;
    
    if (index < 0) index = visibleItems.length - 1;
    if (index >= visibleItems.length) index = 0;
    
    activeIndex = index;
    
    commandItems.forEach(item => {
        item.classList.remove('bg-primary/20', 'text-primary');
    });
    
    visibleItems[activeIndex].classList.add('bg-primary/20', 'text-primary');
    visibleItems[activeIndex].scrollIntoView({ block: 'nearest' });
}

function filterCommands(query) {
    const q = query.toLowerCase();
    commandItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    setActiveItem(0);
}

function executeCommand(action) {
    closeCommandMenu();
    if (action === 'scroll-features') {
        const featSection = document.getElementById('features');
        if (featSection) featSection.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'scroll-pricing') {
        const priceSection = document.getElementById('pricing');
        if (priceSection) priceSection.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'trigger-pulse') {
        const presetSelect = document.getElementById('preset-select');
        triggerPulseAnimation(presetSelect ? presetSelect.value : 'email');
    }
}

// Keydown listeners for command modal
window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (commandMenu.classList.contains('hidden')) {
            openCommandMenu();
        } else {
            closeCommandMenu();
        }
    }

    if (!commandMenu.classList.contains('hidden')) {
        const visibleItems = commandItems.filter(item => !item.classList.contains('hidden'));
        
        if (e.key === 'Escape') {
            closeCommandMenu();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); // Prevent scrolling back page
            setActiveItem(activeIndex + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent scrolling back page
            setActiveItem(activeIndex - 1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (visibleItems[activeIndex]) {
                executeCommand(visibleItems[activeIndex].dataset.action);
            }
        }
    }
});

if (commandSearch) {
    commandSearch.addEventListener('input', (e) => {
        filterCommands(e.target.value);
    });
}

const cmdBadge = document.getElementById('cmd-badge');
if (cmdBadge) {
    cmdBadge.addEventListener('click', () => {
        openCommandMenu();
    });
}

if (commandMenu) {
    commandMenu.addEventListener('click', (e) => {
        if (e.target === commandMenu) {
            closeCommandMenu();
        }
    });
}

commandItems.forEach(item => {
    item.addEventListener('click', () => {
        executeCommand(item.dataset.action);
    });
});

// 3. Hero Canvas: SVG Connection Pulse Flow
function triggerPulseAnimation(preset = 'email') {
    const path1 = document.getElementById('pulse-path-1');
    const path2 = document.getElementById('pulse-path-2');
    const aiProgressBar = document.getElementById('ai-progress-bar');
    const aiStatusText = document.getElementById('ai-status-text');
    const actionOutputText = document.getElementById('action-output-text');
    const actionStatusIcon = document.getElementById('action-status-icon');

    if (!path1 || !path2) return;

    // Reset progress & line overlays
    path1.style.transition = 'none';
    path2.style.transition = 'none';
    path1.style.strokeDashoffset = '1000';
    path2.style.strokeDashoffset = '1000';
    aiProgressBar.style.width = '0%';
    aiStatusText.textContent = 'Получение данных...';
    actionStatusIcon.classList.add('opacity-30');
    actionStatusIcon.classList.remove('pulse-animation');

    // Force DOM repaint reflow
    path1.getBoundingClientRect();

    // Pulse Path 1: Input -> AI Node
    path1.style.transition = 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    path1.style.strokeDashoffset = '0';

    setTimeout(() => {
        // AI node processing state (400ms)
        aiStatusText.textContent = 'Обработка ИИ...';
        aiProgressBar.style.width = '100%';

        setTimeout(() => {
            aiStatusText.textContent = 'Готово';

            // Pulse Path 2: AI -> Action Node
            path2.style.transition = 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            path2.style.strokeDashoffset = '0';

            setTimeout(() => {
                // Action Node completion and mapping values
                let outputVal = 'CRM Update';
                if (preset === 'email') outputVal = 'Выгрузка в CRM';
                else if (preset === 'telegram') outputVal = 'TG Уведомление';
                else if (preset === 'webhooks') outputVal = 'Синхронизация БД';

                decodeText(actionOutputText, outputVal, 300);
                actionStatusIcon.classList.remove('opacity-30');
                actionStatusIcon.classList.add('pulse-animation');
            }, 200);

        }, 400);

    }, 500);
}

const presetSelect = document.getElementById('preset-select');
if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
        triggerPulseAnimation(e.target.value);
    });
}

// 4. Bento Grid: Custom Cursor Decoder Interface
const scannerCard = document.getElementById('scanner-card');
const customCursor = document.getElementById('custom-scanner-cursor');
const cursorX = document.getElementById('cursor-pos-x');
const cursorY = document.getElementById('cursor-pos-y');
const decodedText = document.getElementById('scanner-decoded-text');
const decoderLines = document.querySelectorAll('.decoder-line');

if (scannerCard && customCursor) {
    scannerCard.addEventListener('mouseenter', () => {
        customCursor.classList.remove('hidden');
    });

    scannerCard.addEventListener('mouseleave', () => {
        customCursor.classList.add('hidden');
        decodeText(decodedText, "AWAITING_INPUT", 300);
    });

    scannerCard.addEventListener('mousemove', (e) => {
        const rect = scannerCard.getBoundingClientRect();
        const cursorWidth = customCursor.offsetWidth;
        const cursorHeight = customCursor.offsetHeight;

        let x = e.clientX - rect.left - (cursorWidth / 2);
        let y = e.clientY - rect.top - (cursorHeight / 2);

        // Clamping borders strictly
        x = Math.max(0, Math.min(x, rect.width - cursorWidth));
        y = Math.max(0, Math.min(y, rect.height - cursorHeight));

        customCursor.style.left = `${x}px`;
        customCursor.style.top = `${y}px`;

        cursorX.textContent = `X: ${Math.round(x)}`;
        cursorY.textContent = `Y: ${Math.round(y)}`;
    });
}

// Trigger decoder once on mouseenter per line to avoid layout thrashing
decoderLines.forEach(line => {
    line.addEventListener('mouseenter', () => {
        decodeText(line, line.dataset.target, 300);
        
        // Map line to unique status keywords inside tracking box
        const actionMap = {
            "Наведите курсор для запуска сканирования": "INITIALIZING_SCAN",
            "Глубокий анализ нейросетевых связей": "ANALYZING_SYNAPSE",
            "Извлечение структурированных метаданных": "EXTRACTING_DATA"
        };
        const status = actionMap[line.dataset.target] || "PROCESSING";
        decodeText(decodedText, status, 300);
    });
});

// 5. Closed Beta Test Modal Popup
const betaModal = document.getElementById('beta-modal');
const closeBetaModal = document.getElementById('close-beta-modal');
const betaForm = document.getElementById('beta-form');
const betaContent = document.getElementById('beta-content');
const betaSuccess = document.getElementById('beta-success');
const closeBetaSuccess = document.getElementById('close-beta-success');

function openBetaModal() {
    betaModal.classList.remove('hidden');
    betaContent.classList.remove('hidden');
    betaSuccess.classList.add('hidden');
    betaForm.reset();
}

function closeBeta() {
    betaModal.classList.add('hidden');
}

document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBetaModal();
    });
});

const newsSubmit = document.getElementById('footer-newsletter-submit');
const newsEmail = document.getElementById('footer-newsletter-email');
if (newsSubmit && newsEmail) {
    newsSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        if (newsEmail.value && newsEmail.value.includes('@')) {
            openBetaModal();
            const modalEmail = document.getElementById('beta-email');
            if (modalEmail) modalEmail.value = newsEmail.value;
        }
    });
}

if (closeBetaModal) closeBetaModal.addEventListener('click', closeBeta);
if (closeBetaSuccess) closeBetaSuccess.addEventListener('click', closeBeta);

if (betaModal) {
    betaModal.addEventListener('click', (e) => {
        if (e.target === betaModal) {
            closeBeta();
        }
    });
}

if (betaForm) {
    betaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        betaContent.classList.add('hidden');
        betaSuccess.classList.remove('hidden');
    });
}

// 6. Scrollytelling step highlight scroll handler
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.step-card');
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;
    
    const scrollPos = window.scrollY + window.innerHeight / 2;

    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY;
        
        if (scrollPos > cardTop) {
            card.classList.remove('opacity-50');
            card.classList.add('opacity-100');
            progress.style.height = `${((index + 1) / cards.length) * 100}%`;
        } else {
            card.classList.remove('opacity-100');
            card.classList.add('opacity-50');
        }
    });
});
