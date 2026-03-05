/**********************************************************************************************************************
 * Program............: Smartwatch FAQ
 * Programmers........: Ben Stearns
 * Date...............: 3-3-26
 * GitHub Repo........: https://github.com/bstearns07/SmartwatchFAQ
 * Program Summary....: a JavaScript web application simulating image swapping and collapsable elements
 * File Description...: defines the JavaScript logic for handling image swaps and collapsing text on button clicks
 **********************************************************************************************************************/

/***********************************************************************************************************************
* Retrieves an element by a given CSS selector
 *
 * @params selector The CSS selector to use for retrieving a DOM element
 *
 * @returns {Element|null}
* *********************************************************************************************************************/
const getElement = selector => document.querySelector(selector);

//cache main image display element and it's original src and alt attribute values
const faqImage = getElement("#faq_image");
const faqImageOrigSrc = faqImage.src;
const faqImageOrigAlt = faqImage.alt;
const h2s = document.querySelectorAll("#faqs h2")

/***********************************************************************************************************************
 * Handles all image swap and text collapse logic for clicking of the h2 elements of the interface
 *
 * @params evt The event object defining the click event information
 *
 * @returns {void}
 * *********************************************************************************************************************/
const toggleVisibility = evt => {
    const ct = evt.currentTarget;   // the h2 element the user clicked on
    let allClosed = false;             // defines whether all the h2 inner <p> text is currently hidden

    // loop through every h2 element of the interface
    for (let h2 of h2s){
        /*
        * if the h2 element matches what the user clicked:
        *   - all content must be closed if the class clicked contains "minus". set boolean appropriately
        *   - toggle the clicked h2's minus class and its sibling's open class so that the sibling hides
        *   - update the image on display by coping the clicked h2's src and alt text to the main display
        * Otherwise, ensure the h2 displays the + image, and it's sibling isn't open
        */
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
    // if the user's click resulting in collapsing all h2 text, restore the main image display to the default image
    if (allClosed) {
        faqImage.setAttribute("src", faqImageOrigSrc);
        faqImage.setAttribute("alt", faqImageOrigAlt);
    }
    evt.preventDefault(); //prevent the default browser handling for the click event
}

// add the click event listener to all h2 elements when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    for (h2 of h2s){
        h2.addEventListener("click", toggleVisibility);

        //add the h2 to natural tab order and toggle its visibility when enter or space is pressed while having focus
        h2.setAttribute("tabindex", "0");
        h2.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ")
                toggleVisibility(event);
        })
    }
})