// NIL Landing Page & Editor Main Application Logic

// 1. HERO TERMINAL SIMULATOR
const TERMINAL_LINES = [
    { text: "# NIL_CORE_ARCHITECTURE", type: "header" },
    { text: "", type: "empty" },
    { text: "- Local-first persistence", type: "list" },
    { text: "- Markdown native rendering", type: "list" },
    { text: "- Vim-inspired bindings", type: "list-highlight" },
    { text: "- Sub-50ms latency", type: "list" },
    { text: "", type: "empty" },
    { text: "## [ STATUS ]", type: "header-secondary" },
    { text: "The system is currently optimal.", type: "text" },
    { text: "Waiting for input...", type: "text" },
    { text: "", type: "empty" },
    { text: "> ", type: "prompt" }
];

function initHeroTypewriter() {
    const codeEl = document.getElementById('hero-terminal-code');
    if (!codeEl) return;
    
    let currentLineIdx = 0;
    let currentCharIdx = 0;
    let completedLines = [];
    
    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    
    function render() {
        let html = '';
        completedLines.forEach((line, index) => {
            const lineNum = String(index + 1).padStart(2, '0');
            let content = '';
            if (line.type === 'list-highlight') {
                content = `- <span class="bg-primary text-on-primary px-1">Vim-inspired bindings</span>`;
            } else {
                content = escapeHTML(line.text);
            }
            html += `<span class="text-on-surface-variant select-none">${lineNum}</span> ${content}\n`;
        });
        
        if (currentLineIdx < TERMINAL_LINES.length) {
            const line = TERMINAL_LINES[currentLineIdx];
            const lineNum = String(currentLineIdx + 1).padStart(2, '0');
            const typedText = line.text.substring(0, currentCharIdx);
            
            let content = '';
            if (line.type === 'list-highlight') {
                if (typedText.startsWith('- ')) {
                    const rest = typedText.substring(2);
                    content = `- <span class="bg-primary text-on-primary px-1">${escapeHTML(rest)}</span>`;
                } else {
                    content = escapeHTML(typedText);
                }
            } else {
                content = escapeHTML(typedText);
            }
            
            html += `<span class="text-on-surface-variant select-none">${lineNum}</span> ${content}<span class="inline-block w-2.5 h-4 bg-primary align-middle animate-pulse ml-0.5"></span>\n`;
        }
        
        codeEl.innerHTML = html;
    }
    
    function type() {
        if (currentLineIdx >= TERMINAL_LINES.length) {
            render();
            return;
        }
        
        const line = TERMINAL_LINES[currentLineIdx];
        if (line.text === "") {
            completedLines.push(line);
            currentLineIdx++;
            currentCharIdx = 0;
            render();
            setTimeout(type, 150);
        } else if (currentCharIdx < line.text.length) {
            currentCharIdx++;
            render();
            
            let delay = 20 + Math.random() * 30; // base speed 20-50ms
            const lastChar = line.text[currentCharIdx - 1];
            if (lastChar === '.' || lastChar === ',' || lastChar === ':' || lastChar === ']' || lastChar === '#') {
                delay += 150;
            }
            setTimeout(type, delay);
        } else {
            completedLines.push(line);
            currentLineIdx++;
            currentCharIdx = 0;
            render();
            setTimeout(type, 300);
        }
    }
    
    type();
}

// 2. LIVE PREVIEW LOGIC
function initLivePreview() {
    const canvas = document.getElementById('preview-canvas');
    const statsEl = document.getElementById('preview-stats');
    const gutter = document.getElementById('preview-gutter');
    const badge = document.getElementById('preview-badge');
    const memEl = document.getElementById('preview-mem-usage');
    if (!canvas) return;
    
    function updateStats() {
        // innerText preserves newlines correctly
        const text = canvas.innerText || canvas.textContent || '';
        const charCount = text.length;
        
        const lines = text.split('\n');
        const lineCount = lines.length;
        
        // Update gutter
        let gutterHTML = '';
        for (let i = 1; i <= Math.max(lineCount, 12); i++) {
            gutterHTML += `<span>${i}</span>`;
        }
        gutter.innerHTML = gutterHTML;
        
        // Memory usage
        const baseKB = 12.0;
        const totalKB = (baseKB + charCount / 1024).toFixed(1);
        if (memEl) {
            memEl.innerText = `[ MEM: ${totalKB}KB / 512KB ]`;
        }
        
        // Cursor position
        const selection = window.getSelection();
        let lineNum = 1;
        let colNum = 1;
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(canvas);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            const caretOffset = preCaretRange.toString().length;
            
            const linesBefore = text.substring(0, caretOffset).split('\n');
            lineNum = linesBefore.length;
            colNum = linesBefore[linesBefore.length - 1].length + 1;
        }
        
        if (statsEl) {
            statsEl.innerText = `L: ${lineNum} / C: ${colNum}`;
        }
        if (badge) {
            badge.innerText = "MODIFIED";
            badge.className = "text-[10px] bg-primary text-on-primary px-1";
        }
    }
    
    canvas.addEventListener('input', updateStats);
    canvas.addEventListener('keyup', updateStats);
    canvas.addEventListener('click', updateStats);
    
    // Initial gutter load
    updateStats();
}

// 3. EDITOR ROUTING & VISUAL TRANSITIONS
let isEditorOpen = false;

function launchEditor() {
    if (isEditorOpen) return;
    isEditorOpen = true;
    
    const landing = document.getElementById('landing-page-view');
    const editor = document.getElementById('editor-view');
    const textarea = document.getElementById('editor-textarea');
    
    // Load persisted text
    const savedText = localStorage.getItem('nil_buffer_text') || '';
    textarea.value = savedText;
    
    // Start transition
    editor.classList.remove('hidden');
    // Force browser reflow to register class change
    editor.offsetHeight;
    editor.classList.remove('opacity-0');
    editor.classList.add('opacity-100');
    
    setTimeout(() => {
        landing.classList.add('hidden');
        textarea.focus();
        
        updateEditorLineNumbers();
        updateEditorStats();
    }, 200);
}

function exitEditor() {
    if (!isEditorOpen) return;
    isEditorOpen = false;
    
    const landing = document.getElementById('landing-page-view');
    const editor = document.getElementById('editor-view');
    
    landing.classList.remove('hidden');
    // Force browser reflow
    landing.offsetHeight;
    
    editor.classList.remove('opacity-100');
    editor.classList.add('opacity-0');
    
    setTimeout(() => {
        editor.classList.add('hidden');
    }, 200);
}

function setupEditorTriggers() {
    const triggers = document.querySelectorAll('.launch-editor-trigger');
    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            launchEditor();
        });
    });
    
    const exitBtn = document.getElementById('exit-editor-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exitEditor();
        });
    }
    
    window.addEventListener('keydown', (e) => {
        // Esc to exit editor
        if (e.key === 'Escape' && isEditorOpen) {
            e.preventDefault();
            exitEditor();
        }
        
        // Enter to launch editor
        if (e.key === 'Enter' && !isEditorOpen) {
            const activeEl = document.activeElement;
            const isEditable = activeEl && (
                activeEl.tagName === 'INPUT' || 
                activeEl.tagName === 'TEXTAREA' || 
                activeEl.contentEditable === 'true'
            );
            if (!isEditable) {
                e.preventDefault();
                launchEditor();
            }
        }
    });
}

// 4. EDITOR WORKSPACE LOGIC
let saveIndicatorTimeout = null;

function updateEditorLineNumbers() {
    const textarea = document.getElementById('editor-textarea');
    const gutter = document.getElementById('editor-gutter');
    if (!textarea || !gutter) return;
    
    const lines = textarea.value.split('\n');
    const lineCount = Math.max(lines.length, 1);
    
    let html = '';
    for (let i = 1; i <= lineCount; i++) {
        html += `<span>${i}</span>`;
    }
    gutter.innerHTML = html;
    gutter.scrollTop = textarea.scrollTop;
}

function updateEditorStats() {
    const textarea = document.getElementById('editor-textarea');
    if (!textarea) return;
    
    const text = textarea.value;
    const charCount = text.length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Find cursor L and C
    const selStart = textarea.selectionStart;
    const linesBefore = text.substring(0, selStart).split('\n');
    const lineNum = linesBefore.length;
    const colNum = linesBefore[linesBefore.length - 1].length + 1;
    
    const statsEl = document.getElementById('editor-stats');
    if (statsEl) {
        statsEl.innerText = `CHARS: ${charCount} / WORDS: ${wordCount} | L: ${lineNum} / C: ${colNum}`;
    }
    
    const memEl = document.getElementById('editor-mem-usage');
    if (memEl) {
        const kb = (charCount / 1024).toFixed(3);
        memEl.innerText = `[ MEM: ${kb}KB / 512KB ]`;
    }
}

function triggerSaveFlash() {
    const indicator = document.getElementById('editor-save-indicator');
    if (!indicator) return;
    
    indicator.classList.remove('opacity-0');
    indicator.classList.add('opacity-100');
    
    if (saveIndicatorTimeout) clearTimeout(saveIndicatorTimeout);
    saveIndicatorTimeout = setTimeout(() => {
        indicator.classList.remove('opacity-100');
        indicator.classList.add('opacity-0');
    }, 1500);
}

function setupEditorLogic() {
    const textarea = document.getElementById('editor-textarea');
    const gutter = document.getElementById('editor-gutter');
    if (!textarea) return;
    
    textarea.addEventListener('input', () => {
        localStorage.setItem('nil_buffer_text', textarea.value);
        updateEditorLineNumbers();
        updateEditorStats();
    });
    
    // Selection listeners for stats
    textarea.addEventListener('keyup', updateEditorStats);
    textarea.addEventListener('click', updateEditorStats);
    textarea.addEventListener('select', updateEditorStats);
    
    // Scroll sync
    textarea.addEventListener('scroll', () => {
        if (gutter) {
            gutter.scrollTop = textarea.scrollTop;
        }
    });
    
    // Ctrl+S / Cmd+S save override
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            triggerSaveFlash();
        }
    });
}

// 5. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initHeroTypewriter();
    initLivePreview();
    setupEditorTriggers();
    setupEditorLogic();
});
