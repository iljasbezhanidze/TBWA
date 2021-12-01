const menuItems = document.querySelectorAll('.b-menu__list-item')
const burgerButton = document.querySelector('.b-burger')
const menu = document.querySelector('.b-menu')
const impositionBlocks = document.querySelectorAll('.b-imposition')
const impositionTextInner = document.querySelectorAll('.b-imposition__inner')
const impositionTopImage = document.querySelectorAll('.b-imposition__main-img')

//menu toggler
burgerButton.onclick = () => menu.classList.toggle('b-toggle')

//cascade style menu items
for (let i = 0, amount = 0; i < menuItems.length; i++, amount += 30) {
  menuItems[i].style.paddingLeft = `${amount}px`
}

//slider width different size pictures
var mySwiper = new Swiper(".mySwiper_team", {slidesPerView: 'auto'});

//init & destroy slider depending on viewport width
window.innerWidth < 800 ? mySwiper() : mySwiper.destroy()

