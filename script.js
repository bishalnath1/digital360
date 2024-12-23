
document.addEventListener("scroll", () => {
    const videoSection = document.querySelector(".wrapvideocontainer");
    const eventInfo = document.getElementById("event-info");

    // Get the distance of the second section from the top of the viewport
    const rect = videoSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger when the second section is 80% out of view
    if (rect.bottom < windowHeight * 0.2) {
        eventInfo.classList.add("fixed");
    } else {
        eventInfo.classList.remove("fixed");
    }
});


const testimonialsContainer = document.getElementById('testimonials-container');
const sliderProgress = document.getElementById('slider-progress');

// Listen for scroll events on the testimonials container
testimonialsContainer.addEventListener('scroll', () => {
    const scrollLeft = testimonialsContainer.scrollLeft; // How far scrolled
    const maxScrollLeft = testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth; // Total scrollable width

    // Calculate progress percentage
    const progressPercentage = (scrollLeft / maxScrollLeft) * 100;

    // Move the yellow line (progress bar) proportionally
    sliderProgress.style.transform = `translateX(${progressPercentage * 10}px)`;
    sliderProgress.style.transition = 'transform 0.2s ease-out';
});


// document.querySelectorAll('.accordion-item').forEach(item => {
//     const header = item.querySelector('.accordion-header');
//     const content = item.querySelector('.accordion-content');
//     const toggleButton = item.querySelector('.accordion-toggle img');

//     header.addEventListener('click', () => {
//         const isOpen = content.style.display === 'block';

//         // Close all items
//         document.querySelectorAll('.accordion-content').forEach(content => {
//             content.style.display = 'none';
//         });
//         document.querySelectorAll('.accordion-toggle img').forEach(button => {
//             button.src = 'assets/plusaccordian.svg';
//         });

//         // Toggle current item
//         if (!isOpen) {
//             content.style.display = 'block';
//             toggleButton.src = 'assets/minusaccordian.svg';
//         }
//     });
// });


// Select all elements with the class 'testimonial-card'
const testimonialCards = document.querySelectorAll('.testimonial-card');
const LoadMoreTestimonials = document.getElementById('loadmoretestimonials');

// Initially hide all cards except the first three (or as many as you want to show)
testimonialCards.forEach((card, index) => {
    if (index >= 9) {
        card.style.display = 'none'; // Hide all but the first 3
    }
});

// Event listener for "Load More" button
LoadMoreTestimonials.addEventListener('click', () => {
    testimonialCards.forEach(card => {
        card.style.display = 'block'; // Show all cards on button click
    });
    LoadMoreTestimonials.style.display = 'none'; // Hide the Load More button
});

$(document).ready(function () {
    // Initial setup: Open the first accordion by default
    const firstAccordionContent = $(".accordion-content").first();
    const firstAccordionToggle = $(".accordion-header").first().find(".accordion-toggle img");

    firstAccordionContent.addClass("open").slideDown(0); // Open the first accordion
    firstAccordionToggle.attr("src", "assets/minusaccordian.svg"); // Set the first toggle icon to minus

    // Handle accordion toggle on click
    $(".accordion-header").click(function () {
        const content = $(this).next(".accordion-content");
        const button = $(this).find(".accordion-toggle img");

        // If the current section is open, close it
        if (content.hasClass("open")) {
            content.slideUp().removeClass("open");
            button.attr("src", "assets/plusaccordian.svg"); // Set to plus icon
        } 
        // Otherwise, close all sections and open the clicked one
        else {
            // Close all other sections and reset icons
            $(".accordion-content.open").slideUp().removeClass("open");
            $(".accordion-toggle img").attr("src", "assets/plusaccordian.svg"); // Reset all to plus icon

            // Open the clicked section
            content.slideDown().addClass("open");
            button.attr("src", "assets/minusaccordian.svg"); // Set to minus icon
        }
    });
});




