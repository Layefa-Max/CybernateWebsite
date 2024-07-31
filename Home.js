// SIDEBAR START
document.getElementById("openSidebar").addEventListener("click", function () {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = "block";
    setTimeout(function () {
        sidebar.style.width = "250px";
    }, 10);
});

document.getElementById("closeSidebar").addEventListener("click", function () {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.width = "0";
    setTimeout(function () {
        sidebar.style.display = "none";
    }, 500);
});
// SIDEBAR END


// SLIDER START
document.addEventListener("DOMContentLoaded", function () {
    const slideContainer = document.querySelector(".home-carousel-slide");
    const slides = document.querySelectorAll(".home-carousel-item");
    const pauseBtn = document.querySelector(".pause-btn");
    const pauseIcon = document.getElementById('pause-icon');
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const indicators = document.querySelectorAll(".indicator");
    let currentIndex = 0;
    let isPaused = false;
    let slideInterval;

    const pauseIconUrl = "./Vec/pauseIcon.svg";
    const playIconUrl = "./Vec/playIcon.svg";

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add("black-circle");
                indicator.classList.remove("white-circle");
            } else {
                indicator.classList.add("white-circle");
                indicator.classList.remove("black-circle");
            }
        });
    }

    function showNextSlide(auto = true) {
        if (auto) {
            if (currentIndex === 0) {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlide(0.5, 0.5);
            } else {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlide(5, 0.5);
            }
        } else {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlide(0.1, 0.1);
            }
        }
    }

    function showPrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide(0.1, 0.1);
        }
    }

    function updateSlide(transitionOutTime, transitionInTime) {
        slideContainer.style.transition = `transform ${transitionOutTime}s ease`;
        const translateXValue = currentIndex * (100 + 3);
        slideContainer.style.transform = `translateX(-${translateXValue}%)`;
        updateIndicators();
        if (transitionInTime) {
            setTimeout(() => {
                slideContainer.style.transition = `transform ${transitionInTime}s ease`;
            }, transitionOutTime * 1000);
        }
    }

    function startSlideShow() {
        slideInterval = setInterval(() => showNextSlide(true), 7000);
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    pauseBtn.addEventListener("click", () => {
        if (isPaused) {
            startSlideShow();
            pauseIcon.src = pauseIconUrl;
        } else {
            pauseSlideShow();
            pauseIcon.src = playIconUrl;
        }
        isPaused = !isPaused;
    });

    prevBtn.addEventListener("click", () => {
        pauseSlideShow();
        showPrevSlide();
        if (!isPaused) {
            startSlideShow();
        }
    });

    nextBtn.addEventListener("click", () => {
        pauseSlideShow();
        showNextSlide(false);
        if (!isPaused) {
            startSlideShow();
        }
    });

    function adjustImageWidth() {
        const images = document.querySelectorAll(".home-main-image");
        images.forEach(image => {
            image.style.width = "100%";
        });
    }

    slideContainer.addEventListener("transitionend", adjustImageWidth);

    adjustImageWidth();
    updateIndicators();
    startSlideShow();
});
