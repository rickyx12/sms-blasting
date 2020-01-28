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
    		// $('#inboxTbl').LoadingOverlay('show');
    	},
    	success:function(data, textStatus, xhr) {

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
				getSpecificMessage(sms_address,revIndexesArr[i][2]);
			}
		}
	});	

}

function getSpecificMessage(sms_address ,index) {

	let inbox = [];
	let html = "";

	$('#inboxStatus').html("Incoming messages.");

	$.ajax({
		url: sms_address+'/specific_msg?index='+index,
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
			$("#inboxStatus").html("<span></span>");
		}
	});
}

function thread_messages_new(thread) {

	let html = '';

	let data = {
		thread: thread
	};

	$.ajax({
		url: base_url+'/Inbox/thread_unread_messages',
		type:'POST',
		data:data,
		beforeSend:function() {

		},
		success:function(data1, textStatus, xhr) {

			$('#replyCloseBtn').attr('disabled',false);				

			if(xhr.status == 200) {

				let res = JSON.parse(data1);

				$.each(res,function(index, val) {
					
					html += "<div class='row mr-0 mt-3 mb-3'>";
						html += "<div class='col-md-6 speech-bubble-left'>";
							html += "<span class='bubble-text'>"+val.messages+"<span>";
							html += "<br>";
							html += "<span class='bubble-rec'>"+val.received+"</span>"
						html += "</div>"
						html += "<div class='col-md-5'>";
							html += "<br><span style='font-size:13px; color:#FF0000'>New</span>";
						html += "</div>";							
					html += "</div>";

				});

				$('#messageDiv').append(html);
				$('#messageDiv').scrollTop($('#messageDiv')[0].scrollHeight);
				$('#messageDiv').LoadingOverlay('hide');

				$('#myModal').on('hidden.bs.modal', function (e) {
					markedRead(thread);
				})

			}
		}
	});
}

function thread_messages_more(thread, from, to) {

	let html = '';

	let data = {
		thread: thread,
		from: from,
		to: to
	};

	$.ajax({
		url: base_url+'/Inbox/thread_messages',
		type:'POST',
		data:data,
		beforeSend:function() {
			$('#messageDiv').LoadingOverlay('show');
		},
		success:function(data1, textStatus, xhr) {

			$('#replyCloseBtn').attr('disabled',false);				

			if(xhr.status == 200) {

				if(data1.length == 2) {
					$('#loadMoreDiv').remove();
				}

				let res = JSON.parse(data1);

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

				$('#loadMoreDiv').after(html);
				$('#messageDiv').LoadingOverlay('hide');
			}
		}
	});
}

function thread_messages(thread) {

	let html = '';
	let loadMore_from = 1;
	let loadMore_to = 10;

	let data = {
		thread: thread,
		from: 0,
		to: 10
	};


	$('#replyCloseBtn').attr('disabled',true);
	$('#replyBtn').attr('disabled',true);

	$.ajax({
		url: base_url+'Inbox/thread_messages',
		type:'POST',
		data:data,
		beforeSend:function() {
			$('#messageDiv').html("");
			$('#messageDiv').LoadingOverlay('show');			
		},
		success:function(data, textStatus, xhr) {

			$('#replyCloseBtn').attr('disabled',false);		

			$(document).on('click','#threadLoadMore'+thread,function() {

				loadMore_from += 10;
				loadMore_to += 10;
				thread_messages_more(thread, loadMore_from, loadMore_to);	
			});

			if(xhr.status == 200) {

				let res = JSON.parse(data);

				if(res.length >= 10) {
					html += "<div id='loadMoreDiv' class='row mr-3 mt-3 mb-3'>";
						html += "<div class='col-md-12 text-center'>";
							html += "<button id='threadLoadMore"+thread+"' class='btn btn-sm btn-success'>Load More</button>";
						html += "</div>";
					html += "</div>";
				}

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
				$('#messageDiv').LoadingOverlay('hide');
			}

		}
	});

}

function getSystemInbox() {

	let systemHTML = "";

	$.ajax({
		url: base_url+'/Inbox/showAll',
		beforeSend:function() {
			// $('#inboxTbl').LoadingOverlay('show');
		},
		success:function(data, textStatus, xhr) {

			let res = JSON.parse(data);
			
			$.each(res,function(index, val) {

				$(document).on('click','#viewBtn'+val.id,function() {

					let sender = $(this).data('cpnumber');
					let message = $(this).data('message');
					let thread = $(this).data('thread');

					thread_messages(thread);
					markedRead(thread);
					
					let textMax = 160;

					if(val.name != "") {
						$('#readMsgModalHeader').html(val.show+"  <span style='font-size:15px;'>("+val.cp_number+")  ["+val.group+"]</span>");
					}else {
						$('#readMsgModalHeader').html(val.show);
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

				    $('#replyCloseBtn').click(function() {
				    	$("#replyToNumber").val("");
				    	$("#replyThread").val("");
				    });

				});

				systemHTML += "<tr id='inbox"+val.thread+"' class='systemInbox'>";
					systemHTML += "<td><input type='checkbox' name='thread' data-storage='system' value='"+val.thread+"'></td>";
					
					if(val.is_read == 0) {

						systemHTML += "<td class='inbox-msg'><a href='#' id='inboxSender"+val.id+"' class='inbox-btn unread-msg unread"+val.thread+"'>"+val.show+"</a></td>";
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn unread-msg unread"+val.thread+"'>"+val.received+"</a></td>";
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn unread-msg unread"+val.thread+"'>"+val.messages+"</a></td>";
						systemHTML += "<td class='inbox-msg'><button id='viewBtn"+val.id+"' class='btn btn-info' data-cpnumber='"+val.cp_number+"' data-thread='"+val.thread+"' data-message='"+val.messages+"' data-toggle='modal' data-target='#viewModal'><i class='fa fa-newspaper'></i></button></td>";					
					}else {
						
						systemHTML += "<td class='inbox-msg'><a href='#' id='inboxSender"+val.id+"' class='inbox-btn'>"+val.show+"</a></td>";	
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+val.received+"</a></td>";
						systemHTML += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+val.messages+"</a></td>";
						systemHTML += "<td class='inbox-msg'><button id='viewBtn"+val.id+"' class='btn btn-info' data-cpnumber='"+val.cp_number+"' data-thread='"+val.thread+"' data-message='"+val.messages+"' data-toggle='modal' data-target='#viewModal'><i class='fa fa-newspaper'></i></button></td>";						
					}

				systemHTML += "</tr>";

				if($('#replyThread').val() == val.thread) {
					markedRead(val.thread);
					thread_messages_new(val.thread);
				}
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
    		
    	}
    });

}

function deleteSystemSMS(thread) {

	let data = {
		thread: thread
	};

    $.ajax({
    	url: base_url+'/Inbox/delete',
    	type:'POST',
    	data:data,
    	success:function(result) {

    		if(result.includes("OK")) {
    			$('#inbox'+thread).remove("#inbox"+thread);
    		}
    	},
    	complete:function() {
   
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
					unreadMsg("http://"+val.ipaddress);
					checkResponder("http://"+val.ipaddress);
				});
			}		
		}
	});

	getSystemInbox();

	$('#deleteMsg').click(function() {

		$('#inboxTbl').LoadingOverlay('show');

		$("input:checkbox[name=thread]:checked").each(function(){
		    
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

	$('#refreshMsg').click(function(){
		$('#inboxTbl').LoadingOverlay('show');
		unreadMsg("http://"+val.ipaddress);
		setTimeout(function(){
			$('#inboxTbl').LoadingOverlay('hide');
		},5000);
	});

	$(document).ajaxStop(function() {
		$('#inboxTbl').LoadingOverlay('hide');
	});
});