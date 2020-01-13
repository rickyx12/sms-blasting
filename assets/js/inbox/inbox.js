var base_url = $('body').data('urlbase');
var sms_address = 'http://192.168.1.92';

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


			if(status === "new") {
				html += "<tr id='inbox"+index+"'>";
					html += "<td><input type='checkbox' name='index' value='"+index+"'></td>";
					html += "<td class='inbox-msg'><b><a href='#' class='inbox-btn'>"+sanitizeMessageSender+"</a></b></td>";
					html += "<td class='inbox-msg'><b><a href='#' class='inbox-btn'>"+sanitizeMessageTime+" - "+sanitizeMessageDate+"</a></b></td>";
					html += "<td class='inbox-msg'><b><a href='#' class='inbox-btn'>"+messageContent+"</a></b></td>";
				html += "</tr>";
			}else {
				html += "<tr id='inbox"+index+"'>";
					html += "<td><input type='checkbox' name='index' value='"+index+"'></td>";
					html += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+sanitizeMessageSender+"</a></td>";
					html += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+sanitizeMessageTime+" - "+sanitizeMessageDate+"</a></td>";
					html += "<td class='inbox-msg'><a href='#' class='inbox-btn'>"+messageContent+"</a></td>";
				html += "</tr>";				
			}


			$('.inboxBody').prepend(html);
		}
	});
}

$(function() {


	readMsg();
	checkResponder();

	$('#deleteMsg').click(function(){

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

});