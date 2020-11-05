import "./blocks/style.css"
import 'swiper/swiper-bundle.css';
import Netmask from "inputmask";


const myCarousel = document.querySelector('#carouselExampleIndicators')
const carousel = new bootstrap.Carousel(myCarousel, {
  interval: false,
  wrap: true
})
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

const headerSlider = document.querySelector('.header-slider')
let ind = 1;
const headerImages = ["./src/images/header-slide/header-bg1.jpg", "./src/images/header-slide/header-bg2.jpg",
  "./src/images/header-slide/header-bg3.jpg", "./src/images/header-slide/header-bg4.jpg", "./src/images/header-slide/header-bg5.jpg"]

const runSlider = (ind) => {
  headerSlider.style.backgroundImage = `url(${headerImages[ind]})`

}
window.addEventListener('load',()=>{
  setInterval(() => {
    if (ind === headerImages.length) {
      ind = 0
    }
    runSlider(ind)
    ind++
  }, 5000)
})

//валидация
const form = document.forms.subscribe
const submit = document.querySelector('.submit')
const inputs = document.querySelectorAll('input')
const textArea = document.querySelector('#message')
const sendForm = ()=>{ submit.removeAttribute('disabled')
  const formData = new FormData(form);
  console.log(formData);
  fetch('mail.php', {
    method: "POST",
    body: formData
  })
      .then((res) => {
            if (res) {
              submit.textContent = 'Ваше сообщение отправлено'
              textArea.value = '';
              inputs.forEach((elt) => {
                elt.value = ' '
              })
            } else { submit.textContent = 'Упс, что-то пошло не так' }
          }
      )

}
form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  inputs.forEach(elem =>{
    if(elem.value.trim().length ===0){
      submit.setAttribute('disabled', true)
      elem.style = "border-bottom:2px solid red"
      elem.placeholder = "Это обязательное поле"
    }
  else if (elem.value.trim().length !== 0) {
    sendForm()
   }})})

inputs.forEach((elt) => {
  elt.addEventListener('click', () => {
    submit.removeAttribute('disabled')
    elt.style = "border-bottom:2px solid green"
    elt.value = ''
  })
})
//маска телефона
const telMask = document.querySelector('#tel')
Netmask({ "mask": "+7 (999) 999-99-99" }).mask(telMask);



