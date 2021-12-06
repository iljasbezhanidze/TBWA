const menuItems = document.querySelectorAll('.b-menu__list-item')
const burgerButton = document.querySelector('.b-burger')
const header = document.querySelector('.b-header')
const modalBtns = document.querySelectorAll('[data-modal-open]')
const modals = document.querySelectorAll('[data-modal]')
const closeModal = document.querySelector('[data-modal-close]')


//menu toggler
burgerButton.onclick = () => header.classList.toggle('b-toggle')


//watching for menu 
const observer = new MutationObserver(containClass)
observer.observe(header, {
  'attributes': true
})


//block scroll body
function containClass() {
  if (header.classList.contains('b-toggle')) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '17px'
  } else {
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = '0'
  }
}


//cascade style menu items 
for (let i = 0, amount = 0; i < menuItems.length; i++, amount += 30) {
  menuItems[i].style.paddingLeft = `${amount}px`
}





//VIDEO
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
  let deletedLength = 'https://youtu.be/'.length; //заполнить индивидуально
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

//SLIDERS//
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
var mySwiper = new Swiper(".mySwiper_team", {
  slidesPerView: 'auto',
  spaceBetween: 30,
  // loop: true,
  breakpoints: {
    800: {
      spaceBetween: 60,
    },
  },
});

//init & destroy slider (different size pictures) depending on viewport width
window.innerWidth < 800 ? mySwiper() : mySwiper.destroy()
