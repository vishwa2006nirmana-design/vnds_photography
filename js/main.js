/**
 * ==========================================================================
 * VNDS PHOTOGRAPHY - MASTER APPLICATION JAVASCRIPT
 * Smooth Animations, Interactive Lightbox, Dynamic Filtering & WhatsApp Integration
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentCategory: 'all',
    currentLightboxIndex: 0,
    filteredPhotos: [...GALLERY_DATA],
    likedPhotos: JSON.parse(localStorage.getItem('vnds_liked_photos') || '[]'),
    isZoomed: false,
    soundEnabled: true
  };

  // DOM Elements
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const galleryGrid = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const bookingForm = document.getElementById('booking-form');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxGear = document.getElementById('lightbox-gear');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');
  const lightboxZoomBtn = document.getElementById('lightbox-zoom');
  const lightboxContainer = document.querySelector('.lightbox-img-container');

  // --- AUDIO SYNTHESIS: Camera Shutter Click using Web Audio API ---
  function playShutterSound() {
    if (!state.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Shutter release click
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Secondary mirror slap click
      setTimeout(() => {
        try {
          const slap = ctx.createBufferSource();
          slap.buffer = buffer;
          const slapGain = ctx.createGain();
          slapGain.gain.setValueAtTime(0.25, ctx.currentTime);
          slapGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
          slap.connect(slapGain);
          slapGain.connect(ctx.destination);
          slap.start();
        } catch (e) {}
      }, 45);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // --- NAVBAR SCROLL & ACTIVE TRACKING ---
  function handleScroll() {
    const scrollY = window.scrollY;

    // Header styling
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Section active highlights
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- MOBILE DRAWER TOGGLE ---
  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
    if (isOpen) {
      mobileDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      mobileToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      mobileToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  mobileToggle.addEventListener('click', () => toggleMobileMenu());
  drawerOverlay.addEventListener('click', () => toggleMobileMenu(false));
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // --- GALLERY RENDERING & FILTERING ---
  function updateFilterCounts() {
    filterBtns.forEach(btn => {
      const category = btn.dataset.category;
      const countEl = btn.querySelector('.filter-count');
      if (countEl) {
        if (category === 'all') {
          countEl.textContent = GALLERY_DATA.length;
        } else {
          const count = GALLERY_DATA.filter(item => item.category === category).length;
          countEl.textContent = count;
        }
      }
    });
  }

  function renderGallery(photosToRender = state.filteredPhotos) {
    if (!galleryGrid) return;

    if (photosToRender.length === 0) {
      galleryGrid.innerHTML = `
        <div class="gallery-empty">
          <p>ඡායාරූප හමු නොවීය (No photos found in this category).</p>
        </div>
      `;
      return;
    }

    galleryGrid.innerHTML = photosToRender.map((photo, index) => {
      const isLiked = state.likedPhotos.includes(photo.id);
      const totalLikes = photo.likes + (isLiked ? 1 : 0);
      const aspectClass = `aspect-${photo.aspect || 'portrait'}`;

      return `
        <article class="gallery-card ${aspectClass} reveal-init reveal-scale" data-id="${photo.id}" data-index="${index}">
          <div class="gallery-card-image-wrap">
            <img 
              class="gallery-card-img" 
              src="${photo.thumb || photo.image}" 
              alt="${photo.title}" 
              loading="lazy"
            />
            <div class="gallery-card-overlay">
              <div class="overlay-top">
                <span class="card-badge">${photo.categoryName}</span>
                <div class="card-action-btns">
                  <button 
                    class="card-icon-btn like-btn ${isLiked ? 'liked' : ''}" 
                    data-id="${photo.id}" 
                    title="Like this photo" 
                    aria-label="Like"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </button>
                  <button class="card-icon-btn view-btn" data-index="${index}" title="View fullscreen" aria-label="View">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="overlay-bottom">
                <h3 class="card-title">${photo.title}</h3>
                <p class="card-sinhala-title">${photo.sinhalaTitle}</p>
                <div class="card-meta-strip">
                  <div class="card-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${photo.location}</span>
                  </div>
                  <div class="card-meta-item">
                    <span class="likes-count">❤️ ${totalLikes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Trigger reveal animations on rendered cards
    observeElements();
    attachGalleryCardListeners();
  }

  function filterGallery(category) {
    state.currentCategory = category;

    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    if (category === 'all') {
      state.filteredPhotos = [...GALLERY_DATA];
    } else {
      state.filteredPhotos = GALLERY_DATA.filter(item => item.category === category);
    }

    renderGallery();
  }

  // Filter Buttons Click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playShutterSound();
      filterGallery(btn.dataset.category);
    });
  });

  // Category Quick Jump Cards
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      if (cat) {
        playShutterSound();
        filterGallery(cat);
        const gallerySection = document.getElementById('portfolio');
        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Attach card event listeners (Like & Lightbox Open)
  function attachGalleryCardListeners() {
    const cards = galleryGrid.querySelectorAll('.gallery-card');

    cards.forEach(card => {
      const index = parseInt(card.dataset.index, 10);
      const photoId = parseInt(card.dataset.id, 10);

      // Card click opens Lightbox (unless clicking like button)
      card.addEventListener('click', (e) => {
        if (e.target.closest('.like-btn')) return;
        openLightbox(index);
      });

      // Like Button
      const likeBtn = card.querySelector('.like-btn');
      if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleLike(photoId, likeBtn, card);
        });
      }
    });
  }

  function toggleLike(photoId, buttonEl, cardEl) {
    const isLiked = state.likedPhotos.includes(photoId);

    if (isLiked) {
      state.likedPhotos = state.likedPhotos.filter(id => id !== photoId);
      buttonEl.classList.remove('liked');
      buttonEl.querySelector('svg').setAttribute('fill', 'none');
      showToast('Photo removed from favorites');
    } else {
      state.likedPhotos.push(photoId);
      buttonEl.classList.add('liked');
      buttonEl.querySelector('svg').setAttribute('fill', 'currentColor');
      showToast('❤️ Added to your favorite photos!');
      playShutterSound();
    }

    localStorage.setItem('vnds_liked_photos', JSON.stringify(state.likedPhotos));

    // Update count in card
    const photo = GALLERY_DATA.find(p => p.id === photoId);
    if (photo && cardEl) {
      const countEl = cardEl.querySelector('.likes-count');
      if (countEl) {
        const total = photo.likes + (!isLiked ? 1 : 0);
        countEl.textContent = `❤️ ${total}`;
      }
    }
  }

  // --- LIGHTBOX MODAL ---
  function openLightbox(index) {
    if (!state.filteredPhotos[index]) return;
    playShutterSound();
    state.currentLightboxIndex = index;
    state.isZoomed = false;
    lightboxContainer.style.transform = 'scale(1)';

    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    state.isZoomed = false;
    lightboxContainer.style.transform = 'scale(1)';
  }

  function updateLightboxContent() {
    const photo = state.filteredPhotos[state.currentLightboxIndex];
    if (!photo) return;

    lightboxImg.src = photo.image;
    lightboxImg.alt = photo.title;
    lightboxCounter.innerHTML = `<span>${state.currentLightboxIndex + 1}</span> / ${state.filteredPhotos.length}`;
    lightboxTitle.textContent = `${photo.title} (${photo.sinhalaTitle})`;
    lightboxLocation.textContent = photo.location;
    lightboxGear.textContent = photo.gear;
  }

  function nextLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex + 1) % state.filteredPhotos.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex - 1 + state.filteredPhotos.length) % state.filteredPhotos.length;
    updateLightboxContent();
  }

  function toggleZoom() {
    state.isZoomed = !state.isZoomed;
    lightboxContainer.style.transform = state.isZoomed ? 'scale(1.4)' : 'scale(1)';
    lightboxContainer.style.cursor = state.isZoomed ? 'zoom-out' : 'zoom-in';
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);
  if (lightboxZoomBtn) lightboxZoomBtn.addEventListener('click', toggleZoom);
  if (lightboxImg) lightboxImg.addEventListener('click', toggleZoom);

  // Close when clicking modal backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-body')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // --- STATS NUMBER COUNTER ANIMATION ---
  function initCounters() {
    const statCounters = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          let count = 0;
          const duration = 1800; // ms
          const increment = Math.ceil(target / (duration / 25));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.textContent = target + suffix;
              clearInterval(timer);
            } else {
              el.textContent = count + suffix;
            }
          }, 25);

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statCounters.forEach(counter => observer.observe(counter));
  }

  // --- SCROLL REVEAL OBSERVER ---
  function observeElements() {
    const revealElements = document.querySelectorAll('.reveal-init:not(.reveal-visible)');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- BOOKING / INQUIRY FORM & WHATSAPP INTEGRATION ---
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const service = document.getElementById('service-type').value;
      const date = document.getElementById('event-date').value;
      const location = document.getElementById('event-location').value.trim();
      const message = document.getElementById('client-message').value.trim();

      if (!name || !phone) {
        showToast('කරුණාකර ඔබගේ නම සහ දුරකථන අංකය ඇතුළත් කරන්න (Please fill your Name and Phone)');
        return;
      }

      playShutterSound();

      // Format WhatsApp message
      const text = `Hello *VNDS PHOTOGRAPHY*! 📸
I would like to book a photography session with you.

*Client Details:*
• *Name:* ${name}
• *Phone:* ${phone}
• *Service:* ${service || 'General Photography Inquiry'}
• *Date:* ${date || 'To be decided'}
• *Location:* ${location || 'Sri Lanka'}

*Special Notes / Message:*
${message || 'Looking forward to discussing the package details.'}`;

      const encodedText = encodeURIComponent(text);
      // Sri Lankan WhatsApp number (configurable)
      const whatsappUrl = `https://wa.me/94771234567?text=${encodedText}`;

      showToast('Booking details prepared! Redirecting to WhatsApp...');

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        bookingForm.reset();
      }, 1000);
    });
  }

  // Package Card WhatsApp Buttons
  const packageBtns = document.querySelectorAll('.package-inquire-btn');
  packageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.dataset.package || 'Custom Package';
      playShutterSound();

      const text = `Hello *VNDS PHOTOGRAPHY*! 📸
I am interested in inquiring about your *${packageName}* package.
Please send me more details regarding dates and custom requirements.`;

      const whatsappUrl = `https://wa.me/94771234567?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  // --- TOAST NOTIFICATIONS ---
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5a93b" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Back to Top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initializations
  updateFilterCounts();
  renderGallery();
  initCounters();
  observeElements();
});
