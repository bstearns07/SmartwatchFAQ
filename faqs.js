/**********************************************************************************************************************
 * Program............: Smartwatch FAQ
 * Programmers........: Ben Stearns
 * Date...............: 3-3-26
 * GitHub Repo........: https://github.com/bstearns07/SmartwatchFAQ
 * Description........: a JavaScript web application simulating image swapping and collapsable elements
 * File Description...: defines the JavaScript logic for handling image swaps and collapsing text on button clicks
 **********************************************************************************************************************/

const getElement = selector => document.querySelector(selector);

//cache DOM elements and their necessary attributes
const faqImage = getElement("#faq_image");
const faqImageOrigSrc = faqImage.src;
const faqImageOrigAlt = faqImage.alt;
const h2s = document.querySelectorAll("#faqs h2")

// click event handler
const toggleVisibility = evt => {
    const ct = evt.currentTarget;
    let allClosed = false;

    for (let h2 of h2s){
        if (h2 === ct) {
            if (h2.classList.contains("minus")){
                allClosed = true;
            }
            h2.classList.toggle("minus");
            h2.nextElementSibling.classList.toggle("open");
            const newSrc = h2.getAttribute("data-img");
            const newAlt = h2.getAttribute("data-alt");
            faqImage.setAttribute("src", newSrc);
            faqImage.setAttribute("alt", newAlt);
        }
        else {
            h2.classList.remove("minus");
            h2.nextElementSibling.classList.remove("open");
        }
    }
    if (allClosed) {
        faqImage.setAttribute("src", faqImageOrigSrc);
        faqImage.setAttribute("alt", faqImageOrigAlt);
    }
    evt.preventDefault();
}

// establish event listeners
document.addEventListener("DOMContentLoaded", () => {
    for (h2 of h2s){
        h2.addEventListener("click", toggleVisibility);
    }
})