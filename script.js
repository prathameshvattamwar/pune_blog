window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("loaded");

  document.body.classList.add("loaded");

  gsap.registerPlugin(ScrollTrigger);
  Splitting();

  initIntroAnimations();
  initScrollBasedAnimations();
  initInteractiveElements();
  initPopupSystem();
});

function initIntroAnimations() {
  gsap.from(".main-heading .char", {
    y: "100%",
    stagger: 0.03,
    duration: 1,
    ease: "power4.out",
  });
  gsap.from(".sub-heading", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.3,
  });
  gsap.from(".scroll-down-indicator", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.5,
  });
}

function initScrollBasedAnimations() {
  gsap.to(".hero-bg-shape", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    scale: 1.5,
    opacity: 0,
  });

  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".collage-photo", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  });

  document
    .querySelectorAll("#stats, #places-section-wrapper, #main-footer")
    .forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    });

  document.querySelectorAll(".stat-number").forEach((counter) => {
    const target = +counter.dataset.target;
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: target,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        counter.textContent = Math.round(counterObj.value);
      },
    });
  });

  gsap.to(".places-scroller", {
    x: () =>
      -(
        document.querySelector(".places-scroller").scrollWidth -
        document.querySelector("#places-section").clientWidth
      ),
    ease: "none",
    scrollTrigger: {
      trigger: "#places-section-wrapper",
      start: "center center",
      end: () =>
        "+=" +
        (document.querySelector(".places-scroller").scrollWidth -
          document.querySelector("#places-section").clientWidth),
      scrub: 1.5,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

//   gsap.from(".prathamesh-name .char", {
//     y: "110%",
//     stagger: 0.05,
//     duration: 1,
//     ease: "power4.out",
//     scrollTrigger: {
//       trigger: "#main-footer",
//       start: "top 80%",
//       toggleActions: "play none none reverse",
//     },
//   });
    const footerElements = ['.prathamesh-name', '.footer-description', '.footer-social-icons', '.footer-bottom'];
    gsap.from(footerElements, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#main-footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
}

function initInteractiveElements() {
  const collage = document.querySelector(".photo-collage");
  if (collage && window.matchMedia("(min-width: 769px)").matches) {
    const photos = gsap.utils.toArray(".collage-photo");
    collage.addEventListener("mousemove", (e) => {
      let rect = collage.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      photos.forEach((photo) => {
        let moveX = (x - rect.width / 2) * (0.05 + Math.random() * 0.05);
        let moveY = (y - rect.height / 2) * (0.05 + Math.random() * 0.05);
        gsap.to(photo, { x: moveX, y: moveY, duration: 1, ease: "power3.out" });
      });
    });
    collage.addEventListener("mouseleave", () => {
      gsap.to(photos, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
    });
  }

  document.querySelectorAll(".bg-icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        y: "+=2000",
        x: "random(-50, 50)",
        rotation: "random(-90, 90)",
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(icon, {
            y: 0,
            x: 0,
            rotation: 0,
            opacity: 0.07,
            clearProps: "transform",
          });
        },
      });
    });
  });
}

function initPopupSystem() {
  const placesData = {
    visapur: {
      title: "Visapur Fort",
      visits: "2 times",
      lastDate: "15 Oct 2023",
      bestTime: "Monsoon (Jul-Sep)",
      vibe: "Adventurous Trek",
      history:
        "Visapur Fort is a hill fort near Visapur village in Maharashtra, India. It is a part of the Lohagad-Visapur fortification. The trek is especially beautiful during the monsoon, with a path that turns into a mini waterfall.",
      images: [
        "https://i.imgur.com/8aM0B81.jpg",
        "https://i.imgur.com/3fL5eRn.jpg",
        "https://i.imgur.com/4gS1ZzX.jpg",
      ],
    },
    andharban: {
      title: "Andharban Trek",
      visits: "1 time",
      lastDate: "12 Aug 2023",
      bestTime: "Monsoon (Aug-Oct)",
      vibe: "Mystical & Dense",
      history:
        "Andharban, which means 'The Dark Forest,' is a famous monsoon trek. It's a descending trail through a dense, dark forest, opening up to breathtaking views of the Kundalika Valley.",
      images: [
        "https://i.imgur.com/eE5p80W.jpg",
        "https://i.imgur.com/8eN6y9j.jpg",
        "https://i.imgur.com/9v4Jqf2.jpg",
      ],
    },
    shaniwarwada: {
      title: "Shaniwar Wada",
      visits: "Multiple times",
      lastDate: "05 Nov 2023",
      bestTime: "Year-round (Evenings)",
      vibe: "Historical & Eerie",
      history:
        "The historic seat of the Peshwas of the Maratha Empire. Though much of it was destroyed by a fire in 1828, the remaining structures and the grand gate give a glimpse into its glorious and reputedly haunted past.",
      images: [
        "https://i.imgur.com/kS9N9j0.jpg",
        "https://i.imgur.com/w4pA0k8.jpg",
        "https://i.imgur.com/eQz0F5e.jpg",
      ],
    },
    jejuri: {
      title: "Jejuri",
      visits: "2 times",
      lastDate: "05 Feb 2023",
      bestTime: "Festivals (Somvati Amavasya)",
      vibe: "Vibrant & Spiritual",
      history:
        "Famous for its Khandoba temple, Jejuri is known as 'Sonyachi Jejuri' (Golden Jejuri) because of the turmeric powder thrown around by devotees. The sight of the entire temple town covered in yellow is unforgettable.",
      images: [
        "https://i.imgur.com/O4q5V9m.jpg",
        "https://i.imgur.com/eZ8x3fD.jpg",
        "https://i.imgur.com/lM5aY1f.jpg",
      ],
    },
    hadashi: {
      title: "Hadashi Temple",
      visits: "1 time",
      lastDate: "20 Nov 2022",
      bestTime: "Post-Monsoon (Oct-Feb)",
      vibe: "Peaceful & Serene",
      history:
        "Located near Mulshi Dam, this serene temple complex is a hidden gem. The beautiful architecture, landscaped gardens, and peaceful atmosphere make it a perfect escape from the city hustle.",
      images: [
        "https://i.imgur.com/tB5H99I.jpg",
        "https://i.imgur.com/a9c1eW2.jpg",
      ],
    },
    ramdara: {
      title: "Ramdara Temple",
      visits: "1 time",
      lastDate: "11 Mar 2023",
      bestTime: "Year-round",
      vibe: "Quaint & Unique",
      history:
        "A beautiful and peaceful Shiva temple complex located near Loni Kalbhor. It's surrounded by a small lake and is home to many birds and animals, including geese and rabbits, making it unique.",
      images: [
        "https://i.imgur.com/6XlM9pL.jpg",
        "https://i.imgur.com/dC7nS8R.jpg",
        "https://i.imgur.com/mY1xG3A.jpg",
      ],
    },
  };
  const popup = document.getElementById("popup-container"),
    popupTitle = document.getElementById("popup-title"),
    popupVisits = document.getElementById("popup-visits"),
    popupDate = document.getElementById("popup-date"),
    popupBestTime = document.getElementById("popup-best-time"),
    popupDifficulty = document.getElementById("popup-difficulty"),
    popupHistory = document.getElementById("popup-history"),
    popupMainImage = document.querySelector(
      "#popup-gallery .gallery-image-main img"
    ),
    popupThumbnailsContainer = document.querySelector(".gallery-thumbnails"),
    closeBtn = document.getElementById("popup-close-btn");
  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const placeId = button.closest(".place-card").dataset.place;
      openPopup(placeId);
    });
  });
  function openPopup(placeId) {
    const data = placesData[placeId];
    if (!data) return;
    popupTitle.textContent = data.title;
    popupVisits.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Visited: ${data.visits}`;
    popupDate.innerHTML = `<i class="fa-solid fa-clock"></i> Last on: ${data.lastDate}`;
    popupBestTime.innerHTML = `<i class="fa-solid fa-star"></i><strong>Best Time:</strong> ${data.bestTime}`;
    popupDifficulty.innerHTML = `<i class="fa-solid fa-mountain-sun"></i><strong>Vibe:</strong> ${data.vibe}`;
    popupHistory.textContent = data.history;
    popupMainImage.src = data.images[0];
    popupThumbnailsContainer.innerHTML = "";
    data.images.forEach((imgSrc, index) => {
      const thumb = document.createElement("img");
      thumb.src = imgSrc;
      if (index === 0) thumb.classList.add("active");
      thumb.addEventListener("click", (e) => {
        popupMainImage.src = imgSrc;
        popupThumbnailsContainer
          .querySelector(".active")
          ?.classList.remove("active");
        e.target.classList.add("active");
      });
      popupThumbnailsContainer.appendChild(thumb);
    });
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closePopup() {
    popup.classList.remove("active");
    document.body.style.overflow = "auto";
  }
  closeBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
}
