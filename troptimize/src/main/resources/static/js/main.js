// Autotype
    $(function(){

      // applied typeahead to the text input box
      $('#dayout-location, #hotel-location').typeahead({
        name: 'countries',

        // data source
        prefetch: 'data/countries.json',

        // max item numbers list in the dropdown
        limit: 10
      });

    });
	
// Datepicker
$(window).load(function(){
$(".date-input").datepicker({
	autoclose: true
});
});

// Home Search Tab
$(function(){
$('#myTab').tabCollapse();
});

// Scrollbar
$(function(){
$('.details').enscroll({
    showOnHover: false,
    verticalTrackClass: 'track',
    verticalHandleClass: 'handle'
});
});

// Tooltip pop
$('.tooltip-show').tooltip({trigger: 'manual'}).tooltip('show');

// Sildeshow
 $(document).ready(function() {
    $('.pgwSlideshow').pgwSlideshow();
});

// Read More
$(document).ready(function() {
  $('div.expandDiv').expander({
    slicePoint: 50, //It is the number of characters at which the contents will be sliced into two parts.
    widow: 2,
    expandSpeed: 0, // It is the time in second to show and hide the content.
    userCollapseText: '- Less' // Specify your desired word default is Less.
  });
  $('div.expandDiv').expander();
});
