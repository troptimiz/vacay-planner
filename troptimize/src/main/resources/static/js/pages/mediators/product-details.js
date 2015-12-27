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
        'boostrap-tooltip',
        'expander'
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
        btooltip,
        expander
    ) {
            
        'use strict';
        var path = 'templates/list_product-tpl.html';
        var tplImages = globals.path.templates.productImages;
        var tplSpecs = globals.path.templates.productSpecs;
        require(
            [
                'tpl!'+tplImages,
                'tpl!'+tplSpecs
            ], 
            function (
                tplImages,
                tplSpecs
            ) {
            	var URL = globals.path.api.product.details;
                var tpl = globals.path.templates.productImages;
                var $productImagesContainer = $('.productSlideshow');
                var $productTabsContainer = $('.product-details-tabs');
                var productId = window.location.href.split('id=')[1];
                URL = URL+'/'+productId;                
            	
                globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
                	var productImages = tplImages.render(data);
                	var productTabs = tplSpecs.render(data);
                	
                	$productImagesContainer.html(productImages);
                	$productTabsContainer.html(productTabs);
                    globals.pgSlideshowInitialize();
                    globals.initialize();
                });
                
            }
         )
    }
);



/*(function (ts){
	var URL = globals.path.api.product.details;
    var tpl = globals.path.templates.productImages;
    var $productImagesContainer = $('.productSlideshow');
    var productId = window.location.href.split('id=')[1];
    URL = URL+'/'+productId;   
    

    globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
       globals.sendJSONRequest(tpl,'GET','','',function(templ){
        	var tempFn = doT.template(templ);
        	productImages = tempFn(data);
        	$productImagesContainer.html(productImages);
            globals.pgSlideshowInitialize();
        });
    });
})(ttimz);*/