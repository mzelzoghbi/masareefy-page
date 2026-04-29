// Masarefy landing — language toggle + scroll reveals.

(function () {
  const STORAGE_KEY = 'masarefy-landing-lang';
  const html = document.documentElement;

  const arabicDigits = (s) =>
    String(s).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
  const latinDigits = (s) =>
    String(s).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

  function setLang(lang) {
    const isAr = lang === 'ar';
    html.lang = isAr ? 'ar' : 'en';
    html.dir = isAr ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en]').forEach((el) => {
      const en = el.getAttribute('data-en');
      const ar = el.getAttribute('data-ar');
      if (en == null || ar == null) return;
      // Preserve children if a slot is present, otherwise replace text.
      if (el.dataset.htmlOk === 'true') {
        el.innerHTML = isAr ? ar : en;
      } else {
        el.textContent = isAr ? ar : en;
      }
    });

    document.querySelectorAll('[data-num]').forEach((el) => {
      const base = el.getAttribute('data-num');
      el.textContent = isAr ? arabicDigits(base) : latinDigits(base);
    });

    document.querySelectorAll('[data-aria-en]').forEach((el) => {
      const en = el.getAttribute('data-aria-en');
      const ar = el.getAttribute('data-aria-ar');
      el.setAttribute('aria-label', isAr ? ar : en);
    });

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.textContent = isAr ? 'EN' : 'العربية';
      toggle.setAttribute(
        'aria-label',
        isAr ? 'Switch to English' : 'التبديل إلى العربية'
      );
    }

    document.title = isAr
      ? 'مصاريفي — تطبيق إدارة المصاريف الشخصية'
      : 'Masarefy — Personal finance, built for Egypt';

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function detectInitial() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (_) {}
    const browserAr = (navigator.language || '').toLowerCase().startsWith('ar');
    return browserAr ? 'ar' : 'en';
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLang(detectInitial());

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        setLang(html.lang === 'ar' ? 'en' : 'ar');
      });
    }

    // Scroll reveals
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
      );
      targets.forEach((el) => io.observe(el));
    }
  });
})();
