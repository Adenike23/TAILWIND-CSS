const input = document.querySelector('input');
const button = document.querySelector('.shorten');
const error = document.querySelector('.error');
const input_link = document.querySelector('.inputLink')
const aTag = document.querySelector('.result');
const loading = document.querySelector('.loading')
const URLSection = document.querySelector('.URL_section');
const copy = document.querySelector('.copy');
let urlArray = JSON.parse(localStorage.getItem('linkUrl'))  ||  [] 
const menu = document.querySelector('.menu')
const openMenu = document.querySelector('.open-menu')
const closeMenu = document.querySelector('.close-menu')


document.querySelectorAll('.ul a').forEach((navLink) => {
    navLink.addEventListener('click', function(){
        openMenu.style.display = 'block'
        closeMenu.style.display = 'none'
        menu.classList.toggle('flex')
        menu.classList.toggle('hidden')
    })
})
// function to set a timer for the error message
function timeOut(){
    error.style.display = 'none'
}

// this is a function which contains the API. it is called when the button is clicked with a valid link in the input
async function getShortLink() {
    // immediately this function is called, display the loading icon
    loading.style.display = 'block'

    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`, {
        method: 'POST'  
    })
    
    // if there is any response, hide the loading icon
    if(response) {
        loading.style.display = 'none'
    }
    // if the response status is okay, display the URL section
    if(response.ok) URLSection.style.display = 'block';
    // if not okay, display the error message. The function, timeout is also called here
    if(!response.ok){
        error.textContent = 'Please put in a valid link';
        setTimeout(timeOut, 3000)
    }
    let data = await response.json();
    URLSection.innerHTML+= `
        <div class="flex flex-col justify-between items-center border-solid bg-slate-100 p-3 md:flex-row">
            <p class="inputLink">${input.value}</p>
            <div class="space-x-2">
                <a href="${data.result.full_short_link}" target="_blank" class="text-Cyan result">${data.result.short_link}</a>
                <button class="bg-Cyan rounded-md px-4 py-2 text-white text-sm copy">Copy</button>
            </div>
        </div>
    `
    input.value = ""
    
    // event delegation is used for the copy button. e=event parameter
    URLSection.addEventListener('click', function(e){
        if (e.target.classList.contains('copy')){
            navigator.clipboard.writeText(data.result.full_short_link)
            let copy = e.target
            copy.style.backgroundColor = '#282745';
            copy.textContent = 'Copied!'
            setTimeout(() => {
            copy.style.backgroundColor = '#3AC6BE';
            copy.textContent = 'Copy'
        }, 3000);
        }
    })
}
button.addEventListener('click', function() {
    if(input.value === '') {
        error.style.display = 'block'
        error.textContent = 'Please add a link'
        setTimeout(() => {
            error.style.display = 'none'
        }, 3000);
        return
    } else{
        getShortLink();
    }
})

const linkImage = document.querySelector('.addLink')
linkImage.style.backgroundImage = 'url(/images/bg-shorten-desktop.svg)'
linkImage.style.backgroundPosition = 'center';
linkImage.style.backgroundSize = 'cover'
document.querySelector('.support').style.backgroundImage = 'url(/images/bg-boost-desktop.svg)';


openMenu.addEventListener('click', function(){
    openMenu.style.display = 'none'
    closeMenu.style.display = 'block'
    // closeMenu.style.display = 'block'
    menu.classList.toggle('flex')
    menu.classList.toggle('hidden')
})
closeMenu.addEventListener('click', function(){
    openMenu.style.display = 'block'
    closeMenu.style.display = 'none'
    // menu.style.display = 'none'
    menu.classList.toggle('flex')
    menu.classList.toggle('hidden')
})