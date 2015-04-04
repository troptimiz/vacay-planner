/* Data table initialization */
var obj = {};
$(document).ready(function(){
	obj.init();	
});
obj = {
	init : function(){
		$('.category-list .list-item a').unbind('click',obj.switchCategory).bind('click',obj.switchCategory);
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
			"serverSide": true,
			"ajax": "./data/objects.json",
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
		$('.search-form').fadeIn();
	},
	showResults:function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.search-result-table').fadeIn();
		var tObj = $('#result-table');
		var arr = [{ "data": "name" },{ "data": "position" },{ "data": "office" },{ "data": "extn" },{ "data": "start_date" },{ "data": "salary" }];
		
		obj.initDataTable(tObj,arr);
	}
}
