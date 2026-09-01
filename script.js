document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

document.querySelectorAll('.filter-row .chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});
