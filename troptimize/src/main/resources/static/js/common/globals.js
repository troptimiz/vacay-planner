/**
 * Globals Namespace
 */
var globals = globals || {};
var ttimz = ttimz || {};

globals.savepdf=function(){
	var doc = new jsPDF();
	var specialElementHandlers = {
			'#editor': function(element, renderer){
				return true;
			}
		};
	doc.fromHTML($('body').get(0), 15, 15, {
		'width': 170, 
		'elementHandlers': specialElementHandlers
	});
	doc.save('ttimz_invoice.pdf');
}

//first call save to store the data in db and then call process once save return to redirect to PGtway to process payment
globals.payment={
		save:function(){
			var data={};
			data.packageId=$.url("?package");
			data.propertyId=$.url("?pid");
			data.firstName=$("#fname").val();
			data.lastName=$("#lname").val();
			data.email=$("#email").val();
			data.contactNumber=$("#mobNo").val();
			data.numOfAdult= $.url("?adult");
			data.numOfChild=$.url("?child");
//			data.numOfGents=$("#totGents").val();
//			data.numOfLadies=$("#totLadies").val();
			data.checkInDate=$.url("?in-date");
			
			if($.url("?out-date")){
				data.checkoutDate=$.url("?out-date");
			}
			console.log(JSON.stringify(data));
			console.log(globals.path.api.booking.save);
			globals.sendJSONRequest(globals.path.api.booking.save, "POST", JSON.stringify(data), null, function(res){
				console.log("RESPONSE-=--=-=-=-=-=-=-=-=-");
				console.log(JSON.stringify(res));
				$("#merchantTxnId").val(res.payment.transactionId);
				$("#orderAmount").val(res.totalAmount);
				$("#currency").val("INR");
				$("#returnUrl").val("https://pilot-troptimiz.rhcloud.com/troptimize/booking/confirm?id="+res.id);
				$("#secSignature").val(res.payment.secSignature);
				$("#payProcess").submit();
				
			}, null);

		},
		process:function(){
			
		}
}

globals.security={
		initHeader:function(){
			var status=(localStorage.status || 'guest');
			if(status==='AUTH'){
				$(".h-signup").remove();
				$(".h-login").remove();
				$(".logout").css("display","block");
			}

		},
		googleLogin:function(googleUser){
			   console.log(googleUser.getBasicProfile().getName());
		       console.log(googleUser.getBasicProfile().getEmail());
		       var data={};
		       data.username=googleUser.getBasicProfile().getEmail();
		       data.firstName=googleUser.getBasicProfile().getName().split()[0];
		       data.lastName=googleUser.getBasicProfile().getName().split()[1];
		       globals.sendJSONRequest(globals.path.api.account.socialLogin, "POST", JSON.stringify(data), null, function(data){
		    	   localStorage.status="AUTH";
				   localStorage.authtype="google";
				   globals.security.initHeader();
				  $('.login-pop').modal('toggle');
		       }, null);
		       
		}
}

/**
 * Global api paths
 */
globals.path = {
    api: {
        product: {
            listing: '',
            details:'/troptimize/product',
            facility:'facilities'
        },
        search: {
            results: '/troptimize/product/search'
        },
        booking:{
        	computeTotal:'/troptimize/booking/price/compute',
        	save:"/troptimize/booking/",
        	get:"/troptimize/booking/"
        },
        account:{
        	signUp:'/troptimize/account/register',
        	fbSignup:'/troptimize/account/register/social/fb',
        	login:'/troptimize/account/login',
        	fbLogin:'/troptimize/account/login/fb',
        	socialLogin:'/troptimize/account/login/social'
        }
    },
    templates: {
        productList: '/troptimize/templates/list_product-tpl.html',
        productImages: '/troptimize/templates/product-details_images.html',
        productSpecs : '/troptimize/templates/product-details_tabs.html',
        pricingDetails:'/troptimize/templates/price_detail.tpl.html',
        overview:'/troptimize/templates/overview.tpl.html'
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
		
		$(".sign-up").click(function(e){
			e.preventDefault();
			var data={};
			data.firstName=$(".signup-fname").val();
			data.lastName=$(".signup-lname").val();
			data.username=$(".signup-email").val();
			data.password=$(".signup-password").val();
			gb.sendJSONRequest(globals.path.api.account.signUp, "POST",JSON.stringify(data), null, function(data){
				$('.signup-pop').modal('toggle');
				localStorage.status="AUTH";
				localStorage.authtype="TRop";
				globals.security.initHeader();
				 
			}, function(){
				//alert("Email already used");
				 $("#badSignup").css("display","block");
			});
		});
		
		$(".fb-signup").click(function(){
			FB.login(function(response){
				if (response.status === 'connected') {
					FB.api('/me?fields=id,email,first_name,last_name', function(response) {
					    //get data and store to db.IF already exist return data.
					    var data={};
					    data.username=response.email;
					    data.firstName=response.first_name;
					    data.lastName=response.last_name;

					    gb.sendJSONRequest(globals.path.api.account.fbSignup, "POST", JSON.stringify(data),null, function(data){
					    	$('.signup-pop').modal('toggle');
					    	localStorage.status="AUTH";
					    	localStorage.authtype="FB";
					    	globals.security.initHeader();
					    }, null); 
					});
					
				  }
			},{scope: 'public_profile,email'});
			
			
		});
		
		$(".logout-btn").click(function(){
			$("#logout-form").submit();
			if(localStorage.authtype==="fb"){
				FB.logout();
			}else if(localStorage.authtype==="google"){
				 var auth2 = gapi.auth2.getAuthInstance();
				    auth2.signOut().then(function () {
				      console.log('User signed out.');
				    });
			}
			localStorage.clear();
		});
		$(".log-in").click(function(){
			
			var data={};
			data.username=$(".login-uname").val();
			data.password=$(".login-pass").val();
			
			var url=globals.path.api.account.login;
			if($(".login-remember").is(":checked")){
			 url+="?remember-me=true";	
			}else{
				 url+="?remember-me=false";	
			}
			
			gb.sendJSONRequest(url, "POST", JSON.stringify(data),null, function(data){
				$('.login-pop').modal('toggle');
				localStorage.status="AUTH";
				localStorage.authtype="TRop";
				globals.security.initHeader();
			}, function(e){
				
				if(e.status===403){
					 $("#badlogin").text("Verify Email to login.")
					 $("#badlogin").css("display","block");
				}else{
				  $("#badlogin").css("display","block");
				}
			});
			
		});
		$(".fb-login").click(function(){
			FB.login(function(response){
				
				if(response.status==="connected"){
					FB.api('/me?fields=id,email,first_name,last_name', function(response) {
						
						 var data={};
						    data.username=response.email;
						    data.firstName=response.first_name;
						    data.lastName=response.last_name;
						    
						    console.log(JSON.stringify(data));
						gb.sendJSONRequest(globals.path.api.account.socialLogin,"POST", JSON.stringify(data),null,
						function(data){
							$('.login-pop').modal('toggle');
							localStorage.status="AUTH";
							localStorage.authtype="FB";
							globals.security.initHeader();
						}, function(e){
							console.log(JSON.stringify(e));
							  $("#badlogin").css("display","block");
							  FB.logout();
						});
						
				});
				}
				
			},{scope: 'public_profile,email'});
		});
/*		$(".login-form").submit(function(e){
			  $.ajax({
		           type: "POST",
		           url: '/troptimize/login',
		           data: $(".login-form").serialize(), // serializes the form's elements.
		           success: function(datal,status,xhr)
		           {
//		        	   alert(JSON.stringify(status));
//		        	   alert(JSON.stringify(xhr));
		        	   
		        	   //workaround must either create custom Remember-me service 
		        	   if(xhr.responseText.startsWith("<!doctype html>")){
		        		   $('.login-pop').modal('toggle');
		        		   
		        		   //update localstorage and update headers 
		        	   }else{
		        		   $("#badlogin").css("display","block");
		        	   }
		        	   
		           },
		           error:function(data){
		        	   
		           }
		         });
			  e.preventDefault();
		});*/
		
		// Datepicker
		$(".date-input").datepicker({
			startDate: new Date(),
			autoclose : true
			
		});

		//tooltip
		$('.tooltip-show').tooltip({
        	trigger : 'manual'
        }).tooltip('show');
		
		//typeahead		
		$('#dayout-location, #hotel-location').typeahead({
    		name : 'cities-simple',

    		// data source
    		prefetch : 'data/cities-simple.json',

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
        $.ajax({
            url: URL,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
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
