var base_url = $('body').data('urlbase');
// var sms_address = 'http://192.168.1.92';


function saveMessage(sms_address, index, cpNumber, message, timeRec, dateRec, messageType) {

    let data = {
    	cpNumber: cpNumber,
    	message: message,
    	timeRec: timeRec,
    	dateRec: dateRec,
    	messageType: messageType,
    	isRead: 0
    };

    $.ajax({
    	url: base_url+'/Inbox/saveMessage',
    	type:'POST',
    	data:data,
    	beforeSend:function() {
    		$.LoadingOverlay('show');
    	},
    	success:function(data, textStatus, xhr) {

    		$.LoadingOverlay('hide');
    		let res = JSON.parse(data);

    		if(xhr.status == 200) {
    			deleteSMS(sms_address,index);
    		}else {

    			console.log('saving SMS Failed');
    		}
    	}
    });
}



function saveSent(cpNumber, message, thread) {

	let data = {
		cpNumber: "+63"+cpNumber,
		message: message,
		thread: thread
	};

	$.ajax({
		url: base_url+'/Inbox/save_sent',
		type:'POST',
		data:data,
		success:function(data, textStatus, xhr) {

			if(textStatus == 200) {
				console.log('ok');
			}

		}
	});
}

function markedRead(thread) {

	let data = {
		thread: thread
	};

	$.ajax({
		url: base_url+'Inbox/marked_read',
		type:'POST',
		data:data,
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				$('.unread'+thread).removeClass('unread-msg');			
			}
		}
	});

}

function checkName(index,thread,number,isRead) {

	let formatNumber = number.replace("+63","");

	let data = {
		number:formatNumber
	};

	$.ajax({
		url: base_url+'People/getPeopleByNumber',
		type:'POST',
		data:data,
		success:function(result) {
			
			let res = JSON.parse(result);	

			if(res) {

				if(isRead == 0) {
					$('#inboxSender'+index).html("<span id='senderName"+index+"' class='unread-msg unread"+thread+"'>"+res.name+"</span><br><span id='senderContact"+index+"' class='unread-msg unread"+thread+"' style='font-size:13px'>+63"+res.contact+"</span><br><span class='unread-msg unread"+thread+"' style='font-size:13px'>"+res.groups+"</span>");
				}else {
					$('#inboxSender'+index).html("<span id='senderName"+index+"'>"+res.name+"</span><br><span id='senderContact"+index+"' style='font-size:13px'>+63"+res.contact+"</span><br><span style='font-size:13px'>"+res.groups+"</span>");
				}
			
			}else {

				if(res) {
					$('#inboxSender').html(res.name+"<br><span style='font-size:13px'>+63"+res.contact+"</span>");
				}
			}
		}
	});
};

function checkResponder(sms_address) {

	$.ajax({
		url: base_url+'Responder/isOn',
		success:function(result) {

			let res = JSON.parse(result);
			
			if(res.message === 0) {
				
				setInterval(function() {
					unreadMsg(sms_address, "");
				},6000);

			}else {
				console.log("auto inbox off");
			}
		}
	});
};


function unreadMsg(sms_address, flag) {

	$.ajax({
		url: sms_address+'/unread_msg',
		beforeSend: function() {

			if(flag === "show") {
				$('#inboxStatus').html("");
			}
		},
		success:function(result) {

			let indexes = result.matchAll(/(CMGL: (\w*))/g);
			let indexesArr = Array.from(indexes);
			let revIndexesArr = indexesArr.reverse();

			for(let i = 0; i < indexesArr.length; i++) {
				// console.log(revIndexesArr[i][2]);
				getSpecificMessage(sms_address,revIndexesArr[i][2],"new");
			}
		}
	});	

}

function readMsg(sms_address) {

	$.ajax({
		url: sms_address+'/read_msg',
		beforeSend:function() {
			$('#inboxStatus').html("Retrieving messages.");
		},
		success:function(result) {

			let indexes = result.matchAll(/(CMGL: (\w*))/g);
			let indexesArr = Array.from(indexes);
			let revIndexesArr = indexesArr.reverse();

			for(let i = 0; i < indexesArr.length; i++) {
				// console.log(revIndexesArr[i][2]);
				getSpecificMessage(sms_address,revIndexesArr[i][2],"old");
			}

		},
		complete:function(result) {
			unreadMsg(sms_address,"show");
		}		
	});	
}

function getSpecificMessage(sms_address ,index, status) {

	let inbox = [];
	let html = "";

	$('#inboxStatus').html("Incoming messages.");

	$.ajax({
		url: sms_address+'/specific_msg?index='+index,
		complete:function() {
			$("#inboxStatus").html("<span></span>");
		},
		success:function(result) {
			let line = result.matchAll(/(CMGR=(\d*))/g);
			let lineArr = Array.from(line);
			let inputData = lineArr[0]["input"]; //extraction of data
			let splitByNewLine = inputData.split("\n");

			let messageHeader = splitByNewLine[1];
			let sanitizeMessageHeader = messageHeader.replace("+CMGR:","");
			let splitMessageHeader = sanitizeMessageHeader.split(",");

			let messageStatus = splitMessageHeader[0];
			let messageSender = splitMessageHeader[1];
			let sanitizeMessageSender = messageSender.replace(/['"]+/g, '');
			let messageDate = splitMessageHeader[3];
			let sanitizeMessageDate = messageDate.replace(/['"]+/g, '');
			let messageTime = splitMessageHeader[4].replace("+32","");
			let sanitizeMessageTime = messageTime.replace(/['"]+/g, '');
			let messageContent = splitByNewLine[2];

			//concat other line breaks if still not the end
			if(splitByNewLine[3] !== splitByNewLine.slice(-2)[0] && typeof splitByNewLine[3] !== 'undefined' ) {
				messageContent += "&nbsp;&nbsp;"+splitByNewLine[3];
			}

			if(splitByNewLine[4] !== splitByNewLine.slice(-2)[0] && typeof splitByNewLine[4] !== 'undefined'  ) {
				messageContent += "&nbsp&nbsp;"+splitByNewLine[4]
			}

			if(splitByNewLine[5] !== splitByNewLine.slice(-2)[0] && typeof splitByNewLine[5] !== 'undefined'  ) {
				messageContent += "&nbsp;&nbsp;"+splitByNewLine[5];
			}

			if(splitByNewLine[6] !== splitByNewLine.slice(-2)[0] && typeof splitByNewLine[6] !== 'undefined'  ) {
				messageContent += "&nbsp;&nbsp;"+splitByNewLine[6];
			}

			if(splitByNewLine[7] !== splitByNewLine.slice(-2)[0] && typeof splitByNewLine[7] !== 'undefined'  ) {
				messageContent += "&nbsp;&nbsp;"+splitByNewLine[7];
			}

			saveMessage(sms_address, index, sanitizeMessageSender, messageContent, sanitizeMessageTime, sanitizeMessageDate, 'inbound');
			getSystemInbox();
		}
	});
}


function thread_messages(thread) {

	let html = '';

	let data = {
		thread: thread
	};

	$('#replyCloseBtn').attr('disabled',true);
	$('#replyBtn').attr('disabled',true);

	$.ajax({
		url: base_url+'Inbox/thread_messages',
		type:'POST',
		data:data,
		success:function(data, textStatus, xhr) {

			$('#messageDiv').LoadingOverlay('hide');

			$('#replyCloseBtn').attr('disabled',false);		

			if(xhr.status == 200) {

				let res = JSON.parse(data);

				$.each(res,function(index, val) {
					html += "<div class='row mr-3 mt-3 mb-3'>";

						if(val.message_type == "inbound") {
							html += "<div class='col-md-6 speech-bubble-left'>";
								html += "<span class='bubble-text'>"+val.messages+"<span>";
								html += "<br>";
								html += "<span class='bubble-rec'>"+val.received+"</span>"
							html += "</div>"
							html += "<div class='col-md-6'>";
							html += "</div>";							
						}else {
							html += "<div class='col-md-6'>";
							html += "</div>"
							html += "<div class='col-md-6 speech-bubble-right'>";
								html += "<span class='bubble-text'>"+val.messages+"<span>";
								html += "<br>";
								html += "<span class='bubble-rec'>"+val.received+"</span>"
							html += "</div>"							
						}
					html += "</div>";
				});				

				$('#messageDiv').html(html);
				$('#messageDiv').scrollTop($('#messageDiv')[0].scrollHeight);
			}

		}
	});

}

function getSystemInbox() {

	let systemHTML = "";

	$.ajax({
		url: base_url+'/Inbox/showAll',
		success:function(data, textStatus, xhr) {

			let res = JSON.parse(data);
			
			$.each(res,function(index, val) {

				checkName(val.id, val.thread, val.cp_number, val.is_read);

				$(document).on('click','#viewBtn'+val.id,function() {

					let sender = $(this).data('cpnumber');
					let msgTime = $(this).data('time');
					let msgDate = $(this).data('date');
					let message = $(this).data('message');
					let thread = $(this).data('thread');

					$('#messageDiv').html("");
					$('#messageDiv').LoadingOverlay('show');

					thread_messages(thread);
					markedRead(thread);
					
					let textMax = 160;

					if($('#senderName'+val.id).length) {
						$('#readMsgModalHeader').html($('#senderName'+val.id).text()+"  <span style='font-size:15px;'>("+$('#senderContact'+val.id).text()+")</span>");
					}else {
						$('#readMsgModalHeader').html(sender);
					}


					$('#readMsgModalField').val(message);
					let sanitizeReplyToNumber = sender.replace("+63","");
					$('#replyToNumber').val(sanitizeReplyToNumber);
					$('#replyThread').val(thread);

				    $('#replyMsgModalField').keyup(function() {
				        var text_length = $('#replyMsgModalField').val().length;
				        var text_remaining = textMax - text_length;

						if(text_remaining == 160) {
							$('#replyBtn').attr('disabled',true);
						}else {
							$('#replyBtn').attr('disabled',false);
						}

				        $('#replyMsgLeftChar').html(text_remaining);
				    });

				});

				systemHTML += "<tr id='inbox"+val.id+"' class='systemInbox'>";
					systemHTML += "<td><input type='checkbox' name='index' data-storage='system' value='"+val.id+"'></td>";
					
					if(val.is_read == 0) {
						systemHTML += "<td class='inbox-msg'><a href='#' id='inboxSender"+val.id+"' class='inbox-btn unread-msg unread"+val.thread+"'>"+val.cp_number+"</a></td>";
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn unread-msg unread"+val.thread+"'>"+val.received+"</a></td>";
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn unread-msg unread"+val.thread+"'>"+val.messages+"</a></td>";
						systemHTML += "<td class='inbox-msg'><button id='viewBtn"+val.id+"' class='btn btn-info' data-cpnumber='"+val.cp_number+"' data-thread='"+val.thread+"' data-message='"+val.messages+"' data-toggle='modal' data-target='#viewModal'><i class='fa fa-newspaper'></i></button></td>";					
					}else {
						systemHTML += "<td class='inbox-msg'><a href='#' id='inboxSender"+val.id+"' class='inbox-btn'>"+val.cp_number+"</a></td>";	
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+val.received+"</a></td>";
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+val.messages+"</a></td>";
						systemHTML += "<td class='inbox-msg'><button id='viewBtn"+val.id+"' class='btn btn-info' data-cpnumber='"+val.cp_number+"' data-thread='"+val.thread+"' data-message='"+val.messages+"' data-toggle='modal' data-target='#viewModal'><i class='fa fa-newspaper'></i></button></td>";						
					}
				systemHTML += "</tr>";
			});	

			$('.inboxBody').html(systemHTML);
		}
	});

}

function deleteSMS(sms_address, index) {

    $.ajax({
    	url: sms_address+'/delete_msg?index='+index,
    	success:function(result) {

    		if(result.includes("OK")) {
    			$('#inbox'+index).remove("#inbox"+index);
    		}
    	},
    	complete:function() {
    		$.LoadingOverlay('hide');
    	}
    });

}

function deleteSystemSMS(index) {

	let data = {
		id: index
	};

    $.ajax({
    	url: base_url+'/Inbox/delete',
    	type:'POST',
    	data:data,
    	success:function(result) {

    		if(result.includes("OK")) {
    			$('#inbox'+index).remove("#inbox"+index);
    		}
    	},
    	complete:function() {
    		$.LoadingOverlay('hide');
    	}
    });

}

$(function() {


	$.ajax({
		url: base_url+'/Config/smsDevice',
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				let res = JSON.parse(data);

				$.each(res,function(index, val) {
					readMsg("http://"+val.ipaddress);
					checkResponder("http://"+val.ipaddress);
				});
			}		
		}
	});

	getSystemInbox();

	$('#deleteMsg').click(function() {

		$.LoadingOverlay('show');

		$("input:checkbox[name=index]:checked").each(function(){
		    
		    let selectedIndex = $(this).val();

			deleteSystemSMS(selectedIndex);
			
		});		
	});


	$('#replyBtn').click(function() {

		$('#replyMsgModalField').LoadingOverlay("show");

		$('#replyCloseBtn').attr('disabled',true);
		$('#replyBtn').attr('disabled',true);

		let number = $('#replyToNumber').val();
		let reply = $("#replyMsgModalField").val();
		let thread = $('#replyThread').val();


		$.ajax({
			url: base_url+'Config/smsDevice',
			success: function(data1, textStatus, xhr) {
				
				if(xhr.status == 200) {

					let res = JSON.parse(data1);
					let defaultSMS = res[0].ipaddress;

					let data = {
						cpNumber: number,
						message: reply,
						sms:'http://'+defaultSMS
					};

					$.ajax({
						url: base_url+"Outbox/toSend",
						type:'POST',
						data:data,
						success:function(data, textStatus, xhr) {

							if(xhr.status == 200) {
								saveSent(number, reply, thread);
								$('#replyMsgModalField').LoadingOverlay("hide");
								$('#replyMsgModalField').val("");
								// $('#viewModal').modal('toggle');
								$('#replyCloseBtn').attr('disabled',false);
								$('#replyBtn').attr('disabled',false);
								$('#messageDiv').LoadingOverlay("show");
								thread_messages(thread);
							}
						}
					});
				}
			}
		});
	});


});