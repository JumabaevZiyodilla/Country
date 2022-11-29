// DOM ELEMENTS
const elChangeThemeBtn = document.querySelector(".header-btn");
const elCountryForm = document.querySelector(".country__form");
const elCountryInput = elCountryForm.querySelector(".country__input-search");
const elCountrySelect = elCountryForm.querySelector(".country__select");
const elCountryList = document.querySelector(".country-list");
const elCountryTemplate = document.querySelector(".country-list__template").content;
const elTheme = document.querySelector(".theme-dark");

const countryFragment = document.createDocumentFragment();

// THEME CHANGE
let darkMode = false;

if(localStorage.getItem("theme") === "dark"){
    darkMode = true;
}else if(localStorage.getItem("theme") === "light"){
    darkMode = false;
}
if(darkMode){
    document.body.classList.toggle("dark");
}
elChangeThemeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light")
});

const elModal = document.querySelector(".modal");
const elModalImg = document.querySelector(".modal__img");
const elModalTitle = document.querySelector(".modal__title");
const elModalRegion = document.querySelector(".modal__region-span");
const elModalCurrencies = document.querySelector(".modal__currencies-span");
const elModalBorders = document.querySelector(".modal__borders-span");
const elModalLanguages = document.querySelector(".modal__languages-span");
const elModalSubregion = document.querySelector(".modal__subregion-span");
const elModalMaps = document.querySelector(".modal__maps");

function renderModalInfo(country){
    elModalImg.src = country.flags.svg;
    elModalTitle.textContent = country.name.common;
    elModalRegion.textContent = country.region;
    elModalLanguages.textContent = Object.values(country.languages);
    elModalBorders.textContent = country.borders?.join(", ");
    elModalCurrencies.textContent = (country.currencies[Object.keys(country.currencies)].name);
    elModalSubregion.textContent = country.subregion;
    elModalMaps.href = country.maps.googleMaps;
};




function renderCountry(array, list) {

    if (array.length > 0) {
        list.innerHTML = "";
    } else {
        list.innerHTML = "There is no such state";
    }
    array.forEach((element) => {
        const countryFragmentClone = elCountryTemplate.cloneNode(true);
        countryFragmentClone.querySelector(".country-list__img").src = element.flags.svg;
        countryFragmentClone.querySelector(".country-list__img").alt = element.name.common;
        countryFragmentClone.querySelector(".country-list__title").textContent = element.name.common;
        countryFragmentClone.querySelector(".country-list__population").textContent = element.population;
        countryFragmentClone.querySelector(".country-list__region").textContent = element.region;
        countryFragmentClone.querySelector(".country-list__capital").textContent = element.capital;
        countryFragmentClone.querySelector(".country-list__btn").dataset.id = element.name.common;
        countryFragment.appendChild(countryFragmentClone);

    })
    list.appendChild(countryFragment);

}

async function countryGetUrl(url) {
    try {
        const response = await (await fetch(url)).json();
        // console.log(response);
        

        elCountryList.addEventListener("click", evt => {
            if(evt.target.matches(".country-list__btn")){
                const btnId = evt.target.dataset.id;
                const foundCountry = response.find(item => item.name.common == btnId);
                renderModalInfo(foundCountry);
            }
        });
        renderCountry(response, elCountryList);
    } catch (error) {
        console.log(error);
    }
}
countryGetUrl("https://restcountries.com/v3.1/all");

elCountryForm.addEventListener("submit", evt => {
    evt.preventDefault();

    countryGetUrl(`https://restcountries.com/v3.1/name/${elCountryInput.value}`);
});
elCountrySelect.addEventListener("change", () => {
    if (elCountrySelect.value == "all") {
        countryGetUrl("https://restcountries.com/v3.1/all");
    } else {
        countryGetUrl(`https://restcountries.com/v3.1/region/${elCountrySelect.value}`);
    }
});

// TIME NOW
const currentTime = document.querySelector(".title-time");
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

});
