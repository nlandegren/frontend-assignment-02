const apiKey = '23524770-cd261b46e16ac6158fc07abc8';

const form = document.querySelector('form');
form.onsubmit = async event => {
    event.preventDefault();

    const search = form.elements.text.value;
    const color = form.elements.color.value;

    const params = new URLSearchParams({
        q: search,
        colors: color,
        key: apiKey,
    });

}

