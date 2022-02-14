const menuOverlay = document.querySelector('.b-menu')
const menuContent = document.querySelector('.b-menu__content')
const menuItems = document.querySelectorAll('.b-menu__list-item')
const burgerButton = document.querySelector('.b-burger')
const header = document.querySelector('.b-header')
const modalOpen = document.querySelectorAll('[data-modal-open]')
const modals = document.querySelectorAll('[data-modal]')
const modalInner = document.querySelectorAll('.b-modal')
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
}

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

window.openModalByName = name => {
  hideModals()
  document.body.classList.add('b-blockScroll')
  const currentModal = document.querySelector(`[data-modal="${name}"]`)
  currentModal.classList.add('b-show')
}

//close btn active
closeModal.forEach(el => el.onclick = () => {
  hideModals();
  document.body.classList.remove('b-blockScroll');
});

//close to click overlay
window.addEventListener('click', function (e) {
  modals.forEach(el => {
    if (el == e.target && e.target != modalInner) {
      document.body.classList.remove('b-blockScroll')
      hideModals();
      closeVideo();
    }
  })
})

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
// const videos = document.querySelectorAll('.b-video-article');
// let generateUrl = function (id) {
//   let query = '?rel=0&showinfo=0&autoplay=1';
//   return 'https://www.youtube.com/embed/' + id + query;
// };
// let createIframe = function (id) {
//   let iframe = document.createElement('iframe');
//   iframe.setAttribute('allowfullscreen', '');
//   iframe.setAttribute('allow', 'autoplay; encrypted-media');
//   iframe.setAttribute('src', generateUrl(id));
//   return iframe;
// };
// videos.forEach((el) => {
//   let videoHref = el.getAttribute('data-video');
//   let deletedLength = 'https://youtu.be/'.length;
//   let videoId = videoHref.substring(deletedLength, videoHref.length);
//   let img = el.querySelector('img');
//   let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
//   img.setAttribute('src', youtubeImgSrc);
//   el.addEventListener('click', (e) => {
//     e.preventDefault();
//     let iframe = createIframe(videoId);
//     el.querySelector('img').remove();
//     el.appendChild(iframe);
//     el.querySelector('button').remove();
//   });
// });

class ArticleSliceSlider {
  constructor(name) {
    if (!name) return false
    this.container = document.querySelector(`[data-slick-slider="${name}"]`)
    this.prev = this.container.querySelector('[data-slick-arrow-prev]')
    this.next = this.container.querySelector('[data-slick-arrow-next]')
    this.list = this.container.querySelector('[data-slick-arrow-list]')

    this.init()
  }

  init() {
    $(this.list).slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: this.prev,
      nextArrow: this.next,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    })
  }
}

document.addEventListener('DOMContentLoaded', e => {
  const allSlickSlidersOnPage = document.querySelectorAll('[data-slick-slider]')
  for (let i = 0; i < allSlickSlidersOnPage.length; i++) {
    const name = allSlickSlidersOnPage[i].getAttribute('data-slick-slider')
    new ArticleSliceSlider(name)
  }
})

//---SLIDERS---
//init slider (width articles)
if (document.querySelector('.mySwiperBlog')) {
  var swiperBlog = new Swiper(".mySwiperBlog", {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    breakpoints: {
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1170: {
        slidesPerView: 3,
      },
      960: {
        spaceBetween: 40,
        slidesPerView: 2,
      },
      780: {
        spaceBetween: 0,
        slidesPerView: 1,
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

if (document.querySelector('.mySwiperArticle')) {
  var swiperArticle = new Swiper(".mySwiperArticle", {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    breakpoints: {
      960: {
        spaceBetween: 30,
        slidesPerView: 1.3
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}


//slider (different size pictures)
if (document.querySelector('.mySwiper_team')) {
  try {
    let mySwiper = null

    const initTeamSlider = () => {
      if (window.innerWidth < 800) {
        mySwiper = new Swiper(".mySwiper_team", {
          observer: true,
          observeParents: true,
          slidesPerView: 'auto',
          spaceBetween: 30,
          centeredSlides: true,
          // loop: true,
          breakpoints: {
            800: {
              spaceBetween: 60,
              slidesPerView: 4
            },
          },
        });
      } else {
        if (mySwiper?.destroy) {
          mySwiper.destroy(false, true)
          mySwiper.detachEvents()
          mySwiper.disable()
          mySwiper = undefined
        }
      }
    }
    //init & destroy slider (different size pictures) depending on viewport width
    window.addEventListener('resize', e => {
      initTeamSlider()
    })
    initTeamSlider()
  } catch {
  }
}


document.addEventListener('DOMContentLoaded', e => {
  class HomeCoverParallax {
    constructor() {
      this.place = document.querySelector('.b-main__section_first-screen')
      if (!this.place) return false
      this.parallaxItems = this.place.querySelectorAll('[data-parallax-items]')
      // this.titleElement = this.place.querySelector('.b-first-screen__title')
      // this.buttonElement = this.place.querySelector('.b-first-screen__button')
      // this.contactsSection = this.place.querySelector('.b-contacts-section')
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
        for (let i = 0; i < this.parallaxItems.length; i++) {
          this.parallaxItems[i].style.transform = `translate3d(0, -${offset}px, 0)`
        }
        // if (this.titleElement) {
        //   this.titleElement.style.transform = `translate3d(0, -${offset}px, 0)`
        // }
        //
        // if (this.buttonElement) {
        //   this.buttonElement.style.transform = `translate3d(0, -${offset}px, 0)`
        // }
        //
        // if (this.contactsSection) {
        //   this.contactsSection.style.transform = `translate3d(0, -${offset}px, 0)`
        // }

      }
    }
  }

  class ShowHideOtherSite {
    constructor() {
      this.first = document.querySelector('.b-main__first')
      if (!this.first) return false
      this.other = document.querySelector('.b-main__other')
      if (!this.other) return false
      this.other.style.transitionDuration = '0.4s'
      this.skewBlock = document.querySelector('.b-main__skew-block')
      if (!this.skewBlock) return false
      this.skewBlock.style.transitionDuration = '0.4s'
      this.offset = 38
      this.status = 'show'

      this.init()
    }

    init() {
      this.listener()
      this.showHide()
    }

    listener() {
      window.addEventListener('scroll', e => {
        this.scrollHandle()
      })
    }

    scrollHandle() {
      this.showHide()
      this.toggleBackgroundColor()
    }

    showHide() {
      if (window.scrollY >= (window.innerHeight / 2)) {
        this.show()
      } else {
        this.hide()
      }
    }

    show() {
      if (this.status === 'show') return false
      this.skewBlock.style.transform = `translate3d(0, 0, 0)`
      this.other.style.transform = `translate3d(0, 0, 0)`
      this.status = 'show'

      this.toggleBodyHidden()
    }

    hide() {
      if (this.status === 'hide') return false
      this.skewBlock.style.transform = `translate3d(calc(-100vw - 38vh), 0, 0)`
      this.other.style.transform = `translate3d(-200vw, 0, 0)`
      this.status = 'hide'
    }

    toggleBodyHidden() {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.querySelector('.b-header').style.paddingRight = `${scrollbarWidth}px`
      setTimeout(() => {
        window.scrollTo(0, window.innerHeight)
        setTimeout(() => {
          document.body.style.overflow = ''
          document.body.style.paddingRight = ``
          document.querySelector('.b-header').style.paddingRight = ''
        }, 300)
      }, 100)
    }

    toggleBackgroundColor() {
      if (this.skewBlock.classList.value.includes('b-main__skew-block_bgc-gray')) {
        if (window.scrollY > (window.innerHeight * 2)) {
          this.skewBlock.style.backgroundColor = ''
        } else {
          this.skewBlock.style.backgroundColor = '#f2f2f2'
        }
      }
    }
  }

  class ImagesScrollScale {
    constructor() {
      // this.images = document.querySelectorAll('.b-imposition__second-img, .b-imposition__main-img')
      // if (!this.images || this.images.length === 0) return false
      this.firstImages = document.querySelectorAll('.b-imposition__main-img')
      if (!this.firstImages || this.firstImages.length === 0) return false
      this.secondImages = document.querySelectorAll('.b-imposition__second-img')
      if (!this.secondImages || this.secondImages.length === 0) return false
      this.init()
    }

    init() {
      // for (let i = 0; i < this.images.length; i++) {
      //   this.images[i].style.transform = 'scale(1.1)'
      // }
      for (let i = 0; i < this.secondImages.length; i++) {
        this.secondImages[i].style.transform = 'translate3d(0, 50%, 0)'
      }
      for (let i = 0; i < this.firstImages.length; i++) {
        this.firstImages[i].style.transform = 'scale(1.5)'
      }

      this.listener()
    }

    listener() {
      window.addEventListener('scroll', e => {
        this.scrollHandle()
      })
    }

    scrollHandle() {
      // for (let i = 0; i < this.images.length; i++) {
      //   const image = this.images[i]
      //   const imagePosOpts = image.getBoundingClientRect()
      //   const imageParent = image.parentElement
      //   const imageParentPosOpts = imageParent.getBoundingClientRect()
      //   const windowHeight = window.innerHeight
      //   const offset = (imageParentPosOpts.top - windowHeight + (imageParentPosOpts.height / 2)) * -1
      //
      //   if (offset > 0) {
      //     image.style.transform = `scale(1)`
      //   } else {
      //     image.style.transform = `scale(1.1)`
      //   }
      // }

      if (window.innerWidth < 960) {
        for (let i = 0; i < this.secondImages.length; i++) {
          const image = this.secondImages[i]
          image.style.transform = `scale(1) translate3d(0, 0, 0)`
        }

        for (let i = 0; i < this.firstImages.length; i++) {
          const image = this.firstImages[i]
          image.style.transform = `scale(1)`
        }
        return false
      }
      for (let i = 0; i < this.secondImages.length; i++) {
        const image = this.secondImages[i]
        const imagePosOpts = image.getBoundingClientRect()
        const parent = image.parentElement
        const parentPosOpts = parent.getBoundingClientRect()
        //
        const movingHeight = window.innerHeight + parentPosOpts.height - (window.innerHeight * 0.25)
        const bottomPartOffsetToTop = parentPosOpts.top + parentPosOpts.height
        let translateY = 0

        if ((window.innerHeight - parentPosOpts.top) > 0) {
          translateY = 50 - ((((window.innerHeight - parentPosOpts.top) / window.innerHeight) * 100) / 2)
        }

        if (bottomPartOffsetToTop > 0 && bottomPartOffsetToTop < movingHeight) {
          const posOnTheLine = Math.abs((bottomPartOffsetToTop / movingHeight) - 1)
          const percentPosOnTheLine = /*Math.round(*/posOnTheLine * 100/*)*/
          const currentPos = percentPosOnTheLine > 50 ? /*(100 - percentPosOnTheLine)*/50 : percentPosOnTheLine
          const scale = (50 - currentPos) / 100 + 1
          image.style.transform = `scale(${scale}) translate3d(0, ${translateY}%, 0)`
        }
      }

      for (let i = 0; i < this.firstImages.length; i++) {
        const image = this.firstImages[i]
        const imagePosOpts = image.getBoundingClientRect()
        const parent = image.parentElement
        const parentPosOpts = parent.getBoundingClientRect()
        //
        const movingHeight = window.innerHeight + parentPosOpts.height - (window.innerHeight * 0.25)
        const bottomPartOffsetToTop = parentPosOpts.top + parentPosOpts.height

        if (bottomPartOffsetToTop > 0 && bottomPartOffsetToTop < movingHeight) {
          const posOnTheLine = Math.abs((bottomPartOffsetToTop / movingHeight) - 1)
          const percentPosOnTheLine = /*Math.round(*/posOnTheLine * 100/*)*/
          const currentPos = percentPosOnTheLine > 50 ? /*(100 - percentPosOnTheLine)*/50 : percentPosOnTheLine
          const scale = (50 - currentPos) / 100 + 1
          image.style.transform = `scale(${scale})`
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

  class VideoPlayer {
    constructor(place) {
      if (!place) return false
      this.place = place
      this.trigger = this.place.querySelector('.b-video-block__preview')
      this.frame = this.place.querySelector('.b-video-block__frame iframe')

      this.init()
    }

    init() {
      this.listener()
    }

    listener() {
      this.trigger.addEventListener('click', e => {
        this.clickHandle()
      })
    }

    clickHandle() {
      this.trigger.style.opacity = '0'

      setTimeout(() => {
        this.trigger.style.display = 'none'
        this.frame.setAttribute('src', this.frame.getAttribute('src') + '?autoplay=1')
      }, 300)
    }
  }

  class FileInput {
    #container;
    #input;
    #nameElement;
    #saveNameElementHTML;

    constructor(container) {
      this.#container = container
      this.#input = this.#container.querySelector('input[type="file"]')
      this.#nameElement = this.#container.querySelector('.b-field-file__name')
      this.#saveNameElementHTML = this.#nameElement.innerHTML

      this.#init()
    }

    #init() {
      this.#listeners()
    }

    #listeners() {
      this.#input.addEventListener('input', e => {
        this.#inputInputHandle()
      })
    }

    #inputInputHandle() {
      if (!this.#input?.files) return false
      const files = this.#input.files
      const file = files[0]
      if (!file) {
        this.#clearName()
        return false
      }
      this.#setFileName(file.name)
    }

    #clearName() {
      this.#nameElement.innerHTML = this.#saveNameElementHTML
    }

    #setFileName(name) {
      this.#nameElement.innerHTML = name
    }
  }

  new HomeCoverParallax()
  new ShowHideOtherSite()
  new ImagesScrollScale()
  new Header()

  const allVideoBlockOnThePage = document.querySelectorAll('[data-video-block]')
  for (let i = 0; i < allVideoBlockOnThePage.length; i++) {
    new VideoPlayer(allVideoBlockOnThePage[i])
  }

  const allFileInputOnPage = document.querySelectorAll('[data-fileinput]')
  for (let i = 0; i < allFileInputOnPage.length; i++) {
    new FileInput(allFileInputOnPage[i])
  }
})
