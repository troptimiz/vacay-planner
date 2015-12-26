define(
    [
        'jquery',
        '../../common/globals',
        'slick',
        'datepicker'

    ],
    function( 
        $,
        core,
        slick,
        datepicker
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

/*
 * (function(ts){ var URL = globals.path.api.search.results; var tpl =
 * globals.path.templates.productList; var $productListContainer =
 * $('.productListContainer');
 * 
 * globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
 * globals.sendJSONRequest(tpl,'GET','','',function(templ){ var tempFn =
 * doT.template(templ); console.log(JSON.toString(data)); productList =
 * tempFn(data); $productListContainer.html(productList); globals.initialize();
 * }); }); })(ttimz);
 */