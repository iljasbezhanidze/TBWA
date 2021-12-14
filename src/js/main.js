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
  observer: true,
  observeParents: true,
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
  observer: true,
  observeParents: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    960: {
      spaceBetween: 0,
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
    observer: true,
    observeParents: true,
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

document.addEventListener('DOMContentLoaded', e => {
  class HomeCoverParallax {
    constructor() {
      this.place = document.querySelector('.b-main__section_first-screen')
      if (!this.place) return false
      this.titleElement = this.place.querySelector('.b-first-screen__title')
      this.buttonElement = this.place.querySelector('.b-first-screen__button')
      this.image = this.place.querySelector('.b-media__item')

      this.init()
    }

    init() {
      this.listener()
    }

    listener() {
      window.addEventListener('scroll', e => {
        this.scrollHandle()
      })
    }

    scrollHandle() {
      const placeOffsetTop = window.scrollY
      const height = window.innerHeight / 2

      const percentShow = Math.round(Math.abs(placeOffsetTop / height * 100))

      if (percentShow >= 0/* && percentShow <= 100*/) {

        const offset = Math.round((percentShow * height) / 100 / 2)
        this.titleElement.style.transform = `translate3d(0, -${offset}px, 0)`
        this.buttonElement.style.transform = `translate3d(0, -${offset}px, 0)`
        // this.image.style.transform = `translate3d(0, ${offset / 2}px, 0)`

        // this.place.style.transform = `translate3d(0, ${placeOffsetTop / 1.33}px, 0)`
      }
    }
  }
  class ShowHideOtherSite {
    constructor() {
      this.first = document.querySelector('.b-main__first')
      if (!this.first) return false
      this.other = document.querySelector('.b-main__other')
      if (!this.other) return false
      this.skewBlock = document.querySelector('.b-main__skew-block')
      if (!this.skewBlock) return false
      this.offset = 38

      this.init()
    }

    init() {
      this.listener()
      this.showHide()

      // this.other.style.transform = `translate3d(-100vw, 0, 0)`
      // this.skewBlock.style.transform = `translate3d(calc(-100vw - ${this.offset}vh), 0, 0)`
    }

    listener() {
      window.addEventListener('scroll', e => {
        this.scrollHandle()
      })
    }

    scrollHandle() {
      this.showHide()

      // let offset = Math.round(window.scrollY / window.innerHeight * 100)
      // offset = offset >= 100 ? 100 : offset
      // this.skewBlock.style.transform = `translate3d(calc(${offset - 100}vw - ${this.offset - (offset / 100 * this.offset)}vh), 0, 0)`
      // this.other.style.transform = `translate3d(${offset - 100}vw, 0, 0)`
    }

    showHide() {
      if (window.scrollY > window.innerHeight) {
        this.skewBlock.style.transform = `translate3d(0, 0, 0)`
        this.other.style.transform = `translate3d(0, 0, 0)`
      } else {
        this.skewBlock.style.transform = `translate3d(calc(-100vw - 38vh), 0, 0)`
        this.other.style.transform = `translate3d(-100vw, 0, 0)`
      }
    }
  }
  class ImagesScrollScale {
    constructor() {
      this.images = document.querySelectorAll('.b-imposition__second-img, .b-imposition__main-img')
      if (!this.images || this.images.length === 0) return false
      this.firstImages = document.querySelectorAll('.b-imposition__main-img')
      if (!this.firstImages || this.firstImages.length === 0) return false
      this.secondImages = document.querySelectorAll('.b-imposition__second-img')
      if (!this.secondImages || this.secondImages.length === 0) return false
      this.init()
    }

    init() {
      for (let i = 0; i < this.images.length; i++) {
        this.images[i].style.transform = 'scale(1.1)'
      }
      for (let i = 0; i < this.secondImages.length; i++) {
        this.secondImages[i].parentElement.style.transform = 'translate3d(0, 50%, 0)'
      }
      for (let i = 0; i < this.firstImages.length; i++) {
        this.firstImages[i].parentElement.style.transform = 'translate3d(0, 20%, 0)'
      }

      this.listener()
    }

    listener() {
      window.addEventListener('scroll', e => {
        this.scrollHandle()
      })
    }

    scrollHandle() {
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i]
        const imagePosOpts = image.getBoundingClientRect()
        const imageParent = image.parentElement
        const imageParentPosOpts = imageParent.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const offset = (imageParentPosOpts.top - windowHeight + (imageParentPosOpts.height / 2)) * -1

        if (offset > 0) {
          image.style.transform = `scale(1)`
        } else {
          image.style.transform = `scale(1.1)`
        }
      }

      for (let i = 0; i < this.secondImages.length; i++) {
        const image = this.secondImages[i]
        const parent = image.parentElement

        if (parent.getBoundingClientRect().top - window.innerHeight <= 0) {
          parent.style.transform = 'translate3d(0, 0, 0)'
        } else {
          parent.style.transform = 'translate3d(0, 50%, 0)'
        }
      }

      for (let i = 0; i < this.firstImages.length; i++) {
        const image = this.firstImages[i]
        const parent = image.parentElement

        if (parent.getBoundingClientRect().top - window.innerHeight <= 0) {
          parent.style.transform = 'translate3d(0, 0, 0)'
        } else {
          parent.style.transform = 'translate3d(0, 20%, 0)'
        }
      }
    }
  }
  class Header {
    constructor() {
      this.header = document.querySelector('.b-page__header')
      if (!this.header) return false
      this.lastScrollY = 0

      this.init()
    }

    init() {
      this.listener()
    }

    listener() {
      window.addEventListener('scroll', e => {
        this.scrollHandle()
      })
    }

    scrollHandle() {
      const currentScrollY = window.scrollY
      if (currentScrollY > this.lastScrollY) {
        this.header.classList.add('hide')
      } else {
        this.header.classList.remove('hide')
      }

      if (currentScrollY !== 0) {
        this.header.classList.add('bgc-dark')
        this.header.classList.add('small')
      } else {
        this.header.classList.remove('bgc-dark')
        this.header.classList.remove('small')
      }

      this.lastScrollY = currentScrollY
    }
  }
  new HomeCoverParallax()
  new ShowHideOtherSite()
  new ImagesScrollScale()
  new Header()
})
