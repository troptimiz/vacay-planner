define(
    [
        'jquery',
        'url',
        'bootstrap',
        '../../common/globals',
        'slick',
        'datepicker',
        'pgwslideshow',
        'responsive-menu',
        '../../main',
        'bspinner',
        'boostrap-tooltip',
        'raty'
    ],
    function( 
        $,
        url,
        bootstrap,
        core,
        slick,
        datepicker,
        pgwslideshow,
        responsiveMenu,
        main,
        bspinner,
        btooltip,
        raty
    ) {
            
        'use strict';
       // var path = 'templates/list_product-tpl.html';
        var tpl = globals.path.templates.productList;
        require(
            [
                'tpl!'+tpl
            ], 
            function (
                productList
            ) {
            	var $productListContainer = $('.productListContainer');
            	console.log($.url('?dayout-location'));
            	var URL = globals.path.api.search.results+"?q="+$.url('?dayout-location');
            	$("#dayout-location").val($.url('?dayout-location'));
                globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
//                	var fURL=globals.path.api.product.details
//                	globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
//                		
//                	});
                	
                	var prodListContent = productList.render(data);
                	$productListContainer.html(prodListContent).promise().done(function(){
                		globals.initialize();
                		$(".star-rating").raty({  score: function() {
                		    return $(this).attr('data-score');
                		  }}); 
                	});
                }); 
                
            }
         )
    }
);