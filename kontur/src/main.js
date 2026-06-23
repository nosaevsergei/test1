// 1. Brand Manifesto Word-by-Word Scroll Reveal (Preposition wrapping protection)
const manifestoText = document.getElementById('manifesto-text');
if (manifestoText) {
    const rawText = manifestoText.textContent.trim();
    const tokens = rawText.split(/\s+/);
    const elements = [];
    
    // Russian prepositions to bind to the next word to avoid awkward wraps
    const prepositions = ['мы', 'в', 'и', 'не', 'на', 'за', 'от', 'до', 'по', 'у', 'о', 'об', 'обо', 'с', 'со', 'из', 'к', 'ко', 'а', 'но', 'же', 'бы', 'ли'];
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const cleanToken = token.toLowerCase().replace(/[^a-zа-яё]/g, '');
        
        if (prepositions.includes(cleanToken) && i < tokens.length - 1) {
            const nextToken = tokens[i + 1];
            elements.push(`<span class="manifesto-word text-zinc-300 transition-colors duration-500" style="display: inline;">${token}&nbsp;${nextToken}</span>`);
            i++; // skip next word since we grouped it
        } else {
            elements.push(`<span class="manifesto-word text-zinc-300 transition-colors duration-500" style="display: inline;">${token}</span>`);
        }
    }
    manifestoText.innerHTML = elements.join(' ');
}

const wordElements = document.querySelectorAll('.manifesto-word');
const manifestoSection = document.getElementById('manifesto-section');

function handleManifestoScroll() {
    if (!manifestoSection) return;
    const rect = manifestoSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top < viewportHeight && rect.bottom > 0) {
        wordElements.forEach((el) => {
            const elRect = el.getBoundingClientRect();
            // Reveal point at 75% height of the screen
            const revealPoint = viewportHeight * 0.72;
            if (elRect.top < revealPoint) {
                el.style.color = '#1c1c16'; // solid charcoal
            } else {
                el.style.color = '#d4d4d8'; // faint grey
            }
        });
    }
}

window.addEventListener('scroll', handleManifestoScroll);
window.addEventListener('resize', handleManifestoScroll);
handleManifestoScroll();


// 2. 2D Bento-Configurator Mechanics
let configWeight = 0;
let configElements = 0;
const stackContainer = document.getElementById('stack-container');
const statusDisplay = document.getElementById('config-status');
const renderCoords = document.getElementById('render-coords');

function addComponent(type, weight) {
    if (!stackContainer) return;
    
    configWeight += weight;
    configElements += 1;

    // Create 2D CSS block representation
    const block = document.createElement('div');
    block.className = 'config-block border border-surface/20 w-44';
    
    if (type === 'M500') {
        block.style.height = '60px';
        block.style.backgroundColor = '#5f5e5a'; // concrete moss grey
        block.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[10px] font-mono-ui text-surface-container-low select-none">[ CONCRETE_M500 ]</div>`;
    } else if (type === 'Steel') {
        block.style.height = '12px';
        block.style.backgroundColor = '#1c1c16'; // gunmetal steel
        block.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[8px] font-mono-ui text-zinc-500 select-none">[ STEEL_PLATE ]</div>`;
    } else if (type === 'Glass') {
        block.style.height = '28px';
        block.style.backgroundColor = 'rgba(230, 226, 217, 0.4)'; // glass arch
        block.style.borderTopLeftRadius = '9999px';
        block.style.borderTopRightRadius = '9999px';
        block.style.borderWidth = '1px';
        block.style.borderColor = 'rgba(28, 28, 22, 0.3)';
        block.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[8px] font-mono-ui text-neutral-600 select-none">[ GLASS_ARCH ]</div>`;
    }

    stackContainer.appendChild(block);

    // Deceleration kinetic drop animation via requestAnimationFrame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            block.classList.add('dropped');
        });
    });

    statusDisplay.textContent = `Вес: ${configWeight} кг // Элементов: ${configElements}`;

    // Kinetic shake on landing
    setTimeout(() => {
        const podium = document.getElementById('visual-podium');
        if (podium) {
            podium.style.transform = 'translateY(3px)';
            setTimeout(() => {
                podium.style.transform = 'translateY(0)';
            }, 80);
        }
    }, 450);

    // Update blueprint render coordinates
    if (renderCoords) {
        const randX = (Math.random() * 10).toFixed(2);
        const randY = (Math.random() * 10).toFixed(2);
        const randZ = (configElements * 0.2).toFixed(2);
        renderCoords.innerHTML = `RENDER_ENGINE_V2.0<br/>COORD_XYZ: ${randX} . ${randY} . ${randZ}`;
    }
}

function clearStage() {
    if (!stackContainer) return;
    
    const blocks = Array.from(stackContainer.children);
    blocks.forEach((b) => {
        b.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
        b.style.transform = 'translateY(50px)';
        b.style.opacity = '0';
    });

    setTimeout(() => {
        stackContainer.innerHTML = '';
        configWeight = 0;
        configElements = 0;
        statusDisplay.textContent = `Вес: 0 кг // Элементов: 0`;
        if (renderCoords) {
            renderCoords.innerHTML = `RENDER_ENGINE_V2.0<br/>COORD_XYZ: 0.00.0`;
        }
    }, 400);
}

const btnCube = document.getElementById('config-btn-cube');
const btnSteel = document.getElementById('config-btn-steel');
const btnGlass = document.getElementById('config-btn-glass');
const btnClear = document.getElementById('config-btn-clear');

if (btnCube) btnCube.addEventListener('click', () => addComponent('M500', 45));
if (btnSteel) btnSteel.addEventListener('click', () => addComponent('Steel', 15));
if (btnGlass) btnGlass.addEventListener('click', () => addComponent('Glass', 8));
if (btnClear) btnClear.addEventListener('click', clearStage);


// 3. Horizontal Scroll Gallery (The Runway) with trackpad smoothing and touch fallback
const runwaySection = document.getElementById('runway-section');
const runwayTrack = document.getElementById('runway-track');

if (runwaySection && runwayTrack) {
    runwaySection.addEventListener('wheel', (e) => {
        // Fallback fully to native swiping on mobile
        if (window.innerWidth < 768) return;

        const maxScrollLeft = runwayTrack.scrollWidth - runwayTrack.clientWidth;
        const currentScrollLeft = runwayTrack.scrollLeft;

        // Check if track is scrollable in the scrolled direction
        if ((e.deltaY > 0 && currentScrollLeft < maxScrollLeft) ||
            (e.deltaY < 0 && currentScrollLeft > 0)) {
            e.preventDefault();
            
            // Using scrollBy with behavior: 'auto' handles trackpads smoothly without stutters
            runwayTrack.scrollBy({
                left: e.deltaY,
                behavior: 'auto'
            });
        }
    }, { passive: false });
}


// 4. Scroll Photo-Masking Expanse (GPU-accelerated)
const heroImageMask = document.getElementById('hero-image-mask');

function handleHeroScroll() {
    if (!heroImageMask) return;
    const scrollY = window.scrollY;
    const maxScroll = 500; // Expand fully over first 500px scrolled
    const progress = Math.min(scrollY / maxScroll, 1);
    
    // Scale clip path inset from 10% down to 0%
    const insetPercentage = 10 * (1 - progress);
    // Scale up slightly for subtle parallax zoom depth
    const scaleValue = 1 + (0.05 * progress);
    
    window.requestAnimationFrame(() => {
        heroImageMask.style.clipPath = `inset(${insetPercentage}%)`;
        heroImageMask.style.transform = `scale(${scaleValue})`;
    });
}

window.addEventListener('scroll', handleHeroScroll);
handleHeroScroll();


// 5. Clean Inquiry Submission Stage
const inquiryForm = document.getElementById('inquiry-form');
const inquiryContainer = document.getElementById('inquiry-container');

if (inquiryForm && inquiryContainer) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('inquiry-name').value;
        const email = document.getElementById('inquiry-email').value;
        const desc = document.getElementById('inquiry-desc').value;

        // Persist to local storage
        const inquiryData = {
            name,
            email,
            desc,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('kontur_inquiry', JSON.stringify(inquiryData));

        // Smooth transition layout morph
        inquiryContainer.style.opacity = '0';
        inquiryContainer.style.transform = 'translateY(10px)';

        setTimeout(() => {
            inquiryContainer.innerHTML = `
                <div class="py-12 border-b structural-line text-left space-y-6">
                    <span class="font-mono-ui text-xs text-zinc-500 uppercase tracking-widest">[ ЗАПРОС ПРИНЯТ ]</span>
                    <h4 class="font-display-lg text-3xl font-bold text-primary">Ваш запрос зарегистрирован</h4>
                    <p class="font-body-md text-secondary max-w-md">
                        Данные успешно внесены в реестр проектов. Наш архитектор свяжется с вами по адресу <strong>${email}</strong> в ближайшее время для обсуждения деталей.
                    </p>
                    <div class="pt-4">
                        <span class="font-mono-ui text-[10px] text-zinc-400">ID ЗАПРОСА: ${Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
                    </div>
                </div>
            `;
            inquiryContainer.style.opacity = '1';
            inquiryContainer.style.transform = 'translateY(0)';
        }, 500);
    });
}
