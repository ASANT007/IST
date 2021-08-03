//[Master Javascript]

//Project:	Law Firm - Onepage Html Responsive Template
//Version:	1.1
//Last change:	10/01/2017 [fixed bug]
//Primary use:	Law Firm - Onepage Html Responsive Template 


//theme script here

$(document).ready(function(){
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 70)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 71
    });

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').on('click', function(event) {
		$(this).closest('.collapse').collapse('toggle');
	});

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })


    // Initialize and Configure Scroll Reveal Animation
	
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);
	    
	
	
	// End of use strict
	
	$('.flexslider').flexslider({
		animation: "fade",
		controlNav: false,
		directionNav: false,
	});
	
   
}); // End of use strict
