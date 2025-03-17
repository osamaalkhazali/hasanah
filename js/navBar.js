const logout = document.querySelector('.logout-btn');
const userBtn = document.querySelector('.user-btn');
const jobBtn = document.querySelectorAll('.jobColor');


if (localStorage.getItem('user')) {
  userBtn.classList.add('d-none');
  logout.classList.remove('d-none');
  jobBtn.forEach(btn => btn.classList.remove('d-none'));
}

logout.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.reload();
});

