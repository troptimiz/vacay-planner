define(['jquery','typeahead','btab','enscroll'],function($, typeahead, btab, enscroll){

// Home Search Tab
$(function() {
	$('#myTab').tabCollapse();
});

// Scrollbar
	$('.details').enscroll({
		showOnHover : false,
		verticalTrackClass : 'track',
		verticalHandleClass : 'handle'
	});

// Tooltip pop


// Sildeshow
$(document).ready(function() {
	$('.pgwSlideshow').pgwSlideshow();
});

// Read More
$(document).ready(function() {
//	$('div.expandDiv').expander({
//		slicePoint : 50, // It is the number of characters at which the
//							// contents will be sliced into two parts.
//		widow : 2,
//		expandSpeed : 0, // It is the time in second to show and hide the
//							// content.
//		userCollapseText : '- Less' // Specify your desired word default is
//									// Less.
//	});
//	$('div.expandDiv').expander();
});

});