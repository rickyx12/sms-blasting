var base_url = $('body').data('urlbase');
var toSendArr = [];
var outboxTotal = 0;

function toSend(sms, id, cpNumber, message,index,end,sent) {

	let data = {
		cpNumber: cpNumber,
		message: message,
		sms:"http://"+sms
	};

	$.ajax({
		url:base_url+'Outbox/toSend',
		type:'POST',
		data:data,
		beforeSend:function() {
			$('#outboxStatus'+id).html("<i class='fa fa-paper-plane'></i>");
		},
		success:function(data, textStatus, xhr) {


			if(xhr.status == 200) {

				if(data.trim() !== "") {

					if(data.includes("ERROR")) {

						$('#outboxStatus'+id).html("<i class='fa fa-times'></i>");
						$('#totalSent').html(sent-1);
					}else {

						$('#outboxStatus'+id).html("<i class='fa fa-check'></i>");
						$('#cbOutbox'+id).attr('checked',false);
						$('#totalSent').html(sent);
					}
				}else {
					$('#outboxStatus'+id).html("<i class='fa fa-paper-plane'></i>");
					$('#totalSent').html(sent-1);
					toSend(sms,toSendArr[index][0],toSendArr[index][1],toSendArr[index][2],index,toSendArr.length,sent);
				}

				if(index !== end) {
					toSend(sms,toSendArr[index][0],toSendArr[index][1],toSendArr[index][2],index+1,toSendArr.length,sent+1);
				}else {
					$('#sendFromOutboxBtn').attr('disabled',false);
					$('#removeOutboxBtn').attr('disabled',false);					
				}


			}else {
				$('#outboxStatus'+id).html("<i class='fa fa-times'></i>");

				if(index !== end) {
					setTimeout(function(){
						toSend(sms,toSendArr[index][0],toSendArr[index][1],toSendArr[index][2],index+1,toSendArr.length,sent+1);
					},3000);
				}
			}
		},
		complete:function() {

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
		success:function(data, textStatus, xhr) {
			outboxTotal -= 1;
			$('#outbox'+id).remove();
			$('#outboxTotal1').html(outboxTotal);
			$.LoadingOverlay("text", outboxTotal+" remaining.");
		}
	});
}

$(function() {

	let html = "";

	$('#sendingStatus').hide();

	$.ajax({
		url:base_url+'Outbox/getAll',
		success:function(result) {

			let res = JSON.parse(result);

			$.each(res,function(index, val) {

				html += "<tr id='outbox"+val.id+"'>";
					html += "<td><input type='checkbox' id='cbOutbox"+val.id+"' class='form-control outboxCB' name='outboxId' value='"+val.id+"' data-cpnumber='"+val.cpNumber+"' data-message='"+val.message+"' checked></td>";
					html += "<td class='outbox-msg'>+63"+val.cpNumber+"</td>";
					html += "<td class='outbox-msg'>"+val.name+"</td>";
					html += "<td class='outbox-msg'>"+val.message+"</td>";
					html += "<td><span id='outboxStatus"+val.id+"'></span></td>";
				html += "</tr>";

				outboxTotal += 1;
			});

			$('#outboxBody').html(html);
			$('#outboxTotal1').html(outboxTotal);
		}
	});

	$(document).ajaxStop(function() {
		$.LoadingOverlay('hide');
	});

	$('#removeOutboxBtn').click(function() {

		 $.LoadingOverlay("show",{
		 	image       : "",
		 	text        : "Deleting outbox"
		 });
		$('#sendingStatus').hide();

		$("input:checkbox[name=outboxId]:checked").each(function(){
			
			let selectedIndex = $(this).val();
			deleteOutbox(selectedIndex);
		});


	});

	$('#sendFromOutboxBtn').click(function() {

		$('#sendFromOutboxBtn').attr('disabled',true);
		$('#removeOutboxBtn').attr('disabled',true);
		$('#outboxTotal').hide();
		$('#sendingStatus').show();

		$("input:checkbox[name=outboxId]:checked").each(function(index, val) {
			
			let id = $(this).val();
			let cpNumber = $(this).data('cpnumber');
			let message = $(this).data('message');

			toSendArr.push([id,cpNumber,message]);

		});

		$.ajax({
			url: base_url+'/Config/smsDevice',
			success:function(data, textStatus, xhr) {

				if(xhr.status == 200) {

					let res = JSON.parse(data);

					$.each(res,function(index, val) {
						toSend(val.ipaddress,toSendArr[0][0],toSendArr[0][1],toSendArr[0][2],0,toSendArr.length,0);
					});
				}		
			}
		});

		$('#totalUnsent').html(toSendArr.length);
	});



	$('#cbControl').click(function(){
		if($('#cbControl').prop("checked")) {
			$('.outboxCB').attr('checked',true);
		}else {
			$('.outboxCB').attr('checked',false);
		}
	});

});