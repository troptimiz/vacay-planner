(function(ts){
    var URL = globals.path.api.search.results;
    var tpl = globals.path.templates.productList;
    var $productListContainer = $('.productListContainer');

    globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
        var productList = globals.sendJSONRequest(tpl,'GET','','',function(templ){
        	var tempFn = doT.template(templ);
        	console.log(JSON.toString(data));
        	productList = tempFn(data);
            $productListContainer.html(productList);
            globals.initialize();
        });
    });
})(ttimz);