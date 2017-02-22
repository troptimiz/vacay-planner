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
        'expander',
        'raty',
        'url'
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
        expander,
        raty,
        url
    ) {
            
        'use strict';
        var path = 'templates/list_product-tpl.html';
        var tplImages = globals.path.templates.productImages;
        var tplSpecs = globals.path.templates.productSpecs;
        var tplPriceDetails = globals.path.templates.pricingDetails;
        require(
            [
                'tpl!'+tplImages,
                'tpl!'+tplSpecs,
                'tpl!'+tplPriceDetails
            ], 
            function (
                tplImages,
                tplSpecs,
                tplPriceDetails
            ) {
            	globals.security.initHeader();
            	if(localStorage.status!="AUTH"){
            		  $('.login-pop').modal('toggle');
            		  
            		  $('.login-pop').on('hidden.bs.modal', function () {
            			  if(localStorage.status==="AUTH"){
            				  location.reload();
            			  }
            		  });
            		  
            		  globals.pgSlideshowInitialize();
                      globals.initialize();
            		  return;
            	}
            	var URL = globals.path.api.product.details;
                var tpl = globals.path.templates.productImages;
                var $productImagesContainer = $('.productSlideshow');
                var $productTabsContainer = $('.product-details-tabs');
                var productId = $.url('?pid');
                var selectedPackageId=$.url('?package');
                URL = URL+'/'+productId;   
                
                globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
                	data.selpackage=selectedPackageId;
                	
                	var productImages = tplImages.render(data);
                	var productTabs = tplSpecs.render(data);
                	
                	
                	$productImagesContainer.html(productImages);
                	$productTabsContainer.html(productTabs).promise().done(function(){
	            		var data={};
	            		data.numChild=$.url("?child");
	            		data.numAdult=$.url("?adult");
	            		data.packageId=$.url("?package");
	            		data.productId=$.url("?pid");
	            		console.log(JSON.stringify(data));
	            		globals.sendJSONRequest(globals.path.api.booking.computeTotal,'POST',JSON.stringify(data),"",
		            		function(pricingRes){
		            				console.log(JSON.stringify(pricingRes));
		            				var pricingdet=tplPriceDetails.render(pricingRes);
		            				$("#priceDetails").html(pricingdet);
		            				$("#totalAmount").text(pricingRes.total);
		            				$("#in-date").text($.url("?in-date"));
		            				if($.url("?out-date")){
		            					$("#out-date").text($.url("?out-date"));
		            				}
	            		});
                	});
                	globals.pgSlideshowInitialize();
                    globals.initialize();
                   
                    $("#name").text(data.name);
                    $(".star-rating").raty({  score: data.starRating}); 
                    $("#booking").submit(function(e){
                    		e.preventDefault();
                    		globals.payment.save();
                    });
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