document.addEventListener("DOMContentLoaded", () => {
    
    // Inicialização da biblioteca de animações (AOS)
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
        });
    }

    // Inicializa Swiper
    var swiperContainer = document.querySelector(".vitrineSwiper");
    if(swiperContainer) {
        var swiper = new Swiper(".vitrineSwiper", {
            slidesPerView: 1,
            effect: "fade", 
            autoplay: {
                delay: 3500, 
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }

    // --- 1. Efeito do Navbar ao rolar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('py-2', 'shadow-lg');
            navbar.classList.remove('py-3', 'shadow-sm');
        } else {
            navbar.classList.add('py-3', 'shadow-sm');
            navbar.classList.remove('py-2', 'shadow-lg');
        }
    });

    // --- 2. Lógica Inteligente de Status da Loja (Estilo Premium) ---
    function updateStoreStatus() {
        const now = new Date();
        const hour = now.getHours();
        
        // Verifica os status
        const isOpen = hour >= 8 && hour < 19;
        const isMorningClosed = hour < 8;

        const heroStatusBtn = document.getElementById('hero-status-indicator');
        const heroStatusIcon = document.getElementById('hero-status-icon');
        const heroStatusText = document.getElementById('hero-status-text');

        if (heroStatusBtn && heroStatusIcon && heroStatusText) {
            
            // Base Premium Indicator Classes
            const baseClass = "inline-flex items-center gap-4 px-8 py-3 rounded-full border-2 shadow-xl text-base font-bold transition-all transform hover:scale-105 ";

            if (isOpen) {
                // ABERTO
                heroStatusBtn.className = baseClass + 'bg-white border-green-500 text-green-600 shadow-green-100';
                heroStatusIcon.innerHTML = `
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                `;
                heroStatusText.textContent = 'LOJA ABERTA AGORA';
                
            } else {
                // FECHADO
                heroStatusBtn.className = baseClass + 'bg-stone-800 border-stone-700 text-white shadow-stone-200';
                heroStatusIcon.innerHTML = '<i class="ph ph-moon-stars text-xl text-blue-300"></i>';
                heroStatusText.textContent = isMorningClosed ? 'ABRIREMOS ÀS 08H' : 'FECHADO • ABRIMOS ÀS 08H';
            }
        }
    }

    // Executa na hora e atualiza a cada 1 minuto
    updateStoreStatus();
    setInterval(updateStoreStatus, 60000);

    // --- 3. Ano automático no rodapé ---
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 4. Lógica da Bíblia 3D Definitiva ---
    const verses = [
        { text: '"O Senhor é o meu pastor, e nada me faltará."', reference: 'Salmos 23:1' },
        { text: '"Tudo posso naquele que me fortalece."', reference: 'Filipenses 4:13' },
        { text: '"Entrega o teu caminho ao Senhor; confia nele, e ele o fará."', reference: 'Salmos 37:5' },
        { text: '"Porque para Deus nada é impossível."', reference: 'Lucas 1:37' },
        { text: '"O choro pode durar uma noite, mas a alegria vem pela manhã."', reference: 'Salmos 30:5' },
        { text: '"Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."', reference: 'Salmos 119:105' },
        { text: '"Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia."', reference: 'Salmos 46:1' },
        { text: '"Eu sou o caminho, e a verdade e a vida."', reference: 'João 14:6' }
    ];

    const verseText = document.getElementById('verse-text');
    const verseReference = document.getElementById('verse-reference');
    const newVerseButton = document.getElementById('new-verse-button');
    const theBible = document.getElementById('the-bible');
    const biblePages = document.getElementById('bible-pages');
    let currentVerseIndex = 0;
    let isBibleOpen = false;

    // Coloca o texto inicial
    if (verseText && verseReference && theBible) {
        currentVerseIndex = Math.floor(Math.random() * verses.length);
        verseText.textContent = verses[currentVerseIndex].text;
        verseReference.textContent = verses[currentVerseIndex].reference;
    }

    function interactWithBible() {
        if (!verseText || !verseReference || !newVerseButton || !theBible) return;

        // Se estiver fechada, abre a capa
        if (!isBibleOpen) {
            theBible.classList.add('is-open');
            isBibleOpen = true;
            
            // Faz o botão aparecer
            setTimeout(() => {
                newVerseButton.style.opacity = '1';
                newVerseButton.style.transform = 'translateY(0)';
                newVerseButton.style.pointerEvents = 'auto';
            }, 1000);
            return;
        }

        // Se já está aberta, vira a página
        // 1. Pega o conteúdo atual da página
        const pageContent = biblePages.innerHTML;
        
        // 2. Cria a página falsa que vai girar
        const flippingPage = document.createElement('div');
        flippingPage.className = 'page-flip-anim flex flex-col items-center justify-center text-center p-12';
        flippingPage.innerHTML = pageContent;
        
        // 3. Adiciona a página girando por cima de tudo
        theBible.appendChild(flippingPage);

        // 4. Troca o texto real "por baixo" instantaneamente
        let nextIndex = currentVerseIndex;
        while (nextIndex === currentVerseIndex && verses.length > 1) {
            nextIndex = Math.floor(Math.random() * verses.length);
        }
        currentVerseIndex = nextIndex;
        
        // Pequeno delay para a troca de texto não ser visível antes da página cobrir
        setTimeout(() => {
            verseText.textContent = verses[currentVerseIndex].text;
            verseReference.textContent = verses[currentVerseIndex].reference;
        }, 150);

        // 5. Destrói o elemento animado quando a animação acabar (1200ms)
        setTimeout(() => {
            if (flippingPage.parentNode) {
                flippingPage.parentNode.removeChild(flippingPage);
            }
        }, 1200);
    }

    // Eventos de clique da Bíblia
    if (theBible) {
        theBible.addEventListener('click', () => {
            if (!isBibleOpen) interactWithBible();
        });
    }
    if (newVerseButton) {
        newVerseButton.addEventListener('click', interactWithBible);
    }

    // --- 5. Lógica do Modal de Telefones ---
    const fabButton = document.getElementById('fab-button');
    const phoneModal = document.getElementById('phone-modal');
    const closeModal = document.getElementById('close-modal');
    const modalContent = document.getElementById('phone-modal-content');
    const modalTriggers = document.querySelectorAll('[data-open-phone-modal]');

    function openModal(e) {
        if(e) e.preventDefault();
        phoneModal.classList.remove('hidden');
        phoneModal.classList.add('flex');
        
        void phoneModal.offsetWidth;
        
        phoneModal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }

    function hideModal() {
        phoneModal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            phoneModal.classList.remove('flex');
            phoneModal.classList.add('hidden');
        }, 300);
    }

    if (fabButton) fabButton.addEventListener('click', openModal);
    modalTriggers.forEach((trigger) => trigger.addEventListener('click', openModal));
    if (closeModal) closeModal.addEventListener('click', hideModal);
    
    if (phoneModal) {
        phoneModal.addEventListener('click', (e) => {
            if (e.target === phoneModal) hideModal();
        });
    }
});
