const apiKey = '23524770-cd261b46e16ac6158fc07abc8';

const pictureBoxes = document.querySelectorAll('#grid figure img');
const figureCaptions = document.querySelectorAll('#grid figure figcaption')
const previousPage = document.querySelector('#previous-page')
const nextPage = document.querySelector('#next-page')

let search;
let color;
let pageNumber = 1;
let params;
let limit;
let json;

const form = document.querySelector('form');

form.onsubmit = async event => {
    event.preventDefault();
   
    search = form.elements.text.value;
    color = form.elements.colors.value;

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
    
    document.getElementById("buttoncontainer").style.display = "block";
    if (limit < 10) {
        nextPage.disabled = true;
    }

    previousPage.disabled = true;
    pageNumber = 1;
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

nextPage.onclick = async event => {
    pageNumber++;
    previousPage.disabled = false;

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

    if (limit < 10) {
        nextPage.disabled = true;
    }
    for (let index = 0; index < figureCaptions.length; index++) {
        figureCaptions[index].textContent = "";
    }
    for (let index = 0; index < pictureBoxes.length; index++) {
        pictureBoxes[index].style.display = "none";
    }
    for (let index = 0; index < limit; index++) {
        pictureBoxes[index].style.display = "block";        
        figureCaptions[index].textContent = "Tags: " + json.hits[index].tags;
        figureCaptions[index].textContent += " User: " + json.hits[index].user;
        pictureBoxes[index].src = json.hits[index].webformatURL;
    }
}

previousPage.onclick = async event => {
    pageNumber--;

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
    for (let index = 0; index < figureCaptions.length; index++) {
        figureCaptions[index].textContent = "";
    }
    for (let index = 0; index < limit; index++) {
        pictureBoxes[index].style.display = "block";        
        figureCaptions[index].textContent = "Tags: " + json.hits[index].tags;
        figureCaptions[index].textContent += " User: " + json.hits[index].user;
        pictureBoxes[index].src = json.hits[index].webformatURL;
    }

    if (pageNumber === 1) {
        previousPage.disabled = true;
    }
    nextPage.disabled = false;
}


// function displayImages(){
//     for (let index = 0; index < limit; index++) {
//         pictureBoxes[index].src = "";
//         pictureBoxes[index].src = json.hits[index].previewURL;
//     }
// }

// async function makeApiCall(){
//     params = new URLSearchParams({
//         key: apiKey,
//         q: search,
//         colors: color,
//         page: pageNumber,
//         per_page: 10
//     });
//     const response = await fetch('https://pixabay.com/api/?' + params.toString());
//     const json = await response.json();
//     limit = Object.keys(json.hits).length;
//     return json;
// }

