const menuItems = document.querySelectorAll('.b-menu__list-item')
const burgerButton = document.querySelector('.b-burger')
const header = document.querySelector('.b-header')

//menu toggler
burgerButton.onclick = () => header.classList.toggle('b-toggle')


//watching for menu 
const observer = new MutationObserver(containClass)
observer.observe(header, {
  'attributes': true
})


//block scroll body
function containClass() {
  if (header.classList.contains('b-toggle')) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = 'auto'
}


//cascade style menu items 
for (let i = 0, amount = 0; i < menuItems.length; i++, amount += 30) {
  menuItems[i].style.paddingLeft = `${amount}px`
}

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

//slider (different size pictures)
var mySwiper = new Swiper(".mySwiper_team", {
  slidesPerView: 'auto'
});

//init & destroy slider (different size pictures) depending on viewport width
window.innerWidth < 800 ? mySwiper() : mySwiper.destroy()



