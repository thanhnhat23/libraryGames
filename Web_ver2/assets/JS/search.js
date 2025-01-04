const search = document.getElementById('query');
const cards = document.querySelectorAll('.card');
search.addEventListener('input', () => {
    const searchTerm = search.value.toLowerCase();
    cards.forEach(card => {
        const category = card.querySelector('.card-category').textContent.toLowerCase();
        if (category.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});