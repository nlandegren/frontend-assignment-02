const apiKey = '23524770-cd261b46e16ac6158fc07abc8';

const pictureBoxes = document.querySelectorAll('#grid figure img');
const figureCaptions = document.querySelectorAll('#grid figure figcaption')
const previousPage = document.querySelector('#previous-page')
const nextPage = document.querySelector('#next-page')

let search, color;
let params, limit, json;
let pageNumber = 1;

const form = document.querySelector('form');

form.onsubmit = async event => {
    event.preventDefault();
    pageNumber = 1;
    search = form.elements.text.value;
    color = form.elements.colors.value;

    json = await makeApiCall();

    document.getElementById("buttoncontainer").style.display = "block";
    
    if (json.totalHits <= pageNumber*10){
        nextPage.disabled = true;
    }
    previousPage.disabled = true;

    displayImages();
}


nextPage.onclick = async event => {
    pageNumber++;
    previousPage.disabled = false;

    json = await makeApiCall();

    if (json.totalHits <= pageNumber*10){
        nextPage.disabled = true;
    }

    // Hide figure elements that are empty but show ugly border.
    for (let index = 0; index < pictureBoxes.length; index++) {
        pictureBoxes[index].style.display = "none";
    }
    displayImages();
}


previousPage.onclick = async event => {
    pageNumber--;
    json = await makeApiCall();
    displayImages();
    if (pageNumber === 1) {
        previousPage.disabled = true;
    }
    nextPage.disabled = false;
}


function displayImages(){
    // Remove old figure captions.
    for (let index = 0; index < figureCaptions.length; index++) {
        figureCaptions[index].textContent = "";
    }
    for (let index = 0; index < limit; index++) {
        pictureBoxes[index].style.display = "block";        
        figureCaptions[index].textContent = "Tags: " + json.hits[index].tags;
        figureCaptions[index].textContent += " User: " + json.hits[index].user;
        pictureBoxes[index].src = json.hits[index].webformatURL;
    }
}

async function makeApiCall(){
    params = new URLSearchParams({
        key: apiKey,
        q: search,
        colors: color,
        page: pageNumber,
        per_page: 10
    });
    const response = await fetch('https://pixabay.com/api/?' + params.toString());
    const json = await response.json();
    limit = Object.keys(json.hits).length;
    return json;
}

