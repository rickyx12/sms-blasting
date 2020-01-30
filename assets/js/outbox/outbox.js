var base_url = $('body').data('urlbase');
var toSendArr = [];
var outboxTotal = 0;

function saveSent(id, cpNumber, message, messageType, isRead) {

	let data = {
		cpNumber: cpNumber,
		message: message,
		messageType: messageType,
		isRead: isRead
	};

	$.ajax({
		url: base_url+'Outbox/saveSent',
		type:'POST',
		data: data,
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				if($('#cbOutbox'+id).is(":checked")) {
					console.log("uncheck pls");
					$('#cbOutbox'+id).attr('checked',false);
				}

				$('#outboxStatus'+id).html("<i class='fa fa-check'></i>");
			}
		}
	});
}

function toSend(sms, id, cpNumber, message, index, adder, sent) {

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

						saveSent(id, cpNumber, message, "outbound", 1);
						$('#totalSent').html(sent);
					}
				}else {
					$('#outboxStatus'+id).html("<i class='fa fa-paper-plane'></i>");
					$('#totalSent').html(sent-1);
					toSend(sms, id, toSendArr[index+adder][1], toSendArr[index+adder][2], index+adder, adder, sent);
				}

				if(typeof toSendArr[index+adder] !== 'undefined') {

					toSend(sms, toSendArr[index+adder][0], toSendArr[index+adder][1], toSendArr[index+adder][2], index+adder, adder, sent+1);
				}else {
					$('#sendFromOutboxBtn').attr('disabled',false);
					$('#removeOutboxBtn').attr('disabled',false);					
				}


			}else {
				$('#outboxStatus'+id).html("<i class='fa fa-times'></i>");

				if(typeof toSendArr[index] !== 'undefined') {
					setTimeout(function(){
						toSend(sms, toSendArr[index+adder][0], toSendArr[index+adder][1], toSendArr[index+adder][2], index+adder, adder, sent+1);
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

		let smsArr = [];

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
						// toSend(val.ipaddress,toSendArr[0][0],toSendArr[0][1],toSendArr[0][2],0,toSendArr.length,0);

						//val.id - 1 to match the corresponding index
						smsArr.push([(val.id - 1),val.ipaddress]);
					});

					let indexAdder = smsArr.length

					// console.table(smsArr);
					for(let i=0; i < indexAdder; i++) {
						//toSend(sms, id, cpNumber, message, index, adder, sent)
						toSend(smsArr[i][1], toSendArr[i][0], toSendArr[i][1], toSendArr[0][2], smsArr[i][0], indexAdder, 0);
					}
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