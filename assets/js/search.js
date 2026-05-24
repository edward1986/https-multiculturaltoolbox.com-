document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('service-search');
    if (!searchInput) return;

    const serviceCards = document.querySelectorAll('.service-cat-grid .card');
    const categories = document.querySelectorAll('.service-cat-title');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();

        serviceCards.forEach(card => {
            const h3 = card.querySelector('h3');
            const desc = card.querySelector('.card-desc');

            const titleText = h3 ? h3.textContent.toLowerCase() : '';
            const descText = desc ? desc.textContent.toLowerCase() : '';

            if (titleText.includes(query) || descText.includes(query)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        // Hide categories if no visible cards
        categories.forEach(cat => {
            const grid = cat.nextElementSibling;
            if (grid && grid.classList.contains('service-cat-grid')) {
                const visibleCards = grid.querySelectorAll('.card:not(.hidden)');
                if (visibleCards.length === 0 && query !== '') {
                    cat.classList.add('hidden');
                    grid.classList.add('hidden');
                } else {
                    cat.classList.remove('hidden');
                    grid.classList.remove('hidden');
                }
            }
        });
    });
});
