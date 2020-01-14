var base_url = $('body').data('urlbase');
var sms_address = 'http://192.168.1.92';

function checkName(index,number) {

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

			if(res.groups !== "") {
			$('#inboxSender'+index).html("<span id='senderName"+index+"'>"+res.name+"</span><br><span id='senderContact"+index+"' style='font-size:13px'>+63"+res.contact+"</span><br><span style='font-size:13px'>"+res.groups+"</span>");
			}else {
				$('#inboxSender').html(res.name+"<br><span style='font-size:13px'>+63"+res.contact+"</span>");
			}
		}
	});
};

function checkResponder() {

	$.ajax({
		url: base_url+'Responder/isOn',
		success:function(result) {

			let res = JSON.parse(result);
			
			if(res.message === 0) {
				
				setInterval(function() {
					unreadMsg("");
				},6000);

			}else {
				console.log("auto inbox off");
			}
		}
	});
};


function unreadMsg(flag) {

	$.ajax({
		url: sms_address+'/unread_msg',
		beforeSend: function() {

			if(flag === "show") {
				$('#inboxStatus').html("Checking for new messages.");
			}
		},
		success:function(result) {

			let indexes = result.matchAll(/(CMGL: (\w*))/g);
			let indexesArr = Array.from(indexes);
			let revIndexesArr = indexesArr.reverse();

			for(let i = 0; i < indexesArr.length; i++) {
				// console.log(revIndexesArr[i][2]);
				getSpecificMessage(revIndexesArr[i][2],"new");
			}
		}
	});	

}

function readMsg() {

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
				getSpecificMessage(revIndexesArr[i][2],"old");
			}

		},
		complete:function(result) {
			unreadMsg("show");
		}		
	});	

}

function getSpecificMessage(index, status) {

	let inbox = [];
	let html = "";

	$('#inboxStatus').html("Reading inbox.");

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


			$(document).on('click','#viewBtn'+index,function(){

				let sender = $(this).data('cpnumber');
				let msgTime = $(this).data('time');
				let msgDate = $(this).data('date');
				let message = $(this).data('message');

				let textMax = 160;

				if($('#senderName'+index).length) {
					$('#readMsgModalHeader').html($('#senderName'+index).text()+"  <span style='font-size:15px;'>("+$('#senderContact'+index).text()+")</span>");
					console.log("wowow: "+$('#senderName'+index).text());
				}else {
					$('#readMsgModalHeader').html(sender);
				}


				$('#readMsgModalField').val(message);
				let sanitizeReplyToNumber = sender.replace("+63","");
				$('#replyToNumber').val(sanitizeReplyToNumber);

			    $('#replyMsgModalField').keyup(function() {
			        var text_length = $('#replyMsgModalField').val().length;
			        var text_remaining = textMax - text_length;

			        $('#replyMsgLeftChar').html(text_remaining);
			    });

			});


			checkName(index,sanitizeMessageSender);

			if(status === "new") {

				html += "<tr id='inbox"+index+"'>";
					html += "<td><input type='checkbox' name='index' value='"+index+"'></td>";
					html += "<td class='inbox-msg'><b><a href='#' id='inboxSender"+index+"' class='inbox-btn'>"+sanitizeMessageSender+"</a></b></td>";
					html += "<td class='inbox-msg'><b><a href='#' class='inbox-btn'>"+sanitizeMessageTime+" - "+sanitizeMessageDate+"</a></b></td>";
					html += "<td class='inbox-msg'><b><a href='#' class='inbox-btn'>"+messageContent+"</a></b></td>";
					html += "<td class='inbox-msg'><button id='viewBtn"+index+"' class='btn btn-info' data-cpnumber='"+sanitizeMessageSender+"' data-time='"+sanitizeMessageTime+"' data-date='"+sanitizeMessageDate+"' data-message='"+messageContent+"' data-toggle='modal' data-target='#viewModal'><i class='fa fa-newspaper'></i></button></td>";
				html += "</tr>";

			}else {

				html += "<tr id='inbox"+index+"'>";
					html += "<td><input type='checkbox' name='index' value='"+index+"'></td>";
					html += "<td class='inbox-msg'><a href='#' id='inboxSender"+index+"' class='inbox-btn'>"+sanitizeMessageSender+"</a></td>";
					html += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+sanitizeMessageTime+" - "+sanitizeMessageDate+"</a></td>";
					html += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+messageContent+"</a></td>";
					html += "<td class='inbox-msg'><button id='viewBtn"+index+"' class='btn btn-info' data-cpnumber='"+sanitizeMessageSender+"' data-time='"+sanitizeMessageTime+"' data-date='"+sanitizeMessageDate+"' data-message='"+messageContent+"' data-toggle='modal' data-target='#viewModal'><i class='fa fa-newspaper'></i></button></td>";
				html += "</tr>";				

			}


			$('.inboxBody').prepend(html);
		}
	});
}

$(function() {


	readMsg();
	checkResponder();

	$('#deleteMsg').click(function() {

		$.LoadingOverlay('show');

		$("input:checkbox[name=index]:checked").each(function(){
		    let selectedIndex = $(this).val();

		    $.ajax({
		    	url: sms_address+'/delete_msg?index='+selectedIndex,
		    	success:function(result) {

		    		if(result.includes("OK")) {
		    			$('#inbox'+selectedIndex).remove("#inbox"+selectedIndex);
		    		}
		    	},
		    	complete:function() {
		    		$.LoadingOverlay('hide');
		    	}
		    });

		});		
	});

	$('#replyBtn').click(function() {

		$('#replyMsgModalField').LoadingOverlay("show");

		$('#replyCloseBtn').attr('disabled',true);
		$('#replyBtn').attr('disabled',true);

		let number = $('#replyToNumber').val();
		let reply = $("#replyMsgModalField").val();

		let data = {
			cpNumber: number,
			message: reply
		};

		$.ajax({
			url: base_url+"Outbox/toSend",
			type:'POST',
			data:data,
			success:function(data, textStatus, xhr) {

				if(xhr.status == 200) {
					$('#replyMsgModalField').LoadingOverlay("hide");
					$('#viewModal').modal('toggle');
					$('#replyCloseBtn').attr('disabled',false);
					$('#replyBtn').attr('disabled',false);					
				}
			}
		});

	});

});