
var base_url = $('body').data('urlbase');

function sendSMS(dataArr,message,startIndex,endIndex) {

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
		success:function(result) {

			if(result == 'sent') {
				$('#status'+dataHandler[0]).html("<i class='fa fa-check'></i>");
			}else {
				$('#status'+dataHandler[0]).html("<i class='fa fa-times'></i>");
			}


		    if (startIndex != endIndex) {

		    	sendSMS(dataArr,message,(startIndex + 1),endIndex);
		    }else {

		        $('#sendBtn').attr('disabled',false);
		        $('#message').attr('disabled',false);		    	
		    }


		} 
	});	

}


$(function(){
	
	$('#sendBtn').click(function() {

		$('#sendBtn').attr('disabled',true);
		$('#message').attr('disabled',true);

		let numberArr = [];
		let message = $('#message').val();
		let count = $('.number:checked').length;

		$(".number:checked").each(function() {
			numberArr.push($(this).val());
		});		


		sendSMS(numberArr,message,0,(count -1));

	});

});