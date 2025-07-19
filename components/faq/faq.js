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
      const expanded = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!expanded));
      const ans = document.getElementById(q.getAttribute('aria-controls'));
      if(ans){
        ans.hidden = expanded;
      }
    });
  });
})();
