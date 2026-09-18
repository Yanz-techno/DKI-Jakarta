const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('opacity-100', slideIndex === currentSlide);
    slide.classList.toggle('opacity-0', slideIndex !== currentSlide);
    slide.classList.toggle('z-10', slideIndex === currentSlide);
    slide.classList.toggle('z-0', slideIndex !== currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.className = dotIndex === currentSlide
      ? 'carousel-dot w-10 h-2.5 rounded-full bg-brand-500 transition-all duration-300'
      : 'carousel-dot w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300';
  });
}

function startAutoSlide() {
  if (slides.length > 1) {
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  }
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

function nextSlide() {
  showSlide(currentSlide + 1);
  resetAutoSlide();
}

function prevSlide() {
  showSlide(currentSlide - 1);
  resetAutoSlide();
}

function changeSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

const navItems = document.querySelectorAll('.nav-item');
const indicator = document.getElementById('nav-indicator');

function updateIndicator(element) {
  if (!element || !indicator) return;
  indicator.style.left = `${element.offsetLeft}px`;
  indicator.style.width = `${element.offsetWidth}px`;
}

function setActiveNavigation(target) {
  const activeItem = document.querySelector(`[data-target="${target}"]`);
  if (!activeItem) return;

  navItems.forEach((item) => item.classList.remove('active', 'text-white'));
  activeItem.classList.add('active', 'text-white');
  updateIndicator(activeItem);
}

const modalData = {
  kebaya: {
    tag: 'Rumah Adat Resmi',
    title: 'Rumah Kebaya Betawi',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    desc: 'Rumah Kebaya merupakan rumah adat paling tersohor masyarakat Betawi. Ciri khas utamanya tampak pada atap yang berbentuk pelana yang bila dilihat dari samping menyerupai lipatan kain kebaya. Memiliki teras (amben) yang sangat luas dengan langkan (pagar kayu berukir) dan meja-kursi kayu untuk menyambut tamu, merefleksikan watak masyarakat Betawi yang ramah, hangat, jujur, serta terbuka terhadap keberagaman.',
  },
  panggung: {
    tag: 'Rumah Adat Pesisir',
    title: 'Rumah Panggung Betawi',
    img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    desc: 'Rumah Panggung Betawi berdiri kokoh di atas tiang-tiang kayu jati atau kayu nangka setinggi 1 hingga 2 meter dari permukaan tanah. Rumah ini dirancang untuk mengantisipasi luapan air pasang laut dan hewan liar.',
  },
  monas: {
    tag: 'Wisata Sejarah & Ikonik',
    title: 'Monumen Nasional (Monas)',
    img: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=80',
    desc: 'Monumen Nasional (Monas) merupakan monumen kebanggaan setinggi 132 meter yang diprakarsai oleh Presiden Pertama RI, Ir. Soekarno.',
    mapsUrl: 'https://maps.google.com/?q=Monumen+Nasional+Monas+Jakarta',
  },
  kotatua: {
    tag: 'Wisata Heritage',
    title: 'Kawasan Kota Tua Jakarta',
    img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    desc: 'Kota Tua Jakarta (Batavia Lama) adalah saksi bisu perkembangan Jakarta sejak masa jayanya sebagai bandar perdagangan rempah VOC dunia.',
    mapsUrl: 'https://maps.google.com/?q=Kota+Tua+Jakarta',
  },
  seribu: {
    tag: 'Wisata Bahari',
    title: 'Taman Bahari Kepulauan Seribu',
    img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    desc: 'Kabupaten Kepulauan Seribu terdiri dari 110 pulau karang dengan air laut biru kehijauan yang jernih, pantai pasir putih, dan terumbu karang hidup.',
    mapsUrl: 'https://maps.google.com/?q=Kepulauan+Seribu+Jakarta',
  },
};

function openModal(key) {
  const data = modalData[key];
  const modal = document.getElementById('detail-modal');
  if (!data || !modal) return;

  document.getElementById('modal-img').src = data.img;
  document.getElementById('modal-tag').textContent = data.tag;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;

  const mapsContainer = document.getElementById('modal-maps-container');
  if (data.mapsUrl) {
    mapsContainer.classList.remove('hidden');
    document.getElementById('modal-maps-btn').href = data.mapsUrl;
  } else {
    mapsContainer.classList.add('hidden');
  }

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  document.getElementById('main-content').classList.add('page-blur-active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  if (!modal) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  document.getElementById('main-content').classList.remove('page-blur-active');
  document.body.style.overflow = 'auto';
}

function openLightbox(image, title, description) {
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;
  document.getElementById('lightbox-img').src = image;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-desc').textContent = description;
  lightbox.classList.remove('opacity-0', 'pointer-events-none');
  lightbox.classList.add('opacity-100');
  document.getElementById('main-content').classList.add('page-blur-active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;
  lightbox.classList.add('opacity-0', 'pointer-events-none');
  lightbox.classList.remove('opacity-100');
  document.getElementById('main-content').classList.remove('page-blur-active');
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startAutoSlide();

  const activeItem = document.querySelector('.nav-item.active') || navItems[0];
  updateIndicator(activeItem);
  navItems.forEach((item) => {
    item.addEventListener('click', () => setActiveNavigation(item.dataset.target));
  });

  window.addEventListener('resize', () => updateIndicator(document.querySelector('.nav-item.active')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
