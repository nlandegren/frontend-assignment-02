const apiKey = '23524770-cd261b46e16ac6158fc07abc8';

const pictureBoxes = document.querySelectorAll('#grid div img');
const previousPage = document.querySelector('#previous-page')
const nextPage = document.querySelector('#next-page')

let search;
let color;
let pageNumber = 1;
let json;
let params;
const form = document.querySelector('form');
form.onsubmit = async event => {
    event.preventDefault();

    search = form.elements.text.value;
    color = form.elements.colors.value;

    params = new URLSearchParams({
        key: apiKey,
        q: search,
        colors: color,
        page: 1,
        per_page: 10
    });

    const response = await fetch('https://pixabay.com/api/?' + params.toString());
    json = await response.json();

    document.getElementById("buttoncontainer").style.display = "block";
    if (json.hits < 10) {
        nextPage.disabled = true;
    }

    previousPage.disabled = true;
    
    let pageNumber = 1;
    for (let index = 0; index < 10; index++) {
        pictureBoxes[index].src = json.hits[index].previewURL;
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
    json = await response.json();
    for (let index = 0; index < 10; index++) {
        pictureBoxes[index].src = json.hits[index].previewURL;
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
    json = await response.json();
    for (let index = 0; index < 10; index++) {
        pictureBoxes[index].src = json.hits[index].previewURL;
    }
    if (pageNumber === 1) {
        previousPage.disabled = true;
    }
}


