$(document).ready(function(){
    /*$('#bookings').DataTable({
        "destroy": true,
        "pageLength": 10,
        bFilter: false,
        bInfo: false,
        "ordering":false,
        "bLengthChange": false
    });*/
	var page = location.href;
	var fileName = "sales_report";
	var dt = "bookingDate";
	var status = "Confirmed";
	if(page.split("/").indexOf('cancellations') > 0) {
		fileName = "cancellation_report";
		dt = "cancellationDate";
		status = "Cancelled";
	}
    var tableObject = $('#bookings');
    var listObj = [{ "data": "firstName",render:function(data, type, full, meta) {
			return full.firstName +" "+ full.lastName
		} },
        {"data":dt},
        {"data":"propertyName"},
		{"data":"city"},
        {"data":"numOfAdult"},
        {"data":"numOfChild"},
        {"data":"totalAmount"},
        {"data":"paymentAuthId"}
    ];

    var table=tableObject.dataTable({
        "destroy": true,
        "pageLength": 10,
        bFilter: true,
        bInfo: false,
        "ordering":false,
        "bLengthChange": false,
        dom: 'Bfrtip',
		buttons: [
			{
				extend: 'excelHtml5',
				title: fileName,
			},
			{
				extend: 'pdfHtml5',
				title: fileName
			}
		]
    
    });
    $('#bookings_filter').hide();
    $('#vendorSelect').on('change',function(){
        tableObject.dataTable().fnFilter( $(this).val() );
    });
    $('.state').on('change',function(){
        tableObject.dataTable().fnFilter( $(this).val() );
        var URL = "/categories/cities/"+$(this).val();
        var ths = $(this);
        $.ajax({
            url:URL,
            method:"GET",
            success:function(data){
                var options = "<option value=''>Select City</option>";

                data.cities.forEach(function(city){
                    options = options + "<option value="+city.cityName+">"+city.cityName+"</option>";
                });
                $('.city').html(options);
            },
            error:function(){
                alert("error");
            }
        });
    });
    $('.city').on('change',function(){
        tableObject.dataTable().fnFilter( $(this).val() );
    });
    $('.country').on('change',function(){
        var URL = "/categories/states/"+$(this).val();
        var ths = $(this);

        tableObject.dataTable().fnFilter( ths.val() );
        $.ajax({
            url:URL,
            method:"GET",
            success:function(data){
                var options = "<option value=''>Select State</option>";
                data.states.forEach(function(state){
                    options = options + "<option value="+state.stateCode+">"+state.stateName+"</option>";
                });
                $('.state').html(options);

            },
            error:function(){
                alert("error");
            }
        });
    });
	
	$( "#from" ).on('change', function () {		
		renderTable();
	});
	
	$( "#to" ).on('change', function () {
		renderTable();
	});
	
	$( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
	  dateFormat: 'dd/mm/yy',
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
	  dateFormat: 'dd/mm/yy',
      onClose: function(selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
	function renderTable() {
		var stDate = $( "#from" ).val();
		var enDate = $( "#to" ).val();
		var formData = '?startDate='+stDate;
		if (enDate) {
			formData = formData+'&endDate='+enDate;
		}
		
		var url = '/reports/getByDate/' + status + formData;
		tableObject.dataTable().fnClearTable();
		
		tableObject.dataTable({
			"processing": true,
			"ajax": url,
			"columns": listObj,
			"destroy": true,
			"pageLength": 10,
			bFilter: true,
			bInfo: false,
			"ordering":false,
			"bLengthChange": false,
			dom: 'Bfrtip',
			buttons: [
			{
				extend: 'excelHtml5',
				title: 'sales_report'
			},
			{
				extend: 'pdfHtml5',
				title: 'sales_report',
				init: function(dt, node, config) {
					$("#filename").on('change', function() {
						config.title = this.value;
					})
				}
			}]
		});
		$("#bookings_filter").hide();
	}
});