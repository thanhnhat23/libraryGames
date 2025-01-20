const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let HandleChange = setInterval(() => { nextSlides(1); }, 6000); // Tự động chuyển slide mỗi 6 giây
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

// Đánh dấu dot đầu tiên là active
updateDots();
function updateSlides() {
    const translateX = -currentIndex * 100; // Tính toán vị trí di chuyển
    document.querySelector(".slides").style.transform = `translateX(${translateX}%)`;
    updateDots();
}
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
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

// Dừng và khởi tạo lại bộ đếm
function resetSlideInterval() {
    if (HandleChange) {
        clearInterval(HandleChange); // Dừng bộ đếm hiện tại
    }
    HandleChange = setInterval(() => { nextSlides(1); }, 6000); // Tạo bộ đếm mới
}

// Tự động chuyển slide mỗi 6 giây
next.onclick = function () {
    nextSlides(1);
    resetSlideInterval(); // Đảm bảo chỉ có một bộ đếm duy nhất
};
prev.onclick = function () {
    nextSlides(-1);
    resetSlideInterval(); // Đảm bảo chỉ có một bộ đếm duy nhất
};

// Lướt ngang bằng chuột và cảm ứng
let startX, endX, isMouseDown = false;
let touchStartX, touchEndX, isTouching = false;
const slidesContainer = document.querySelector('.slides');

// Cảm ứng chuột
slidesContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX; // Lưu vị trí khi chuột nhấn xuống
    clearInterval(HandleChange); // Dừng tự động chuyển slide khi bắt đầu lướt
});
slidesContainer.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    endX = e.pageX;
    const diffX = startX - endX;
    // Di chuyển theo hướng chuột di chuyển
    if (diffX > 50) {
        nextSlides(1); // Chuyển sang slide kế tiếp
        isMouseDown = false;
    } else if (diffX < -50) {
        nextSlides(-1); // Quay lại slide trước
        isMouseDown = false;
    }
});
slidesContainer.addEventListener('mouseup', () => {
    isMouseDown = false; // Kết thúc việc lướt chuột
    // Bắt đầu lại việc chuyển slide tự động sau khi lướt
    resetSlideInterval();
});
slidesContainer.addEventListener('mouseleave', () => {
    isMouseDown = false; // Kết thúc nếu chuột rời khỏi khu vực lướt
    // Bắt đầu lại việc chuyển slide tự động sau khi lướt
    resetSlideInterval();
});

// Cảm ứng cho thiết bị di động
slidesContainer.addEventListener('touchstart', (e) => {
    isTouching = true;
    touchStartX = e.touches[0].pageX; // Lưu vị trí bắt đầu khi chạm
    clearInterval(HandleChange); // Dừng tự động chuyển slide khi bắt đầu lướt
});
slidesContainer.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    touchEndX = e.touches[0].pageX; // Lưu vị trí khi người dùng di chuyển ngón tay
    e.preventDefault(); // Ngừng cuộn trang khi di chuyển ngón tay
});
slidesContainer.addEventListener('touchend', () => {
    if (!isTouching) return;
    const diffX = touchStartX - touchEndX;
    // Di chuyển theo hướng chạm tay di chuyển
    if (diffX > 50) {
        nextSlides(1); // Chuyển sang slide kế tiếp
    } else if (diffX < -50) {
        nextSlides(-1); // Quay lại slide trước
    }
    isTouching = false; // Kết thúc thao tác chạm
    // Bắt đầu lại việc chuyển slide tự động sau khi lướt
    resetSlideInterval();
});

// Trailer slide
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card-trailer');
    const cardCount = cards.length; // Tổng số card
    let currentIndex = 0;
    let interval;

    // Biến cảm ứng và chuột
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getCardWidth() {
        // Lấy chiều rộng thực tế từ CSS
        return cards[0].offsetWidth;
    }
    function getCardGap() {
        // Lấy giá trị gap từ CSS
        const style = window.getComputedStyle(carousel);
        return parseInt(style.gap, 10);
    }
    function moveCarousel() {
        const cardWidth = getCardWidth();
        const cardGap = getCardGap();

        if (currentIndex >= cardCount - 3) {
            currentIndex = 0;
            carousel.style.transition = 'none'; // Tắt hiệu ứng
            setTimeout(() => {
                carousel.style.transform = `translateX(0px)`;
                carousel.style.transition = 'transform 0.5s ease'; // Bật lại hiệu ứng
            }, 30);
        } else {
            currentIndex++;
        }
        const translateX = -currentIndex * (cardWidth + cardGap);
        carousel.style.transform = `translateX(${translateX}px)`;
        prevTranslate = translateX;
    }
    function startInterval() {
        interval = setInterval(moveCarousel, 6000);
    }
    function stopInterval() {
        clearInterval(interval);
    }
    function handleTouchStart(event) {
        isDragging = true;
        startX = getPositionX(event);
        carousel.style.transition = 'none'; // Tắt hiệu ứng khi kéo
        stopInterval(); // Dừng tự động chuyển slide
    }
    function handleTouchMove(event) {
        if (!isDragging) return;
        const currentX = getPositionX(event);
        currentTranslate = prevTranslate + currentX - startX;
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }
    function handleTouchEnd() {
        const cardWidth = getCardWidth();
        const cardGap = getCardGap();

        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        // Kiểm tra nếu kéo đủ xa để chuyển slide
        if (movedBy < -(cardWidth / 2)) {
            currentIndex++;
        } else if (movedBy > cardWidth / 2) {
            currentIndex--;
        }
        // Giới hạn chỉ số
        currentIndex = Math.max(0, Math.min(currentIndex, cardCount - 3));
        const translateX = -currentIndex * (cardWidth + cardGap);
        carousel.style.transition = 'transform 0.5s ease';
        carousel.style.transform = `translateX(${translateX}px)`;
        prevTranslate = translateX;
        startInterval();
    }
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Cảm ứng và chuột
    carousel.addEventListener('mousedown', handleTouchStart);
    carousel.addEventListener('mousemove', handleTouchMove);
    carousel.addEventListener('mouseup', handleTouchEnd);
    carousel.addEventListener('mouseleave', () => (isDragging = false));
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);

    // Xem sự thay đổi kích thước màn hình
    window.addEventListener('resize', () => {
        prevTranslate = -currentIndex * (getCardWidth() + getCardGap());
        carousel.style.transform = `translateX(${prevTranslate}px)`;
    });
    startInterval();
});

// Hiện menu
document.querySelector('.menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.list-menu').classList.toggle('active');
})