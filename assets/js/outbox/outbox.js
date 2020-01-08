var base_url = $('body').data('urlbase');

function toSend(id,cpNumber, message) {

	let data = {
		cpNumber: cpNumber,
		message: message
	};

	$.ajax({
		url:base_url+'Outbox/toSend',
		type:'POST',
		data:data,
		success:function(result) {

			if(result != '') {
				$('#outboxStatus'+id).html("<i class='fa fa-check'></i>");
			}else {
				$('#outboxStatus'+id).html("<i class='fa fa-times'></i>");
			}
		},
		complete:function() {
			$('#sendFromOutboxBtn').attr('disabled',false);
			$('#removeOutboxBtn').attr('disabled',false);
		}
	});

}

function deleteOutbox(id) {

	let data = {
		id:id
	};

	$.ajax({
		url: base_url+'Outbox/delete',
		type:'POST',
		data:data,
		success:function(result) {

			$('#outbox'+id).remove();
		},
		complete:function() {
			$.LoadingOverlay('hide');
		}
	});
}

$(function() {

	let html = "";

	$.ajax({
		url:base_url+'Outbox/getAll',
		success:function(result) {

			let res = JSON.parse(result);

			$.each(res,function(index, val) {

				html += "<tr id='outbox"+val.id+"'>";
					html += "<td><input type='checkbox' name='outboxId' value='"+val.id+"' data-cpnumber='"+val.cpNumber+"' data-message='"+val.message+"' checked></td>";
					html += "<td class='outbox-msg'>+63"+val.cpNumber+"</td>";
					html += "<td class='outbox-msg'>"+val.name+"</td>";
					html += "<td class='outbox-msg'>"+val.message+"</td>";
					html += "<td><span id='outboxStatus"+val.id+"'></span></td>";
				html += "</tr>";

			});

			$('#outboxBody').html(html);
		}
	});


	$('#removeOutboxBtn').click(function() {

		$.LoadingOverlay('show');

		$("input:checkbox[name=outboxId]:checked").each(function(){
			
			let selectedIndex = $(this).val();

			deleteOutbox(selectedIndex);
		});

	});

	$('#sendFromOutboxBtn').click(function() {

		$('#sendFromOutboxBtn').attr('disabled',true);
		$('#removeOutboxBtn').attr('disabled',true);

		$("input:checkbox[name=outboxId]:checked").each(function(index, val) {
			
			let id = $(this).val();
			let cpNumber = $(this).data('cpnumber');
			let message = $(this).data('message');

			toSend(id,cpNumber,message);
		});
	});


});