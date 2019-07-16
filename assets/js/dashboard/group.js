$(function(){

	var base_url = $('body').data('urlbase');
	
	$('#sendBtn').click(function() {

		$('#sendBtn').attr('disabled',true);
		$('#message').attr('disabled',true);

		let numberArr = [];
		let message = $('#message').val();
		let count = $('.number').length;

		$(".number:checked").each(function() {
			numberArr.push($(this).val());
		});		

		$.each(numberArr,function(index,val){
			
			let str = val;
			let dataHandler = str.split('-');

			let data = {
				cpNumber: dataHandler[1],
				message:message
			}

			$.ajax({
				url: 'http://192.168.1.92/action_page?cpNumber='+val+'&message='+message,
				type:'GET',		
				success:function(result) {

					if(result == 'sent') {
						$('#status'+dataHandler[0]).html("<i class='fa fa-check'></i>");
					}else {
						$('#status'+dataHandler[0]).html("<i class='fa fa-times'></i>");
					}

				    if (index+1 === count) {
				        $('#sendBtn').attr('disabled',false);
				        $('#message').attr('disabled',false);
				    }

				} 
			});

		});
	});

});