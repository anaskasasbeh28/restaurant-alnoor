(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Header: solid background after scrolling past the hero
  --------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     Scroll-reveal for elements marked .reveal
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     Menu data + category switching
     (Fictional demo content — replace per restaurant.)
  --------------------------------------------------------- */
  const MENU = {
    mokabalat: [
      { name: 'حمص بلحمة', desc: 'حمص بيتي مع لحمة مفرومة وصنوبر محمّص', price: '3.200 د.أ', tag: 'الأكثر طلبًا' },
      { name: 'متبل باذنجان', desc: 'باذنجان مشوي على الفحم مع طحينة وثوم', price: '2.800 د.أ' },
      { name: 'ورق عنب', desc: 'محشي أرز وخضار، يقدّم بارد', price: '2.500 د.أ' },
      { name: 'فتوش مذاق', desc: 'خضار موسمية مع خبز محمّص ودبس رمان', price: '3.000 د.أ' },
    ],
    mashawi: [
      { name: 'مشاوي مشكّل', desc: 'كباب، شيش طاووق، وريش غنم', price: '7.500 د.أ', tag: 'Signature' },
      { name: 'شيش طاووق', desc: 'دجاج متبّل ومشوي بالفحم', price: '5.200 د.أ' },
      { name: 'كباب حلبي', desc: 'لحمة مفرومة بالتوابل الحلبية', price: '5.800 د.أ' },
      { name: 'ريش غنم', desc: 'مشوية على الفحم مع صلصة البيت', price: '8.900 د.أ', tag: "Chef's Choice" },
    ],
    atbaq: [
      { name: 'مقلوبة دجاج', desc: 'أرز وخضار مقلوبة مع دجاج مقرمش', price: '6.000 د.أ' },
      { name: 'منسف مذاق', desc: 'لحمة، جميد، وأرز بالسمن البلدي', price: '7.200 د.أ', tag: 'Signature' },
      { name: 'ورق عنب باللحمة', desc: 'يقدّم دافئ مع لبن بلدي', price: '6.500 د.أ' },
    ],
    halawiyat: [
      { name: 'كنافة نابلسية', desc: 'جبنة وقطر، تقدّم سخنة', price: '3.500 د.أ', tag: 'الأكثر طلبًا' },
      { name: 'مهلبية ورد', desc: 'حليب وماء ورد مع فستق حلبي', price: '2.200 د.أ' },
      { name: 'بقلاوة مشكّلة', desc: 'صحن مشكّل من الحلويات الشامية', price: '4.000 د.أ' },
    ],
    mashrobat: [
      { name: 'عصير رمان', desc: 'رمان طازة معصور يوميًا', price: '1.800 د.أ' },
      { name: 'ليمون بالنعناع', desc: 'منعش ومثلج', price: '1.500 د.أ' },
      { name: 'قهوة عربية', desc: 'تقدّم بالهيل', price: '1.200 د.أ' },
      { name: 'شاي بالميرمية', desc: 'يقدّم في إبريق صغير', price: '1.400 د.أ' },
    ],
  };

  const menuList = document.getElementById('menuList');
  const catButtons = [...document.querySelectorAll('.cat-tab'), ...document.querySelectorAll('.cat-blob')];

  function renderMenu(cat) {
    const items = MENU[cat] || [];
    menuList.innerHTML = items.map((item, i) => `
      <div class="menu-row" style="animation-delay:${i * 60}ms">
        <div>
          <span class="name">${item.name}${item.tag ? `<span class="tag">${item.tag}</span>` : ''}</span>
          <span class="desc">${item.desc}</span>
        </div>
        <span class="leader"></span>
        <span class="price">${item.price}</span>
      </div>
    `).join('');
  }

  function setActiveCategory(cat) {
    catButtons.forEach(btn => {
      const isActive = btn.dataset.cat === cat;
      btn.classList.toggle('is-active', isActive);
      if (btn.classList.contains('cat-tab')) btn.setAttribute('aria-selected', String(isActive));
    });
    renderMenu(cat);
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveCategory(btn.dataset.cat));
  });

  setActiveCategory('mokabalat');

  /* ---------------------------------------------------------
     Reviews carousel
  --------------------------------------------------------- */
  const slides = [...document.querySelectorAll('.review-slide')];
  const dots = [...document.querySelectorAll('#reviewDots button')];
  let activeReview = 0;
  let reviewTimer;

  function goToReview(index) {
    slides[activeReview].classList.remove('is-active');
    dots[activeReview].classList.remove('is-active');
    dots[activeReview].setAttribute('aria-selected', 'false');
    activeReview = (index + slides.length) % slides.length;
    slides[activeReview].classList.add('is-active');
    dots[activeReview].classList.add('is-active');
    dots[activeReview].setAttribute('aria-selected', 'true');
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    goToReview(i);
    resetReviewTimer();
  }));

  function resetReviewTimer() {
    clearInterval(reviewTimer);
    if (!prefersReducedMotion) {
      reviewTimer = setInterval(() => goToReview(activeReview + 1), 5500);
    }
  }
  resetReviewTimer();

})();
