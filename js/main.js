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
        const isNightClosed = hour >= 19;

        const heroStatusBtn = document.getElementById('hero-status-indicator');
        const heroStatusIcon = document.getElementById('hero-status-icon');
        const heroStatusText = document.getElementById('hero-status-text');

        if (heroStatusBtn && heroStatusIcon && heroStatusText) {
            
            // Base Premium Button Classes
            const baseBtnClass = "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 w-full sm:w-auto hover:shadow-lg ";

            if (isOpen) {
                // ABERTO: Design Escuro Premium com Pulso Verde
                heroStatusBtn.className = baseBtnClass + 'bg-status-open text-white hover:bg-black group border-premium hover:-translate-y-1';
                
                heroStatusIcon.innerHTML = `
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                    </span>
                `;
                heroStatusIcon.className = "group-hover:scale-110 transition-transform";
                heroStatusText.className = "transition-colors group-hover:text-green-200";
                heroStatusText.textContent = 'Loja Aberta';
                heroStatusBtn.href = "#produtos";
                
            } else if (isMorningClosed) {
                // FECHADO DE MANHÃ
                heroStatusBtn.className = baseBtnClass + 'bg-white border-premium text-gray-500 premium-shadow cursor-default hover:shadow-sm';
                heroStatusIcon.innerHTML = '<i class="ph-fill ph-sun text-2xl text-amber-400"></i>';
                heroStatusText.className = "text-gray-500 font-medium";
                heroStatusText.textContent = 'Abriremos às 08h';
                heroStatusBtn.removeAttribute('href'); 
                
            } else if (isNightClosed) {
                // FECHADO DE NOITE
                heroStatusBtn.className = baseBtnClass + 'bg-white border-premium text-gray-500 premium-shadow cursor-default hover:shadow-sm';
                heroStatusIcon.innerHTML = '<i class="ph-fill ph-moon text-2xl text-blue-300"></i>';
                heroStatusText.className = "text-gray-500 font-medium";
                heroStatusText.textContent = 'Fechado - Abrimos amanhã às 08h';
                heroStatusBtn.removeAttribute('href'); 
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
        { text: '"O choro pode durar uma noite, mas a alegria vem pela manhã."', reference: 'Salmos 30:5' }
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
            }, 800);
            return;
        }

        // Se já está aberta, vira a página
        // 1. Pega o conteúdo atual da página
        const pageContent = biblePages.innerHTML;
        
        // 2. Cria a página falsa que vai girar
        const flippingPage = document.createElement('div');
        flippingPage.className = 'page-flip-anim flex flex-col items-center justify-center text-center';
        flippingPage.innerHTML = pageContent;
        
        // 3. Adiciona a página girando por cima de tudo
        theBible.appendChild(flippingPage);

        // 4. Troca o texto real "por baixo" instantaneamente
        let nextIndex = currentVerseIndex;
        while (nextIndex === currentVerseIndex && verses.length > 1) {
            nextIndex = Math.floor(Math.random() * verses.length);
        }
        currentVerseIndex = nextIndex;
        verseText.textContent = verses[currentVerseIndex].text;
        verseReference.textContent = verses[currentVerseIndex].reference;

        // 5. Destrói o elemento animado quando a animação acabar (800ms)
        setTimeout(() => {
            if (flippingPage.parentNode) {
                flippingPage.parentNode.removeChild(flippingPage);
            }
        }, 800);
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
