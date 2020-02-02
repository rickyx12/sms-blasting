
$(function(){
	
	var base_url = $('body').data('urlbase');


	$('#importBtn').click(function(e) {

		e.preventDefault();

		let form = $('#csvUpload')[0];
		let formData = new FormData(form);

		$.ajax({
			url:base_url+'Import/excel',
			type:'POST',
			enctype:'multipart/form-data',
	        processData: false,
	        contentType: false,
	        cache: false,
	        timeout: 600000,			
			data:formData,
			beforeSend: function() {
				$.LoadingOverlay('show');
			},
			success:function(data, textStatus, xhr) {

				$.LoadingOverlay("hide");

				if(xhr.status == 200) {

					let result = JSON.parse(data);

					$('#importStatus').html(result.message);
				}
			}
		});
	});

});