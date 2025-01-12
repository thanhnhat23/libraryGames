const search = document.getElementById('query');
const cards = document.querySelectorAll('.card');
const noResults = document.getElementById('no-results'); // Phần tử thông báo

search.addEventListener('input', () => {
    const searchTerm = search.value.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.querySelector('.card-category').textContent.toLowerCase();
        if (category.includes(searchTerm)) {
            card.classList.remove('hidden');
            visibleCount++; // Đếm số thẻ hiển thị
        } else {
            card.classList.add('hidden');
        }
    });

    // Kiểm tra nếu không có thẻ nào hiển thị
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
});