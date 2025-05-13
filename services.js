document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    const prevButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    let currentIndex = 0;

    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
      });
    }

    // Optional: Auto-advance (example)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalItems;
    //     updateCarousel();
    // }, 5000);
  });
});
