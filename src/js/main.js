const menuOverlay = document.querySelector('.b-menu')
const menuContent = document.querySelector('.b-menu__content')
const menuItems = document.querySelectorAll('.b-menu__list-item')
const burgerButton = document.querySelector('.b-burger')
const header = document.querySelector('.b-header')
const modalOpen = document.querySelectorAll('[data-modal-open]')
const modals = document.querySelectorAll('[data-modal]')
const moadalInner = document.querySelectorAll('.b-modal')
const closeModal = document.querySelectorAll('[data-modal-close]')
const forms = document.querySelectorAll('.b-form')
const scrollBtn = document.querySelector('.b-arrow-scroll')
const firstScreen = document.querySelector('.b-first-screen')
const currentPlayVideo = document.querySelectorAll('.b-modal .b-video')




//---HAMBURGER MENU---
//menu toggler
burgerButton.onclick = () => {
  header.classList.toggle('b-toggle')
  document.body.classList.toggle('b-blockScroll')
}

//watching for menu 
const observer = new MutationObserver(containClass)
observer.observe(header, {
  'attributes': true
})

//block scroll body if menu open
function containClass() {
  if (header.classList.contains('b-toggle')) {
    document.body.classList.add('b-blockScroll');
    setTimeout(() => {
      menuOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.253)"
    }, 200);
  } else {
    document.body.classList.remove('b-blockScroll');
    menuOverlay.style.backgroundColor = 'transparent'
  }
}

//close menu if target click overlay
window.addEventListener('click', function (event) {
  if (event.target == menuOverlay && event.target != menuContent) header.classList.remove('b-toggle')
})





//---CASCADE STYLE MENU ITEMS---
for (let i = 0, amount = 0; i < menuItems.length; i++, amount += 30) {
  menuItems[i].style.paddingLeft = `${amount}px`
}





//---MODALS---
//hide all modals
function hideModals() {
  modals.forEach(elem => {
    elem.classList.remove('b-show');
  });
};

//find & open current modal, close rest & block scroll
modalOpen.forEach(elem => {
  elem.addEventListener('click', event => {
    event.preventDefault()
    let target = event.currentTarget.getAttribute('data-modal-open');
    hideModals()
    document.body.classList.add('b-blockScroll')
    let targetModal = document.querySelector(`[data-modal="${target}"]`);
    targetModal.classList.add('b-show');
    let currentVideo = document.querySelector('video')
    if (targetModal.contains(currentVideo)) {
      currentVideo.play()
      currentVideo.setAttribute('data-play', '')
    }
  });
});

//close btn active 
closeModal.forEach(el => el.onclick = () => {
  hideModals();
  document.body.classList.remove('b-blockScroll');
});

//close to click overlay 
window.addEventListener('click', function (e) {
  modals.forEach(el => {
    if (el == e.target && e.target != moadalInner) {
      document.body.classList.remove('b-blockScroll')
      hideModals();
      closeVideo();
    };
  });
});

function closeVideo() {
  currentPlayVideo.forEach(el => {
    el.pause();
    el.currentTime = 0;
  })
}







//SCROLL TO TOP
function trackScroll() {
  var scrolled = window.pageYOffset;
  var coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    scrollBtn.classList.add('b-show');
  }
  if (scrolled < coords) {
    scrollBtn.classList.remove('b-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}

window.addEventListener('scroll', trackScroll);
scrollBtn.addEventListener('click', backToTop);










//------ LOAD VIDEO from link after click 'play' ---
const videos = document.querySelectorAll('.b-video-article');
let generateUrl = function (id) {
  let query = '?rel=0&showinfo=0&autoplay=1';
  return 'https://www.youtube.com/embed/' + id + query;
};
let createIframe = function (id) {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
  iframe.setAttribute('src', generateUrl(id));
  return iframe;
};
videos.forEach((el) => {
  let videoHref = el.getAttribute('data-video');
  let deletedLength = 'https://youtu.be/'.length;
  let videoId = videoHref.substring(deletedLength, videoHref.length);
  let img = el.querySelector('img');
  let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
  img.setAttribute('src', youtubeImgSrc);
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let iframe = createIframe(videoId);
    el.querySelector('img').remove();
    el.appendChild(iframe);
    el.querySelector('button').remove();
  });
});





//---SLIDERS---
//init slider (width articles)
var swiperBlog = new Swiper(".mySwiperBlog", {
  slidesPerView: 'auto',
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    800: {
      spaceBetween: 40,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiperArticle = new Swiper(".mySwiperArticle", {
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    800: {
      spaceBetween: 60,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//slider (different size pictures)
try {
  var mySwiper = new Swiper(".mySwiper_team", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    // loop: true,
    breakpoints: {
      800: {
        spaceBetween: 60,
      },
    },
  });

  //init & destroy slider (different size pictures) depending on viewport width
  window.innerWidth < 800 ? mySwiper() : mySwiper.destroy()
} catch {}
