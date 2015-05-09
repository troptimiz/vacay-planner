/* Data table initialization */
var obj = {};
var editor;
$(document).ready(function(){
	obj.init();	
});
obj = {
	init : function(){
        $('.cat-list .delete').on('click',function(e){
            e.preventDefault();
            var $ths = $(this);
            var del_id = $ths.parents('.delete-edit-container').find('#category_id').val();
            $.ajax({
                url:"/categories/category/"+del_id,
                method:"DELETE",
                success:function(data){
                    $ths.parents('tr').fadeOut(500,function(){
                        $ths.parents('tr').remove();
                    });
                }
            });
        });
        $('.add-category').on('click',function(){
            $('.cat-list').fadeOut(500,function(){
                $('.add-form-container').fadeIn(500);                
            });
        });
        $('.cancel-category-addition').on('click',function(){
            $('.add-form-container').fadeOut(500,function(){
                $('.cat-list').fadeIn(500);                
            });
        });
        
        //Add category service request
        $('#add-new-category').on('click',function(){
            var formData = $('#add-category-form').serialize();
            $.ajax({
                url:"/categories/category/",
                data:formData,
                method:"PUT",
                success:function(){
                    location.href="/categories/list";
                    console.log("Added");
                }
            });
        });
        $('#edit-category').on('click',function(){
            var formData = $('#edit-category-form').serialize();
            var recordId = $('#edit-category-form').find('input[name="id"]').val();
            console.log(recordId);
            $.ajax({
                url:"/categories/category/"+recordId,
                data:formData,
                method:"POST",
                success:function(){
                    location.href="/categories/list";
                    console.log("Updated");
                }
            });
        });
		
        /* Product related actions */
        
        /*Add Product*/
        $('#add-product').on('click',function(e){
            e.preventDefault();
            var URL = "/products/product/";
            var formData = $('#add-product-form').serialize();
            obj.sendAjax(URL,"PUT",formData,obj.redtSuccess('/categories'));
        
        });
        
        /*Edit Product*/
        $('#edit-product').on('click',function(e){
            e.preventDefault();
            var productId = $('#edit-product-form').find('input[name="id"]').val();
            var URL = "/products/product/"+productId;
            var formData = $('#edit-product-form').serialize();
            obj.sendAjax(URL,"POST",formData,obj.redtSuccess('/categories'));
        
        });
        /*Delete Product*/
        $('.search-result-table').on('click','.delete',function(e){
            e.preventDefault();            
            var URL = $(this).attr('href');
            var $ths = $(this);
            obj.sendAjax(URL,'DELETE','',obj.deleteSuccess($ths,'tr'));
        });
        
        /* Create New address */
        $('#add-address').on('click',function(){
            var formData = $('#add-address-form').serialize();
            var productId = $('#add-address-form').find('input[name="id"]').val();
            var URL = "/products/"+productId+"/address";
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Update Address /:productId/address/:addressId*/
        $('#update-address').on('click',function(e){
            e.preventDefault();
            var formData = $('#update-address-form').serialize();
            var productId = $('#update-address-form').find('input[name="id"]').val(); 
            var addressId = $('#update-address-form').find('input[name="addressId"]').val();
            var URL = "/products/"+productId+"/address/"+addressId;
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Delete address*/
        $('.vacay-table .delete-edit-container').on('click','.delete',function(e){
            e.preventDefault();
            var URL = "/products"+$(this).attr('href');
            var $ths = $(this);
            if(confirm("Do you want to delete the record")){
                obj.sendAjax(URL,'DELETE','',obj.deleteSuccess($ths,'tr'));
            }
        });
        /*Add tariff*/
        $('#add-tariff').on('click',function(){
            var formData = $('#add-tariff-form').serialize();
            var productId = $('#add-tariff-form').find('input[name="id"]').val();
            var URL = "/products/"+productId+"/tariff";
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Update tariff /:productId/address/:addressId*/
        $('#update-tariff').on('click',function(e){
            e.preventDefault();
            var formData = $('#update-tariff-form').serialize();
            var productId = $('#update-tariff-form').find('input[name="id"]').val();
            var tariffId = $('#update-tariff-form').find('input[name="tariffId"]').val();
            var URL = "/products/"+productId+"/tariff/"+tariffId;
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Delete tariff*/
        $('.tariffs-container .delete-edit-container').on('click','.delete',function(e){
            e.preventDefault();
            var URL = "/products"+$(this).attr('href');
            var $ths = $(this);
            if(confirm("Do you want to delete the record")){
                obj.sendAjax(URL,'DELETE','',obj.deleteSuccess($ths,'.tariffs-container'));
            }
        });
        
        /*Add amenity*/
        $('#add-amenity').on('click',function(){
            var formData = $('#add-amenity-form').serialize();
            var productId = $('#add-amenity-form').find('input[name="id"]').val();
            var URL = "/products/"+productId+"/amenity";
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Update amenity /:productId/address/:addressId*/
        $('#update-amenity').on('click',function(e){
            e.preventDefault();
            var formData = $('#update-amenity-form').serialize();
            var productId = $('#update-amenity-form').find('input[name="id"]').val();
            var amenityId = $('#update-amenity-form').find('input[name="amenityId"]').val();
            var URL = "/products/"+productId+"/amenity/"+amenityId;
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        /*Delete amenity*/
        $('.amenities-container .delete-edit-container').on('click','.delete',function(e){
            e.preventDefault();
            var URL = "/products"+$(this).attr('href');
            var $ths = $(this);
            if(confirm("Do you want to delete the record")){
                obj.sendAjax(URL,'DELETE','',obj.deleteSuccess($ths,'.amenities-container'));
            }
        });
        
        
        /*Add termsAndConditions*/
        $('#add-termsAndConditions').on('click',function(){
            var formData = $('#add-termsAndConditions-form').serialize();
            var productId = $('#add-termsAndConditions-form').find('input[name="id"]').val();
            var URL = "/products/"+productId+"/termsconditions";
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Update termsAndConditions /:productId/address/:addressId*/
        $('#update-termsAndConditions').on('click',function(e){
            e.preventDefault();
            var formData = $('#update-termsAndConditions-form').serialize();
            var productId = $('#update-termsAndConditions-form').find('input[name="id"]').val();
            var amenityId = $('#update-termsAndConditions-form').find('input[name="termsAndConditionsId"]').val();
            var URL = "/products/"+productId+"/termsAndCondition/"+amenityId;
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        /*Delete termsAndConditions*/
        $('.tnc-container .delete-edit-container').on('click','.delete',function(e){
            e.preventDefault();
            var URL = "/products"+$(this).attr('href');
            var $ths = $(this);
            if(confirm("Do you want to delete the record")){
                obj.sendAjax(URL,'DELETE','',obj.deleteSuccess($ths,'.tnc-container'));
            }
        });
        
        /*Add Phone Number*/
        $('#add-phoneNumber').on('click',function(){
            var formData = $('#add-phoneNumber-form').serialize();
            var productId = $('#add-phoneNumber-form').find('input[name="id"]').val();
            var URL = "/products/"+productId+"/phone";
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        
        /*Update phone /:productId/address/:addressId*/
        $('#update-phone').on('click',function(e){
            e.preventDefault();
            var formData = $('#update-phone-form').serialize();
            var productId = $('#update-phone-form').find('input[name="id"]').val();
            var phoneId = $('#update-phone-form').find('input[name="phoneId"]').val();
            var URL = "/products/"+productId+"/phoneNumber/"+phoneId;
            obj.sendAjax(URL,"POST",formData,obj.newaddressSuccess(productId));
        });
        /*Delete amenity*/
        $('.phone-container .delete-edit-container').on('click','.delete',function(e){
            e.preventDefault();
            var URL = "/products"+$(this).attr('href');
            var $ths = $(this);
            if(confirm("Do you want to delete the record")){
                obj.sendAjax(URL,'DELETE','',obj.deleteSuccess($ths,'.phone-container'));
            }
        });
        /* End */
        
		$('.category-list .list-item a').unbind('click',obj.showResults).bind('click',obj.showResults);
		//$('#search-result').unbind('click',obj.showResults).bind('click',obj.showResults);
		$('.action-container').on('click','.add-row',function(){
			$('.search-result-table,.search-form').fadeOut(500,function(){
				$('.add-form-container').show();
			});
			
		});
        
	},
    confirm:function(msg){
        var result="false";
        $('.confirm-alert-container .alertMesg').text(msg);
        $('.confirm-alert-container').show();
        $('.confirm-alert-container .confirm-delete').on('click',function(){
            $('.confirm-alert-container').hide();
            result = "true";
        });
        $('.confirm-alert-container .confirm-cancel').on('click',function(){
            result = "false";
        });
        return result;
    },
    redtSuccess:function(page){
        location.href=page;
    },
    deleteSuccess:function($ths,container){
        $ths.parents(container).fadeOut(500,function(){});
    },
    newaddressSuccess:function(id){
        location.href="/products/product/"+id;
    },
    sendAjax:function(URL,req,formData,sAction){
        $.ajax({
            url:URL,
            data:formData,
            method:req,
            success:sAction
        });
    },
	hideAll:function(){
		setTimeout(function(){$('.search-result-table').hide();},1500);
	},
	initDataTable : function(tableObject,listObj,categoryName){
		var table=tableObject.dataTable( {
             "processing": true,    
			"ajax": "/products/category/"+categoryName,
			"columns": listObj,
            "destroy": true,
            "pageLength": 2,
            bFilter: false, 
            bInfo: false,
            "bLengthChange": false,
            "fnCreatedRow": function( nRow, aData, iDataIndex ) {
                $(nRow).attr('id', aData['_id']);
                $(nRow).find('.delete-edit-container a').attr('href','/products/product/'+aData['_id']);
            }
		});
		
		/*tableObject.find('tbody').on( 'click', 'tr', function () {
			if ( $(this).hasClass('selected') ) {
				$(this).removeClass('selected');
				$('.delete-edit-container').addClass('disabled');
			}
			else {
				table.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				$('.delete-edit-container').removeClass('disabled');
			}
		} );
	 
		$('#button').click( function () {
			table.row('.selected').remove().draw( false );
		});*/
	},
	switchCategory:function(e){	
		e.preventDefault();
		$('.category-list').addClass('min-list');		
        //$('.search-form').fadeIn();
	},
	showResults:function(e){
		e.preventDefault();
        var categoryName = $(this).attr('title');
		var tObj = $('#result-table');
		var arr = [{ "data": "name" },
                   {"data":"description"},
                   {"data":"type"},
                   {"data":"emailAddress"},
                    {
                        data: null,
                        className: "center",
                        defaultContent: '<div class="delete-edit-container"><a href="#" class="edit" title="Edit the row">Edit</a> / <a href="#" class="delete" title="Delete the row">Delete</a></div>'
                    }
                  ];
		
		obj.initDataTable(tObj,arr,categoryName);        
        $('.search-result-table').fadeIn(1000,function(){
            $('.category-list').addClass('min-list');
        });
	}
}
