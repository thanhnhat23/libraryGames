const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const more = document.querySelectorAll(".more");
let currentIndex = 0;
// Đánh dấu dot đầu tiên là active
updateDots();
updateMoreOpacity();
function updateSlides() {
    const translateX = -currentIndex * 100; // Tính toán vị trí di chuyển
    document.querySelector(".slides").style.transform = `translateX(${translateX}%)`;
    updateDots();
    updateMoreOpacity();
}
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}
// Hiển thị lại opacity cho button "Xem thêm"
function updateMoreOpacity() {
  more.forEach((button, index) => {
      button.style.opacity = index === currentIndex ? 1 : 0; // Đặt opacity
  });
}
function nextSlides(n) {
    currentIndex += n;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1; // Quay về slide cuối
    } else if (currentIndex >= slides.length) {
        currentIndex = 0; // Quay lại slide đầu
    }
    updateSlides();
}
function currentSlide(n) {
    currentIndex = n;
    updateSlides();
}
// Tự động chuyển slide mỗi 6 giây
let HandleChange = setInterval(() => { nextSlides(1); }, 6000);
let next = document.querySelector('.next');
next.onclick = function () {
    clearInterval(HandleChange);
    nextSlides(1);
    HandleChange = setInterval(() => { nextSlides(1); }, 6000);
};
let prev = document.querySelector('.prev');
prev.onclick = function () {
    clearInterval(HandleChange);
    nextSlides(-1);
    HandleChange = setInterval(() => { nextSlides(1); }, 6000);
};
// Trailer slide
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cardCount = document.querySelectorAll('.card-trailer').length; // Total card
    let currentIndex = 0;
    let interval;
    function moveCarousel() {
        if (currentIndex >= cardCount - 3) {
            currentIndex = 0;
            // Effect infinite 
            carousel.style.transition = 'none'; // Off effect
            setTimeout(() => {
                carousel.style.transform = `translateX(0px)`; // Đặt lại vị trí
                carousel.style.transition = 'transform 0.5s ease'; // On effect
                currentIndex = 0; // Đặt lại chỉ số về 0 và di chuyển
            }, 30); // Delay trước khi bắt đầu di chuyển lại
        } else {
            currentIndex++;
        }
        const translateX = -currentIndex * (600 + 47);
        carousel.style.transform = `translateX(${translateX}px)`;
    }
    function startInterval() {
        interval = setInterval(moveCarousel, 6000);
    }
    startInterval();
});