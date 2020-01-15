
var base_url = $('body').data('urlbase');

function sendSMS(dataArr,message,startIndex,endIndex,sent) {

	let str = dataArr[startIndex];
	let dataHandler = str.split('-');

	let data = {
		cpNumber: dataHandler[1],
		message:message
	}

	$.ajax({
		url: base_url+'Dashboard/toSend',
		type:'POST',
		data:data,		
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				if(data !== "") {
					if(data.trim() !== "ERROR") {
						
						sent += 1;
						$('#status'+dataHandler[0]).html("<i class='fa fa-check'></i>");
						$('#message').LoadingOverlay("text",sent+"/"+dataArr.length);

					    if (startIndex != endIndex) {

					    	sendSMS(dataArr,message,(startIndex + 1),endIndex,sent);
					    }else {

					        $('#sendBtn').attr('disabled',false);
					        $('#message').attr('disabled',false);		    	
					    }

					}else {
						$('#status'+dataHandler[0]).html("<i class='fa fa-times'></i>");
					}
				}else {
					$('#status'+dataHandler[0]).html("<i class='fa fa-times'></i>");
				}
			}else {
				$('#status'+dataHandler[0]).html("<i class='fa fa-times'></i>");
			}
		} 
	});	

}


$(function(){

    $('#message').keyup(function() {
        var text_length = $('#message').val().length;
        var text_remaining = 160 - text_length;

        $('#dashboardLeftChar').html(text_remaining);
    });
	
	$('#sendBtn').click(function() {

		$('#message').LoadingOverlay("show",{
			image: "",
			text: "Sending"
		});

		$('#sendBtn').attr('disabled',true);
		$('#message').attr('disabled',true);

		let numberArr = [];
		let message = $('#message').val();
		let count = $('.number:checked').length;

		$(".number:checked").each(function() {
			numberArr.push($(this).val());
		});		


		sendSMS(numberArr,message,0,(count -1),0);

		$('#message').LoadingOverlay("text","0/"+numberArr.length);

	});

	$(document).ajaxStop(function() {
		$('#message').LoadingOverlay("hide");
	});

});