let page = 1
let maxPage;
let infiniteScroll;
let lang = "es";

const countries = [
    {
        name: "usa",
        language: "en-US",
        flag: '🇺🇸',
    }, 
    {
        name: "col",
        language: "es",
        flag: "🇨🇴",
    },
    {
        name: "fra",
        language: "fr",
        flag: "🇫🇷",
    },
    {
        name: "bra",
        language: "pt-BR",
        flag: "🇧🇷",
    },
]

async function getLanguages() {
    countries.forEach((country) => {
    const languageOption = document.createElement('option');
    languageOption.setAttribute('value', country.language );
    languageOption.setAttribute('for', 'language');
    const languageText = document.createTextNode(country.flag);
    languageOption.appendChild(languageText);
    languageOptions.appendChild(languageOption);
    });
};
getLanguages()

// listeners
languageOptions.addEventListener("change", (event) => {
    lang = event.target.value;
    console.log(lang);
    homePage();
});

searchFormBtn.addEventListener("click", () => {
    if(searchFormInput.value) {
        location.hash = "#search=" + searchFormInput.value    
    }
})

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends"
})

arrowBtn.addEventListener("click", () => {
    history.back();
    // location.hash = "#home"
})

searchFormInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        const input = searchFormInput.value.trim();
        location.hash = `#search=${searchFormInput.value.trim()}`;
    }
});

window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)
window.addEventListener("scroll", infiniteScroll, { passive: false })


// navigation functions
function navigator () {
    console.log({ location });

    window.removeEventListener("scroll", infiniteScroll, { passive: false })
    infiniteScroll = undefined

    if(location.hash.startsWith("#trends")) {
        trendsPage()
    } else if (location.hash.startsWith("#search=")){
        searchPage()
    } else if (location.hash.startsWith("#movie=")){
        movieDetailsPage()
    } else if (location.hash.startsWith("#category=")){
        categoriesPage()
    } else {
        homePage()
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (infiniteScroll) {
        window.addEventListener("scroll", infiniteScroll, { passive: false })
    }
    page = 1;
}

function homePage() {
    console.log("HOME!!");

    headerSection.classList.remove("header-container--long")
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.remove("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.remove("inactive")
    languageOptions.classList.remove("inactive");
    

    trendingPreviewSection.classList.remove("inactive")
    categoriesPreviewSection.classList.remove("inactive")
    likedSection.classList.remove("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.add("inactive")

    getTrendingMoviesPreview()
    getCategoriesPreview()
    getLikedMovies()
}

function categoriesPage() {
    console.log("CATEGORIES!!");

    headerSection.classList.remove("header-container--long")
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.add("inactive")
    languageOptions.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    likedSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")

    const [_, categoryData] = location.hash.split("=")
    const [categoryId, categoryName] = categoryData.split("-")
    const categoryNameOk = decodeURI(categoryName) 

    getMoviesByCategory(categoryId);
    headerCategoryTitle.innerHTML = categoryNameOk

    infiniteScroll = getPaginatedMoviesByCategory(categoryId)
}

function movieDetailsPage() {
    console.log("MOVIE!!");

    headerSection.classList.add("header-container--long")
    // headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.add("inactive")
    languageOptions.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    likedSection.classList.add("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.remove("inactive")

    const [_, movieId] = location.hash.split("=")
    getMovieById(movieId);
}

function searchPage() {
    console.log("SEARCH!!");

    headerSection.classList.remove("header-container--long")
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.remove("inactive")
    languageOptions.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    likedSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")

    const [_, query] = location.hash.split("=");
    // const query = searchFormInput.value
    getMoviesBySearch(query)

    infiniteScroll = getPaginatedMoviesBySearch(query)
}

function trendsPage() {
    console.log("TRENDS!!");

    headerSection.classList.remove("header-container--long")
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.add("inactive")
    languageOptions.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    likedSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")

    headerCategoryTitle.innerHTML = "Trendings"
    getTrendingMovies()

    infiniteScroll = getPaginatedTrendingMovies
}




