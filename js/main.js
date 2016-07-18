var parentSlideIndex = 0; // About, Work, Contact. 3 only
var childSlideIndex = 0; // About has 3, Work as 3, Contact has only 1.
var maxAboutSlides = 3;
var maxWorkSlides = 3;
var deltaScrollY = 0;
var lastScrollY = 0;
var numSlides = 3; // gotta be a more elegant way than to hardcode the number of slides. I guess classing each slide div and then counting them? Meh.
var scrolling = false;



$(document).ready(function(){
	MoveToSlide(0,0);
	$(window).scroll(function(){
		lastScrollY = window.scrollY;
	});
	$(window).resize(function(){
		var h = window.innerHeight;
		//var scrollTop = currentSlideIndex * h; 
		//$('body').scrollTop(h * scrollTop);
		// console.log('st:'+scrollTop);
	});
	
	 $('body').bind('mousewheel', function(e){
		deltaScrollY = e.originalEvent.wheelDelta;
		e.preventDefault();
		//deltaScrollY = window.scrollY - lastScrollY;
		if (scrolling) {
			return;
		}	
		if (deltaScrollY < 0) { // user scrolled down
			console.log('try move down from:'+parentSlideIndex+','+childSlideIndex);	
			if (parentSlideIndex == 0){ // ABOUT
				if (childSlideIndex < maxAboutSlides-1) { 
					MoveToSlide(0,childSlideIndex+1);
				} else {
					MoveToSlide(1,0);
				}
			} else if (parentSlideIndex == 1){ // WORK
				if (childSlideIndex < maxWorkSlides-1){
					MoveToSlide(1,childSlideIndex+1);
				} else {
					MoveToSlide(2,0);
				}
			} else { // CONTACT
				// User could not slide down. Do nothing
			}
		} else if (deltaScrollY > 0){ // user scrolled up
			console.log('try move up from:'+parentSlideIndex+','+childSlideIndex);	
			if (parentSlideIndex == 0){ // ABOUT
				if (childSlideIndex > 0) { 
					MoveToSlide(0,childSlideIndex-1); // Move up one About slide.
				} else {
					// User was at top of page, could not slide up. Do nothing.
				}
			} else if (parentSlideIndex == 1){ // WORK
				if (childSlideIndex > 0 ){
					MoveToSlide(1,childSlideIndex-1); // Move up one work slide.
				} else {
					MoveToSlide(0, maxAboutSlides-1); // Move up to the last About slide.
				}
			} else { // CONTACT
				MoveToSlide(1,maxWorkSlides-1); // Move to the last work slide.
			}
		}

	});

	$( "#navBar ul li").click(function(){
		MoveToSlide(Math.max($(this).index()-1,0),0);		
	});




	
});

function MoveToSlide(p,c){
	console.log('moving:'+p+','+c);
	parentSlideIndex = p;
	childSlideIndex = c; 
	scrolling = true;

	// Hide slides by opactiy "0". We'll set the current parent slide opacity to "1" in a sec.	
	$('#aboutSlides').css('opacity','0');	
	$('#workSlides').css('opacity','0');	
	$('#contactSlide').css('opacity','0');	

	if (parentSlideIndex == 0){ // The current slide was "About".
		 // Fade in the "About" slide.	
		$('#aboutSlides').css('opacity','1');

		// Remove "seleceted" class from all right-hand nav dots.	
		// then "select" class to appropraiate about dot.
		$( "#aboutDots ul li").each(function(){ 
			$(this).removeClass('selected');
		 }); 
		$('#aboutDots ul li:nth-child('+(childSlideIndex+1)+')').addClass('selected'); 

		// Hide each of the about texts, 
		// Then show only the selected by its childslideindex
		$( "#aboutSlides > ul li").each(function(){
			$(this).css('opacity','0');
		 }); 
		$('#aboutSlides > ul li:nth-child('+(childSlideIndex+1)+')').css('opacity','1'); 
	
		// Set the blur of the background based on the child index
		$('#aboutImage').css('-webkit-filter','blur('+(childSlideIndex * 5)+'px)');

		// Move the background image position based on child index
		var n = '0 -'+(childSlideIndex * 50);
		$('#aboutImage').css('background-position',n);

		
	} else if (parentSlideIndex == 1){ // Work slides selected.
		// Show the work slide opacity 1.
		$('#workSlides').css('opacity','1');

		// Calc how far we should scroll for each work child, and animate it.
		var h = window.innerHeight;
		var scrollTop = childSlideIndex  * h; 
		$('body').stop(true,true); 
		$('body').animate({
			scrollTop: scrollTop 
		}, {
			duration: 500
		});
	} else if (parentSlideIndex == 2){
		$('#contactSlide').css('opacity','1');	
	}

	// If we were moving between about slides, 
		// mod the fade of the about background appropriately 
		// mod height offset of backgroun
		// and handle current text group  fade by index (li childes for text)
	
	// If we were navigating between contact, about and work,
		// Fade one out and the other in
		// Adjust background and padding for faded in slide.
	
	// If we were navigating between work slides,
		// scroll the page up or down accordingly

	// Set the underline to the appropriate index
	$( "#navBar ul li").each(function(){
		$(this).removeClass('selected');
	 }); 
	$('#navBar ul li:nth-child('+(parentSlideIndex+2)+')').addClass('selected');			setTimeout(function() {	scrolling = false;		}, 1500);
	return;

	// Moving between work slids works like this:
		
//	$( "ul#navBar  li:nth-child("+currentSlideIndex+")" ).addClass('selected'); 
}
