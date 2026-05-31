
/* ── Google Apps Script URL ──────────────────────────────── */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymmLsGLN0rTTInnmKKAbYwREzmyvFwIqAxo5hWi7tlCJeR6I_gHLtHGj8cU8mPkjDRdA/exec";

/* ── Mobile menu ─────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── Active nav on scroll ────────────────────────────────── */
const sections   = ['hero','about','education','skills','projects','certifications','contact'];
const navLinks   = document.querySelectorAll('.nav-links a[data-section]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.dataset.section === current) a.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Scroll reveal ───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger children inside grids
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(revealEls).indexOf(entry.target) % 5));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Contact form submission ─────────────────────────────── */
function submitForm() {
  const btn  = document.getElementById('submitBtn');
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  // Hide previous feedback
  document.getElementById('formSuccess').style.display = 'none';
  document.getElementById('formError').style.display   = 'none';

  if (!name || !email || !message) {
    showError(); return;
  }

  btn.disabled = true;
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".4" cx="18" cy="18" r="18"/><path d="M36 18c0-9.9-8.1-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"/></path></g></g></svg> Sending…`;

  const url = SCRIPT_URL + "?" + new URLSearchParams({ name, email, subject, message });

  fetch(url, { method: "GET", mode: "no-cors" })
    .then(() => {
      showSuccess();
      document.getElementById('fname').value    = '';
      document.getElementById('femail').value   = '';
      document.getElementById('fsubject').value = '';
      document.getElementById('fmessage').value = '';
    })
    .catch(() => showError())
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9h16M10 2l7 7-7 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Send Message`;
    });
}

function showSuccess() {
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('formError').style.display   = 'none';
}
function showError() {
  document.getElementById('formError').style.display   = 'block';
  document.getElementById('formSuccess').style.display = 'none';
}

/* ── Allow Enter key on inputs ───────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey) submitForm();
});

const toggleBtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }
});