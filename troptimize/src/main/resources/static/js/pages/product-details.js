(function (ts){
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
})(ttimz);