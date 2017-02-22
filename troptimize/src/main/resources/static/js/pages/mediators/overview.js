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
        'boostrap-tooltip'
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
        btooltip
    ) {
            
        'use strict';
        var tplOverview = globals.path.templates.overview;
        var tplPriceDetails = globals.path.templates.pricingDetails;
        
        require(
                [
                    'tpl!'+tplOverview,
                    'tpl!'+tplPriceDetails
                   
                ], 
                function (
                		tplOverview,
                		tplPriceDetails
                ) {
        
        globals.security.initHeader();
        
   		globals.sendJSONRequest(globals.path.api.booking.get+"/"+$.url("?id"),'GET',null,null,
        		function(res){
        				console.log(JSON.stringify(res));
        				var overviewHtml=tplOverview.render(res);
        				$("#details").html(overviewHtml);
        				
        				var pricingHtml=tplPriceDetails.render(res.pricingDetails);
        				$("#pricingDetails").html(pricingHtml);
        				$("#total").text("Rs."+res.totalAmount+"/-")
        				
    		});
        
        
        globals.initialize();
        
        
        
      })  
    }
);