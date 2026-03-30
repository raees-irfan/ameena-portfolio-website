// ✋ Hand Trail Effect (original)
let lastX = 0;
let lastY = 0;
let first = true;
const trailArea = document.getElementById('trail-area');
trailArea.addEventListener('mousemove', function (e) {
  const x = e.clientX;
  const y = e.clientY;
  const distance = Math.hypot(x - lastX, y - lastY);
  if (first || distance > 50) {
    first = false;
    lastX = x;
    lastY = y;
    const hand = document.createElement('img');
    hand.src = 'hand1.png';
    hand.className = 'hand';
    hand.style.left = `${x}px`;
    hand.style.top = `${y}px`;
    document.body.appendChild(hand);
    setTimeout(() => hand.remove(), 1500);
  }
});

// ❓ Accordion + 💬 Carousel (both inside DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function () {

  // Accordion FAQ (original)
  document.querySelectorAll('.accordion-title').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      // Close all others
      document.querySelectorAll('.accordion-item').forEach(i =>
        i.classList.remove('active')
      );
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Reviews Carousel
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;
  let current = 0;

  function visibleCount() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function maxIndex() {
    return total - visibleCount();
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function updateButtons() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    const cardWidth = cards[0].offsetWidth + 20; // 20px = gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
    updateButtons();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => {
    buildDots();
    goTo(0);
  });

  buildDots();
  updateButtons();

});