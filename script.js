document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.experience-track');
  const cards = document.querySelectorAll('.experience-card');
  const prevButton = document.querySelector('.slider-nav.prev');
  const nextButton = document.querySelector('.slider-nav.next');
  
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  
  function getCardsPerView() {
    if (window.innerWidth <= 600) {
      return 1;
    } else if (window.innerWidth <= 1024) {
      return 2;
    }
    return 3;
  }
  
  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 30; // card width + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Update button states
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentIndex >= cards.length - cardsPerView ? '0.5' : '1';
  }
  
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
  
  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++;
      updateSlider();
    }
  });
  
  // Initial button states
  updateSlider();
  
  // Update on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newCardsPerView = getCardsPerView();
      if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        currentIndex = 0;
        updateSlider();
      }
    }, 250);
  });
}); 