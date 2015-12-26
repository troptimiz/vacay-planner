define(
    [
        'jquery',
        'bootstrap',
        '../../common/globals',
        'slick',
        'datepicker',
        'pgwslideshow',
        'responsive-menu',
        '../../main',
        'bspinner',
        'boostrap-tooltip'
    ],
    function( 
        $,
        bootstrap,
        core,
        slick,
        datepicker,
        pgwslideshow,
        responsiveMenu,
        main,
        bspinner,
        btooltip
    ) {
            
        'use strict';
        var path = 'templates/list_product-tpl.html';
        require(
            [
                'tpl!/troptimize/templates/list_product-tpl.html'
            ], 
            function (
                productList
            ) {
            	var $productListContainer = $('.productListContainer');
            	var URL = globals.path.api.search.results;

                globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
                	var prodListContent = productList.render(data);
                	$productListContainer.html(prodListContent).promise().done(function(){
                		globals.initialize();                		
                	});
                }); 
                
            }
         )
    }
);