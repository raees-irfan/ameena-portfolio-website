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
document.addEventListener('DOMContentLoaded', function() {
    // Your accordion code here
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
});
  
  
