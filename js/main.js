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
});