var base_url = $('body').data('urlbase');

function getKeyword() {

	let html = '';

	$.ajax({
		url: base_url+'Responder/getAll',
		success:function(result) {

			let res = JSON.parse(result);

			$.each(res,function(index, val) {

				html += "<tr>";
					html += "<td><input type='checkbox' name='responderId' value='"+val.id+"'></td>";
					html += "<td>"+val.keywords+"</td>";
					html += "<td>"+val.reply+"</td>";
				html += "</tr>";	
			});
			
			$('#responderBody').html(html);
		},
		complete: function() {
			$.LoadingOverlay('hide');
		}
	});

}

function deleteResponder(responderId) {

	let data = {
		responderId: responderId
	};

	$.ajax({
		url: base_url+'Responder/delete',
		type:'POST',
		data:data,
		complete:function(result) {
			getKeyword();
		}
	});

}

$(function() {

	$.LoadingOverlay('show');

	getKeyword();

	$('#addKeywordBtn').click(function() {

		let keyword = $('#keyword').val();
		let message = $('#message').val();

		let data = {
			keyword: keyword,
			message: message
		};

		$.ajax({
			url: base_url+'Responder/add',
			type:'POST',
			data:data,
			beforeSend:function() { 
				$.LoadingOverlay('show');
			},
			success:function(result) {
				$('#keyword').val("");
				$('#message').val("");
				getKeyword();
			}
		});
	});


	$('#deleteResponderBtn').click(function() {

		$.LoadingOverlay('show');

		$("input:checkbox[name=responderId]:checked").each(function(){
		    let selectedIndex = $(this).val();

		    deleteResponder(selectedIndex);
		});

	});

});