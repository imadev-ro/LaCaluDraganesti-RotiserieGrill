document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // BURGER MENU TOGGLE
    // =====================
    const nav = document.getElementById("nav");
    window.toggleMenu = () => nav?.classList.toggle("open");




    // =====================
     // =====================
    // SCROLL TO CATEGORY
    // =====================
window.scrollToCategory = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const scroll = () => {
        const header = document.getElementById("main-header");
        const premiumTop = document.querySelector(".premium-menu-top");

        const headerHeight = header ? header.offsetHeight : 0;
        const premiumHeight = premiumTop ? premiumTop.offsetHeight : 0;
        const totalOffset = headerHeight + premiumHeight + 10; // spațiu suplimentar

        const y = el.getBoundingClientRect().top + window.pageYOffset - totalOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
    };

    // Folosim setTimeout 0 pentru a lăsa browser-ul să termine layout-ul
    setTimeout(scroll, 0);
};




    

    // =====================
    // LIGHTBOX – DOAR GALERIA DIN DESPRE
    // =====================
    const gallerySection = document.querySelector(".gallery");
    if (gallerySection) {
        const cards = Array.from(gallerySection.querySelectorAll(".gallery-card"));
        let currentIndex = 0;

        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxTitle = document.getElementById("lightbox-title");
        const closeBtn = document.querySelector(".close-btn");

        const desktopLeft = document.querySelector(".nav-arrow.left-arrow");
        const desktopRight = document.querySelector(".nav-arrow.right-arrow");
        const mobileLeft = document.querySelector(".title-nav .mobile-arrow.left-arrow");
        const mobileRight = document.querySelector(".title-nav .mobile-arrow.right-arrow");

        const openLightbox = (index) => {
            if (!cards.length) return;
            currentIndex = index;
            const card = cards[currentIndex];
            const img = card.querySelector("img");
            const title = card.querySelector("h3");
            lightboxImg.src = img ? img.src : "";
            lightboxTitle.textContent = title ? title.textContent : "";
            lightbox.style.display = "flex";
        };

        const changeLightbox = (step) => {
            currentIndex = (currentIndex + step + cards.length) % cards.length;
            openLightbox(currentIndex);
        };

        cards.forEach((card, index) => card.addEventListener("click", () => openLightbox(index)));

        // CLOSE LIGHTBOX
        closeBtn?.addEventListener("click", () => lightbox.style.display = "none");
        lightbox?.addEventListener("click", e => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });

        // DESKTOP NAV
        desktopRight?.addEventListener("click", () => changeLightbox(1));
        desktopLeft?.addEventListener("click", () => changeLightbox(-1));

        // MOBILE NAV
        mobileRight?.addEventListener("click", () => changeLightbox(1));
        mobileLeft?.addEventListener("click", () => changeLightbox(-1));

        // SWIPE MOBILE
        let startX = 0;
        lightbox?.addEventListener("touchstart", e => startX = e.changedTouches[0].clientX);
        lightbox?.addEventListener("touchend", e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 50) diff < 0 ? changeLightbox(1) : changeLightbox(-1);
        });

        // KEYBOARD NAV
        document.addEventListener("keydown", e => {
            if (lightbox?.style.display === "flex") {
                if (e.key === "ArrowRight") changeLightbox(1);
                if (e.key === "ArrowLeft") changeLightbox(-1);
                if (e.key === "Escape") lightbox.style.display = "none";
            }
        });
    }

    // =====================
    // STICKY HEADER + PREMIUM MENU
    // =====================
    const header = document.getElementById("main-header");
    const premiumTop = document.querySelector('.premium-menu-top');

    if (header) {
        header.style.position = 'sticky';
        header.style.top = '0';
        header.style.zIndex = '1000';
        header.style.transition = 'all 0.3s ease';
    }

    if (premiumTop) {
        premiumTop.style.position = 'sticky';
        premiumTop.style.top = header ? `${header.offsetHeight}px` : '0';
        premiumTop.style.zIndex = '999';
        premiumTop.style.transition = 'all 0.3s ease';
    }

    window.addEventListener('scroll', () => {
        if (!premiumTop) return;
        if (window.scrollY > 50) premiumTop.classList.add('scrolled');
        else premiumTop.classList.remove('scrolled');
    });

});
