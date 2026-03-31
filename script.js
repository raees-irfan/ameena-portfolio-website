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


// ❓ Accordion + 💬 Carousel
document.addEventListener('DOMContentLoaded', function () {

  // ✅ Accordion FAQ
  document.querySelectorAll('.accordion-title').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item')
        .forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ============================
  // 💬 REVIEWS CAROUSEL (LOOP)
  // ============================

  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track) {
    const cards = track.querySelectorAll('.review-card');
    const total = cards.length;
    let current = 0;

    function visibleCount() {
      return window.innerWidth <= 768 ? 1 : 3;
    }

    function getCardWidth() {
      const container = document.querySelector('.carousel-track-container');
      const containerWidth = container.offsetWidth;
      const gap = 20;
      const visible = visibleCount();

      return (containerWidth - (gap * (visible - 1))) / visible;
    }

    function setCardWidths() {
      const w = getCardWidth();
      cards.forEach(card => {
        card.style.width = w + 'px';
        card.style.minWidth = w + 'px';
      });
      track.style.gap = '20px';
    }

    function maxIndex() {
      return total - visibleCount();
    }

    // 🔥 LOOPING LOGIC
    function goTo(index) {
      const max = maxIndex();

      if (index > max) {
        current = 0; // loop to start
      } else if (index < 0) {
        current = max; // loop to end
      } else {
        current = index;
      }

      const w = getCardWidth() + 20;
      track.style.transform = `translateX(-${current * w}px)`;

      updateDots();
    }

    // DOTS
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

    // BUTTONS (NO DISABLE NOW)
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
    });

    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
    });

    // RESIZE
    window.addEventListener('resize', () => {
      setCardWidths();
      buildDots();
      goTo(0);
    });

    // INIT
    setCardWidths();
    buildDots();
    goTo(0);
  }

});