//declaration of accessKey variable
const accessKey = "e4AU8sqwam0JiHJx1sPdxiS9LJm4ZO_CWfthPLk4qRc"

//declaration of HTML variables
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const homeButton = document.getElementById("home-button");

let inputData = "";
let page = 1;

//function for Image Search
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }
    //Mapping the results from Unsplash
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })
    //Show more pages
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

//function for Submit
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

//function for the Search button
showMore.addEventListener("click", () => {
    searchImages();
});

//function for the Home button
homeButton.addEventListener("click", () => {
    // You can add logic here to reset the page to its initial state
    // For now, let's just reload the page
    window.location.reload();
});