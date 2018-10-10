const mainNav = document.getElementById('js-menu');

const toggleButton = document.getElementById('js-nav-toggle');

toggleButton.addEventListener('click', () => mainNav.classList.toggle('active'));