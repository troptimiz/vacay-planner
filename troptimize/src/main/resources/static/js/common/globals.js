/**
 * Globals Namespace
 */
var globals = globals || {};
var ttimz = ttimz || {};


/**
 * Global api paths
 */
globals.path = {
    api: {
        product: {
            listing: '',
            details:'/troptimize/product'
        },
        search: {
            results: '/troptimize/product'
        }
    },
    templates: {
        productList: 'templates/list_product-tpl.html',
        productImages: 'templates/product-details_images.html'
    }
};

/**
 * Send JSON Request
 */
(function (gb) {
	/**
	 * Global initializations
	 */
	gb.initialize = function () {
		// Datepicker
		$(".date-input").datepicker({
			autoclose : true
		});

		//tooltip
		$('.tooltip-show').tooltip({
        	trigger : 'manual'
        }).tooltip('show');
		
		$('#dayout-location, #hotel-location').typeahead({
    		name : 'countries',

    		// data source
    		prefetch : 'data/countries.json',

    		// max item numbers list in the dropdown
    		limit : 10
    	});

		$('.thumbs').slick({
			  dots: false,
			  infinite: true,
			  autoplay: true,
			  arrows: true,
			  speed: 700,
			  slidesToShow: 3,
			  slidesToScroll: 1,
			    responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3
			      }
			    },
			    {
			      breakpoint: 730,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    },
				{
			      breakpoint: 320,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			  ]
			});
	};
	
	gb.pgSlideshowInitialize = function () {
		$('.productSlideshow').pgwSlideshow();
	};

    /**
     * Global function to send ajax request.
     * @param URL
     * @param method
     * @param data
     * @param success
     * @param error
     */
    gb.sendJSONRequest = function (URL, method, data, dataType, success, error) {
        console.log('sendJSONRequest initialized');
        $.ajax({
            url: URL,
            method: method || 'GET',
            data: data || '',
            success: success || function (data) {
            	console.log("no func:");
                console.log(data);
            },
            error: error || function (error, status) {
                console.log("error:" + error);
                console.log("status:" + status);
            }
        });
    };
    /**
     * Global function for get template.
     * @param tpl
     * @param JSONData
     * @returns {*}
     */
    gb.getTemplate = function (tpl, JSONData, callback) {
        $.get(tpl, callback || function(data){
        	console.log("No callback");
        });
    };
    
})(globals);
