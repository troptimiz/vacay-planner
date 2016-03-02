$(document).ready(function(){
    /*$('#bookings').DataTable({
        "destroy": true,
        "pageLength": 10,
        bFilter: false,
        bInfo: false,
        "ordering":false,
        "bLengthChange": false
    });*/

    var tableObject = $('#bookings');
    var listObj = [{ "data": "firstName" },
        {"data":"lastName"},
        {"data":"email"},
        {"data":"contactNumnber"},
        {"data":"bookingDate"},
        {"data":"totalAmount"}
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
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
    $('#bookings_filter').hide();

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
		tableObject.dataTable().fnFilter( $(this).val() );
	});
	
	$( "#to" ).on('change', function () {
		tableObject.dataTable().fnFilter( $(this).val() );
	});
	
	$( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function(selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
});