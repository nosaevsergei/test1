// 1. FLOATING HEADER LOGIC
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        // Scrolled state: premium glassmorphic feel, snapped closer to top
        navbar.classList.remove('bg-white/3', 'border-white/10', 'top-4');
        navbar.classList.add('bg-zinc-950/80', 'backdrop-blur-md', 'border-white/5', 'top-2', 'shadow-2xl');
    } else {
        // Initial state: transparent, floating
        navbar.classList.remove('bg-zinc-950/80', 'backdrop-blur-md', 'border-white/5', 'top-2', 'shadow-2xl');
        navbar.classList.add('bg-white/3', 'backdrop-blur-xl', 'border-white/10', 'top-4');
    }
});


// 2. HERO DASHBOARD SIMULATION: SVG CHART & TOOLTIPS
const points = document.querySelectorAll('.chart-point');
const tooltip = document.getElementById('chart-tooltip');
const tooltipMonth = document.getElementById('tooltip-month');
const tooltipValue = document.getElementById('tooltip-value');
const svgElement = document.querySelector('svg');

points.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
        const month = point.getAttribute('data-month');
        const value = point.getAttribute('data-value');
        
        tooltipMonth.textContent = month;
        tooltipValue.textContent = value;
        tooltip.classList.remove('hidden');
        tooltip.classList.add('animate-fade-in-up');
        
        positionTooltip(point);
    });

    point.addEventListener('mousemove', () => {
        positionTooltip(point);
    });

    point.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
        tooltip.classList.remove('animate-fade-in-up');
    });
});

function positionTooltip(point) {
    const cx = parseFloat(point.getAttribute('cx'));
    const cy = parseFloat(point.getAttribute('cy'));
    
    // Get bounding box of SVG to calculate position dynamically
    const svgRect = svgElement.getBoundingClientRect();
    const containerRect = document.getElementById('chart-card').getBoundingClientRect();
    
    // Convert SVG local coordinates (0-600, 0-200) to actual pixels
    const pixelX = (cx / 600) * svgRect.width + (svgRect.left - containerRect.left);
    const pixelY = (cy / 200) * svgRect.height + (svgRect.top - containerRect.top);
    
    tooltip.style.left = `${pixelX}px`;
    tooltip.style.top = `${pixelY - 12}px`; // Offset above the circle
}


// 3. BENTO GRID: INTERACTIVE EXPENSE CALCULATOR
const checkboxesContainer = document.getElementById('calculator-checkboxes');
const checkboxes = checkboxesContainer.querySelectorAll('input[type="checkbox"]');
const totalAnnualEl = document.getElementById('calc-total-annual');

function calculateTotal() {
    let sum = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) {
            sum += parseInt(cb.value);
        }
    });
    
    const annualTotal = sum * 12;
    
    // Simple counter animation trigger
    totalAnnualEl.textContent = `${annualTotal.toLocaleString('ru-RU')} ₽`;
    totalAnnualEl.classList.remove('counter-change');
    void totalAnnualEl.offsetWidth; // Trigger reflow to restart css animation
    totalAnnualEl.classList.add('counter-change');
}

// Attach change listeners to calculator items
checkboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
});

// Run initial calculation
calculateTotal();


// 4. MARKETING PRICING TOGGLE
const billingToggle = document.getElementById('billing-toggle');
const billingToggleKnob = document.getElementById('billing-toggle-knob');
const proPriceEl = document.getElementById('pro-price');
const proSubtextEl = document.getElementById('pro-subtext');
const billingMonthlyText = document.getElementById('billing-monthly-text');
const billingAnnualText = document.getElementById('billing-annual-text');

let isAnnual = false;

billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    
    if (isAnnual) {
        // Toggle knob animation and container background
        billingToggleKnob.classList.remove('translate-x-0');
        billingToggleKnob.classList.add('translate-x-6');
        billingToggle.classList.add('bg-brand-indigo/30');
        
        // Update label text colors
        billingMonthlyText.classList.remove('text-white');
        billingMonthlyText.classList.add('text-on-surface-variant');
        billingAnnualText.classList.remove('text-on-surface-variant');
        billingAnnualText.classList.add('text-white');
        
        // Update Pricing Card Value (199 * 0.8 = 159.2 -> 159 ₽)
        proPriceEl.textContent = '159 ₽';
        proSubtextEl.classList.remove('opacity-0');
        proSubtextEl.classList.add('opacity-100');
    } else {
        // Reset knob
        billingToggleKnob.classList.remove('translate-x-6');
        billingToggleKnob.classList.add('translate-x-0');
        billingToggle.classList.remove('bg-brand-indigo/30');
        
        // Reset label text colors
        billingMonthlyText.classList.remove('text-on-surface-variant');
        billingMonthlyText.classList.add('text-white');
        billingAnnualText.classList.remove('text-white');
        billingAnnualText.classList.add('text-on-surface-variant');
        
        // Reset Pricing Card Value
        proPriceEl.textContent = '199 ₽';
        proSubtextEl.classList.remove('opacity-100');
        proSubtextEl.classList.add('opacity-0');
    }
});


// 5. CLOSED BETA MODAL SYSTEM
const ctaButtons = document.querySelectorAll('.cta-btn');
const betaModal = document.getElementById('beta-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = betaModal.querySelector('.modal-content');
const modalClose = document.getElementById('modal-close');
const betaForm = document.getElementById('beta-form');
const betaContent = document.getElementById('beta-content');
const betaSuccess = document.getElementById('beta-success');
const betaEmailInput = document.getElementById('beta-email');

// Open Modal
function openModal() {
    betaModal.classList.remove('hidden');
    betaModal.classList.add('flex');
    
    // Force transition after displaying
    setTimeout(() => {
        modalBackdrop.classList.remove('opacity-0');
        modalBackdrop.classList.add('opacity-100');
        modalContent.classList.remove('scale-90', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        betaEmailInput.focus();
    }, 10);
}

// Close Modal
function closeModal() {
    modalBackdrop.classList.remove('opacity-100');
    modalBackdrop.classList.add('opacity-0');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-90', 'opacity-0');
    
    // Wait for animation to finish
    setTimeout(() => {
        betaModal.classList.remove('flex');
        betaModal.classList.add('hidden');
        
        // Reset modal layout view
        betaContent.classList.remove('hidden');
        betaSuccess.classList.add('hidden');
        betaForm.reset();
    }, 300);
}

// Attach open actions to CTA buttons
ctaButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
});

// Attach close actions
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Form submission handler
betaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = betaEmailInput.value.trim();
    
    if (email) {
        // Collect in localStorage
        try {
            let emails = JSON.parse(localStorage.getItem('beta_emails') || '[]');
            if (!emails.includes(email)) {
                emails.push(email);
                localStorage.setItem('beta_emails', JSON.stringify(emails));
            }
        } catch (err) {
            console.error('Error saving mock email to localStorage:', err);
        }
        
        // Animate success screen entrance
        betaContent.classList.add('hidden');
        betaSuccess.classList.remove('hidden');
        
        // Auto-close modal after 2.5 seconds
        setTimeout(closeModal, 2500);
    }
});


// 6. PREMIUM 3D PARALLAX TILT EFFECT FOR GLASS CARDS
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        // Skip tilting if it is inside the dashboard layout (except the chart itself) or is the modal box itself
        if (card.classList.contains('modal-content')) return;

        const rect = card.getBoundingClientRect();
        const isHovered = (
            e.clientX >= rect.left && 
            e.clientX <= rect.right && 
            e.clientY >= rect.top && 
            e.clientY <= rect.bottom
        );

        if (isHovered) {
            const moveX = (e.clientX - (rect.left + rect.width / 2)) * 0.015;
            const moveY = (e.clientY - (rect.top + rect.height / 2)) * 0.015;
            card.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) translateY(-4px)`;
        } else {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        }
    });
});
