const elChangeThemeBtn = document.querySelector(".header-btn");

elChangeThemeBtn.addEventListener("click", function(){
    document.body.classList.toggle("theme-dark");
});