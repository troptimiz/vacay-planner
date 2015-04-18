/* Data table initialization */
var obj = {};
$(document).ready(function(){
	obj.init();	
});
obj = {
	init : function(){
        $('.delete').on('click',function(e){
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
                Handlebars.registerHelper('ifCond', function(v1, v2, options) {
                  if(v1 === v2) {
                    return options.fn(this);
                  }
                  return options.inverse(this);
                });
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
                method:"POST",
                success:function(){
                    location.href="/categories/list";
                    console.log("Added");
                }
            });
        });
        $('#edit-category').on('click',function(){
            var formData = $('#edit-category-form').serialize();
            console.log(formData);
            $.ajax({
                url:"/categories/category/",
                data:formData,
                method:"PUT",
                success:function(){
                    location.href="/categories/list";
                    console.log("Updated");
                }
            });
        });
		
		$('.category-list .list-item a').unbind('click',obj.switchCategory).bind('click',obj.showResults);
		$('#search-result').unbind('click',obj.showResults).bind('click',obj.showResults);
		$('.action-container').on('click','.add-row',function(){
			$('.search-result-table,.search-form').fadeOut(500,function(){
				$('.add-form-container').show();
			});
			
		});
	},
	hideAll:function(){
		setTimeout(function(){$('.search-result-table').hide();},1500);
	},
	initDataTable : function(tableObject,listObj){
		var table=tableObject.dataTable( {
             "processing": true,    
			"ajax": "/products",
			"columns": listObj
		});
		
		tableObject.find('tbody').on( 'click', 'tr', function () {
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
		});
	},
	switchCategory:function(e){	
		e.preventDefault();
		$('.category-list').addClass('min-list');		
        //$('.search-form').fadeIn();
	},
	showResults:function(e){
		e.stopPropagation();
		e.preventDefault();		
		var tObj = $('#result-table');
		var arr = [{ "data": "name" },{"data":"description"},{"data":"type"},{"data":"emailAddress"}];
		
		obj.initDataTable(tObj,arr);
        $('.search-result-table').fadeIn(1000,function(){
            $('.category-list').addClass('min-list');
        });
	}
}
