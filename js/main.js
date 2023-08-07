const input = document.querySelector('input');
const button = document.querySelector('.shorten');
const error = document.querySelector('.error');
const input_link = document.querySelector('.inputLink')
const aTag = document.querySelector('.result');
const loading = document.querySelector('.loading')
const URLSection = document.querySelector('.URL_section');
const copy = document.querySelector('.copy');

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
    input_link.textContent = `${input.value}`
    aTag.href = data.result.full_short_link;
    aTag.textContent = data.result.short_link;
    input.value = ""
    copy.addEventListener('click', function() {
        navigator.clipboard.writeText(data.result.full_short_link)
    })
}
button.addEventListener('click', function() {
    if(input.value === '') {
        error.textContent = 'Please add a link'
        setTimeout(timeOut, 3000)
    } else{
        getShortLink();
    }
})
copy.addEventListener('click', function(){
    copy.style.backgroundColor = '#282745';
    copy.textContent = 'Copied!'
})

document.querySelector('.addLink').style.backgroundImage = 'url(/images/bg-shorten-desktop.svg)'
document.querySelector('.support').style.backgroundImage = 'url(/images/bg-boost-desktop.svg)';

