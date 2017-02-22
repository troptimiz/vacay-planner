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
        globals.security.initHeader();
        var tpl = globals.path.templates.productList;
        require(
            [
                'tpl!'+tpl
            ], 
            function (
                productList
            ) {
            	if($.url('?type')==='HOTEL'){
            		$("#hotel-location").val($.url('?location'));
            		$("#ptype").text("Search Hotel")
            		$("#hotelSearch").css("display","block");
            		$("#inDate").val($.url("?cinDate"));
            		$("#outDate").val($.url("?coutDate"));
            		$("#hotel-adult").val($.url('?adult'));
            		$("#hotel-child").val($.url('?child'));
            		
            	}else{
            		$("#date-fld1").val($.url('?date'));
            		$("#dayout-location").val($.url('?location'));
            		$("#ptype").text("Day-Out Resorts")
            		$("#dayOutSearch").css("display","block");
            		$("#dayout-adult").val($.url('?adult'));
            		$("#dayout-child").val($.url('?child'));
            	}
            		
            	//Update Search Result (Product Listing)
            	//update elite
            	renderProductList("ELITE", "elite");
            	
                //update mid-cost
                renderProductList("MID_COST", "midCost");

                //update low cost	
                renderProductList("LOW_COST", "lowCost");
                            

                function renderProductList(ctype,prefix){
                	var $productListContainer = $('#'+prefix+'List');
                	var URL = globals.path.api.search.results+"?q="+$.url('?location')+"&type="+$.url('?type')+"&ctype="+ctype;
                    globals.sendJSONRequest(URL, 'GET', '', '', function (data) {
                    	
                    	if(data.content.length>0){
    	                	var prodListContent = productList.render(data);
    	                	$productListContainer.html(prodListContent).promise().done(function(){
    	                		
    	                		if($.url('?type')==='HOTEL'){
    	                			$(".result-search-hotel").show();
    	                			$(".result-search-day-out").remove();
    	                			$(".in-date").val($.url("?cinDate"));
    	                    		$(".out-date").val($.url("?coutDate"));
    	                		}else{
    	                			$(".result-search-day-out").show();
    	                			$(".result-search-hotel").remove();
    	                			$(".in-date").val($.url('?date'));
    	                		}
    	                		$(".childcount").val($.url("?child"));
    	                		$(".adultcount").val($.url("?adult"));
    	                		

    	                		$(".star-rating").raty({  score: function() {
    	                		    return $(this).attr('data-score');
    	                		  }});
    	                		$("#"+prefix+" button").css("display","block");
    	                		$("#"+prefix+" button").on('click',function(){
    	                			if($("#"+prefix+" button i").hasClass('fa-arrow-down')){
    	                				$("#"+prefix+" .search-result-box").css("display","block");
    	                				$("#"+prefix+" button span").text("Less");
    		                			$("#"+prefix+" button i").removeClass("fa-arrow-down");
    		                			$("#"+prefix+" button i").addClass("fa-arrow-up");
    	                			}else{
    	                				$("#"+prefix+" .search-result-box:not(:first)").css("display","none");
    	                				$("#"+prefix+" button span").text("More");
    		                			$("#"+prefix+" button i").removeClass("fa-arrow-up");
    		                			$("#"+prefix+" button i").addClass("fa-arrow-down");
    	                			}
    	                		});
    	                	});
                    	}
                    	globals.initialize();
                    }); 
                }
                
                
            }
         )
    }
);