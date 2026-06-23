// 1. Hero Sandbox Drag-and-Drop Simulation
const sandboxContainer = document.getElementById('sandbox-container');
const dropZone = document.getElementById('drop-zone');
const draggableCards = document.querySelectorAll('.sandbox-card');

draggableCards.forEach(card => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = parseFloat(card.style.left) || 0;
    let currentY = parseFloat(card.style.top) || 0;
    let lastPointerX = 0;

    // Parse baseline rotation from layout (e.g. rotate-[-5deg])
    const baseRotationMatch = card.className.match(/rotate-\[(-?\d+)deg\]/);
    const baseRotation = baseRotationMatch ? parseInt(baseRotationMatch[1]) : 0;

    card.addEventListener('pointerdown', (e) => {
        if (card.dataset.locked === 'true') return;

        isDragging = true;
        card.releasePointerCapture(e.pointerId); // Allows smooth boundary tracking
        card.style.zIndex = '50';

        startX = e.clientX - card.offsetLeft;
        startY = e.clientY - card.offsetTop;
        lastPointerX = e.clientX;

        // Bind pointermove, pointerup, and pointercancel ONLY dynamically during drag to avoid memory leaks
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
    });

    function onPointerMove(e) {
        if (!isDragging) return;

        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        // Contain card inside sandbox boundary
        const containerRect = sandboxContainer.getBoundingClientRect();
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;

        currentX = Math.max(0, Math.min(currentX, containerRect.width - cardWidth));
        currentY = Math.max(0, Math.min(currentY, containerRect.height - cardHeight));

        // Calculate drag velocity vector along X axis to apply rotation inertia
        const deltaX = e.clientX - lastPointerX;
        lastPointerX = e.clientX;

        // Tilt card up to 8 degrees based on speed
        const targetRotation = Math.max(-8, Math.min(8, deltaX * 1.5));

        card.style.left = `${currentX}px`;
        card.style.top = `${currentY}px`;
        card.style.transform = `rotate(${targetRotation}deg)`;
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;

        // Unbind window listeners immediately on drag end
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        card.style.zIndex = '10';

        // Check bounding box intersection with Drop Zone
        const cardRect = card.getBoundingClientRect();
        const zoneRect = dropZone.getBoundingClientRect();

        const isOverlapping = !(
            cardRect.right < zoneRect.left ||
            cardRect.left > zoneRect.right ||
            cardRect.bottom < zoneRect.top ||
            cardRect.top > zoneRect.bottom
        );

        if (isOverlapping) {
            // Lock card and snap center inside Drop Zone
            card.dataset.locked = 'true';
            card.style.left = '50%';
            card.style.top = '50%';
            card.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            card.classList.remove('cursor-move');
            card.classList.add('cursor-default');

            dropZone.appendChild(card);

            // Trigger visual flash border animation
            dropZone.style.borderColor = '#34D399'; // Mint Green Success
            dropZone.style.backgroundColor = 'rgba(52, 211, 153, 0.1)';

            setTimeout(() => {
                dropZone.style.borderColor = '';
                dropZone.style.backgroundColor = '';
            }, 600);
        } else {
            // Return to baseline rotation
            card.style.transform = `rotate(${baseRotation}deg)`;
        }
    }
});


// 2. Proximity-based Magnetic Buttons (with collision loop prevention)
const magneticBtns = document.querySelectorAll('.magnetic-btn');

document.addEventListener('mousemove', (e) => {
    magneticBtns.forEach(btn => {
        // Read previous translations to reconstruct original stable center coordinates
        const tx = parseFloat(btn.dataset.tx) || 0;
        const ty = parseFloat(btn.dataset.ty) || 0;

        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - tx;
        const centerY = rect.top + rect.height / 2 - ty;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const proximity = 100; // 100px activation proximity radius

        if (distance < proximity) {
            // Smoothly pull button towards cursor position relative to distance
            const force = (proximity - distance) / proximity;
            const pullX = deltaX * 0.45 * force;
            const pullY = deltaY * 0.45 * force;

            btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
            btn.style.transition = 'none'; // Unbind transitions for active tracking
            btn.dataset.tx = pullX;
            btn.dataset.ty = pullY;
        } else {
            // Elastic snap back using spring cubic-bezier easing
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            btn.dataset.tx = 0;
            btn.dataset.ty = 0;
        }
    });
});


// 3. Canvas Confetti Celebration Widget (pointer-events: none enabled)
const checklistCard = document.getElementById('checklist-card');
const checklistItems = document.querySelectorAll('.checklist-item');

checklistItems.forEach(item => {
    item.addEventListener('change', (e) => {
        const span = e.target.nextElementSibling;
        if (e.target.checked) {
            span.classList.add('line-through', 'opacity-50');
        } else {
            span.classList.remove('line-through', 'opacity-50');
        }

        // Verify if all checklist items are completed
        const allChecked = Array.from(checklistItems).every(cb => cb.checked);
        if (allChecked) {
            triggerConfettiExplosion();
        }
    });
});

function triggerConfettiExplosion() {
    if (!checklistCard) return;

    let canvas = document.getElementById('confetti-canvas');
    if (canvas) return; // Ignore if animation is currently active

    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.pointerEvents = 'none'; // Ensure canvas doesn't intercept UI events
    checklistCard.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const cardRect = checklistCard.getBoundingClientRect();

    canvas.width = cardRect.width;
    canvas.height = cardRect.height;

    const colors = ['#FACC15', '#FB923C', '#34D399', '#1A1C1A'];
    const shapes = ['square', 'circle', 'triangle'];
    const particles = [];

    // Instantiate 45 pop-art geometric particles
    for (let i = 0; i < 45; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height - 40,
            vx: (Math.random() - 0.5) * 10,
            vy: -Math.random() * 8 - 5,
            size: Math.random() * 8 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            rotation: Math.random() * 360,
            vRotation: (Math.random() - 0.5) * 8,
            opacity: 1
        });
    }

    const gravity = 0.25;
    let animationFrameId;

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeCount = 0;

        particles.forEach(p => {
            if (p.opacity <= 0) return;
            activeCount++;

            // Apply simple 2D particle physics
            p.vy += gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRotation;

            // Bounce off boundaries of card box container
            if (p.x - p.size < 0) {
                p.x = p.size;
                p.vx = -p.vx * 0.6;
            }
            if (p.x + p.size > canvas.width) {
                p.x = canvas.width - p.size;
                p.vx = -p.vx * 0.6;
            }
            if (p.y + p.size > canvas.height) {
                p.y = canvas.height - p.size;
                p.vy = -p.vy * 0.5;
                p.vx *= 0.8;
            }

            p.opacity -= 0.015;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;

            if (p.shape === 'square') {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            } else if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -p.size / 2);
                ctx.lineTo(-p.size / 2, p.size / 2);
                ctx.lineTo(p.size / 2, p.size / 2);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        });

        if (activeCount > 0) {
            animationFrameId = requestAnimationFrame(render);
        } else {
            cancelAnimationFrame(animationFrameId);
            canvas.remove();
        }
    }

    render();
}


// 4. Bento Layout Theme Hot-Swap
const colorDots = document.querySelectorAll('.color-dot');
const colorVibesCard = document.getElementById('color-vibes-card');
const themeLabel = document.getElementById('theme-label');

colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
        if (!colorVibesCard) return;

        // Reset class defaults
        colorVibesCard.className = 'md:col-span-3 border-4 border-on-background p-8 brutalist-card flex flex-col justify-between transition-colors duration-300';
        
        const bgClass = dot.dataset.class;
        const textClass = dot.dataset.textClass || 'text-on-background';
        const label = dot.dataset.label;

        colorVibesCard.classList.add(bgClass);

        if (themeLabel) {
            themeLabel.className = 'font-label-md text-label-md mt-6 uppercase ' + textClass;
            themeLabel.textContent = `ЦВЕТОВАЯ СХЕМА: ${label}`;
        }

        const heading = colorVibesCard.querySelector('h3');
        if (heading) {
            heading.className = 'font-headline-md text-headline-md uppercase mb-4 leading-tight ' + textClass;
        }
    });
});


// 5. Split Block Cursor Trailing Graphics
const splitSection = document.getElementById('split-section');
const splitLeft = document.getElementById('split-left');
const splitRight = document.getElementById('split-right');
const splitTooltip = document.getElementById('split-tooltip');

if (splitSection && splitTooltip) {
    splitLeft.addEventListener('mouseenter', () => {
        splitLeft.classList.add('cursor-none');
        splitTooltip.classList.remove('hidden');
        splitTooltip.textContent = ':(';
        splitTooltip.style.backgroundColor = '#D1D5DB';
    });

    splitLeft.addEventListener('mouseleave', () => {
        splitLeft.classList.remove('cursor-none');
        splitTooltip.classList.add('hidden');
    });

    splitRight.addEventListener('mouseenter', () => {
        splitRight.classList.add('cursor-none');
        splitTooltip.classList.remove('hidden');
        splitTooltip.textContent = ':)';
        splitTooltip.style.backgroundColor = '#34D399';
    });

    splitRight.addEventListener('mouseleave', () => {
        splitRight.classList.remove('cursor-none');
        splitTooltip.classList.add('hidden');
    });

    splitSection.addEventListener('mousemove', (e) => {
        // Offset tooltip relative to client coordinates
        splitTooltip.style.left = `${e.clientX + 15}px`;
        splitTooltip.style.top = `${e.clientY + 15}px`;
    });
}


// 6. Form Dispatch Beta Modal Stage
const betaModal = document.getElementById('beta-modal');
const closeBetaModal = document.getElementById('close-beta-modal');
const betaForm = document.getElementById('beta-form');
const betaContent = document.getElementById('beta-content');
const betaSuccess = document.getElementById('beta-success');
const closeBetaSuccess = document.getElementById('close-beta-success');

function openBetaModal() {
    if (betaModal) {
        betaModal.classList.remove('hidden');
        betaContent.classList.remove('hidden');
        betaSuccess.classList.add('hidden');
        betaForm.reset();
    }
}

function closeBeta() {
    if (betaModal) {
        betaModal.classList.add('hidden');
    }
}

document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBetaModal();
    });
});

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

        const name = document.getElementById('beta-name').value;
        const email = document.getElementById('beta-email').value;

        // Persist to local storage
        const betaUser = {
            name,
            email,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('cluster_beta_user', JSON.stringify(betaUser));

        // Shift layout to success screen
        betaContent.classList.add('hidden');
        betaSuccess.classList.remove('hidden');
    });
}
