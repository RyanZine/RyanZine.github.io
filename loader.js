// Sistema de carregamento Brasa Viva
const loading = {
    // duração mínima em milissegundos que o loader deve permanecer visível
    minDuration: 1500,
    show: function (message = "Carregando...") {
        if (document.querySelector('.BrasaViva-Loader')) return; // Evita múltiplos loaders
        const loader = document.createElement('div');
        loader.className = 'BrasaViva-Loader';
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-live', 'polite');
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner" aria-hidden="true"></div>
                <img src="BrasaViva/brasatransparente.png" alt="Logo Brasa Viva: brasas vermelhas formando o nome do restaurante" class="loader-image" aria-hidden="true">
            </div>
            <p class="loader-message">${message}</p>
        `;
        // registrar timestamp de exibição para respeitar minDuration
        loader.dataset.shownAt = Date.now();
        document.body.appendChild(loader);
        // Usar requestAnimationFrame para acionar transições CSS de forma confiável
        requestAnimationFrame(() => loader.classList.add('show'));
    },
    hide: function () {
        const loader = document.querySelector('.BrasaViva-Loader');
        if (loader) {
            const shownAt = parseInt(loader.dataset.shownAt, 10) || 0;
            const elapsed = Date.now() - shownAt;
            const remaining = Math.max(0, (this.minDuration || 0) - elapsed);
            // esperar o restante (se houver) antes de iniciar a transição de ocultar
            setTimeout(() => {
                loader.classList.remove('show');
                setTimeout(() => loader.remove(), 300);
            }, remaining);
        }
    }
};

// Expor API global para uso manual em outros scripts ou console
window.BrasaVivaLoading = loading;

// Mostrar loader automaticamente na carga inicial e esconder quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', () => {
    loading.show();
});

window.addEventListener('load', () => {
    loading.hide();
});