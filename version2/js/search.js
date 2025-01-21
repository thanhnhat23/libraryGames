document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('query');
    const searchMedium = document.getElementById('query-medium');
    const cards = document.querySelectorAll('.card');
    const noResults = document.getElementById('no-results');

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
            const category = card.querySelector('.card-category').textContent.trim().toLowerCase();
            if (category.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    };

    search.addEventListener('input', handleSearch);
    searchMedium.addEventListener('input', handleSearch);
});
