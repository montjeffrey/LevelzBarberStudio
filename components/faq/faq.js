(function(){
  const categoryButtons = document.querySelectorAll('.faq-cat-btn');
  const cards = document.querySelectorAll('.faq-card');
  const questions = document.querySelectorAll('.faq-question');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? 'block' : 'none';
      });
    });
  });

  questions.forEach(q => {
    q.addEventListener('click', () => {
      const ans = document.getElementById(q.getAttribute('aria-controls'));
      const expanded = q.getAttribute('aria-expanded') === 'true';
      // Close all answers
      questions.forEach(otherQ => {
        otherQ.setAttribute('aria-expanded', 'false');
        const otherAns = document.getElementById(otherQ.getAttribute('aria-controls'));
        if (otherAns) {
          otherAns.classList.remove('open');
        }
      });
      // Open this one if it was not already open
      if (!expanded) {
        q.setAttribute('aria-expanded', 'true');
        if (ans) {
          ans.classList.add('open');
        }
      }
    });
  });
})();
