
var base_url = $('body').data('urlbase');
var totalMember = 0;
var addedToOutbox = 0;
var toSendArr = [];


function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function sendToOutbox(cpNumber, name, message, totalSMS, smsOrder, multiSmsOrder) {

	let data = {
		cpNumber:cpNumber,
		name:name,
		message:message,
		smsOrder:smsOrder,
		multiSmsOrder:multiSmsOrder
	};

	$.ajax({
		url: base_url+'Outbox/add',
		type:'POST',
		data:data,
		success:function(result) {
			addedToOutbox += 1;
			$.LoadingOverlay("text", addedToOutbox+"/"+totalSMS+" added to Outbox.");
		},
		complete:function() {

		} 
	});	
}

function getGroupMember(groupId, message, multiSmsOrder, smsPerPerson) {

	let fixFormat = replaceAll(message,"[[]]",);


	let data = {
		groupId:groupId
	};

	$.ajax({
		url: base_url+'Groups/getPeopleByGroup',
		type:'POST',
		data:data,
		success:function(result) {

			$('#outboxModal').modal('toggle');
			let res = JSON.parse(result);

			$.each(res,function(index, val) {

				let fixFormat = replaceAll(message,"[[x]]",val.name);
				let totalSMS = res.length * smsPerPerson;
				sendToOutbox(val.contact, val.name, fixFormat, totalSMS, val.id, multiSmsOrder);
			});
		} 
	});


}

function getGroups() {

	let html = "";

	$.ajax({
		url: base_url+'Groups/groupsJSON1',
		success:function(result) {

			let res = JSON.parse(result);

			$.each(res,function(index, val) {

				html += "<tr>";
					html += "<td><input type='checkbox' name='groupId' value='"+val.id+"'></td>";
					html += "<td>"+val.name+"</td>";
					html += "<td>"+val.members+"</td>";
				html += "</tr>";

				$('#outboxGroup').html(html);
			});
		} 
	});


}

function sendSMS(number,message) {

	let data = {
		cpNumber: number,
		message:message
	}

	$.ajax({
		url: base_url+'Compose/toSend',
		type:'POST',
		data:data,		
		success:function(result) {

			$("#number").val("");
			$("#message").val("");

			$('#number').attr('disabled',false);
			$('#sendBtn').attr('disabled',false);
			$('#message').attr('disabled',false);
		} 
	});
}


$(function(){

	let smsCount = 0;

	getGroups();

	$('#sendBtn').attr('disabled', true);
	$('#outboxBtn').attr('disabled', true);

    $('#message').keyup(function() {

    	maxChar = 160;
    	smsCount = 1;

        var text_length = $('#message').val().length;
        var text_remaining = maxChar - text_length;

        if(text_length > 0) {
			$('#sendBtn').attr('disabled', false);
			$('#outboxBtn').attr('disabled', false);        	
        }else {
			$('#sendBtn').attr('disabled', true);
			$('#outboxBtn').attr('disabled', true);         	
        }


        if(text_length > 160 && text_length <= 320) {
        	text_remaining += 160;
        	smsCount = 2;
        }

        if(text_length >= 321 && text_length <= 480) {
	        text_remaining += 320;
        	smsCount = 3;
        }

        if(text_length > 480 && text_length <= 640) {
	        text_remaining += 480;
        	smsCount = 4;
        }

        if(text_length > 640 && text_length <= 800) { 
	       text_remaining += 640;
        	smsCount = 5;
        }

        $('#smsCount').html(smsCount);
        $('#remainChar').html(text_remaining);
    });

	$('#sendBtn').click(function() {

		$('#number').attr('disabled',true);
		$('#sendBtn').attr('disabled',true);
		$('#message').attr('disabled',true);

		let number = $('#number').val();
		let message = $('#message').val();

		sendSMS(number,message);

	});


	$('#sendOutboxBtn').click(function() {

		let smsOrder = 0;

		$.LoadingOverlay("show",{
			image: "",
			text: "Sending to outbox."
		});

		$('#sendOutboxBtn').attr('disabled',true);
		$('#cancelOutboxBtn').attr('disabled',true);

		$("input:checkbox[name=groupId]:checked").each(function() {

		    let selectedIndex = $(this).val();
		    let wholeSMS = $('#message').val();

		    if(smsCount == 2) {

		    	let firstSMS = wholeSMS.substring(0, 160);
		    	let secondSMS = wholeSMS.substring(161, wholeSMS.length);
		    	
		    	getGroupMember(selectedIndex, firstSMS, 1, 2);
		    	getGroupMember(selectedIndex, secondSMS, 2, 2);
		    }else if(smsCount == 3) {

		    	let firstSMS = wholeSMS.substring(0, 160);
		    	let secondSMS = wholeSMS.substring(161, 320);
		    	let thirdSMS = wholeSMS.substring(321, wholeSMS.length);

		    	getGroupMember(selectedIndex, firstSMS, 1, 3);
		    	getGroupMember(selectedIndex, secondSMS, 2, 3);
		    	getGroupMember(selectedIndex, thirdSMS, 3, 3);
		    }else if(smsCount == 4) {

		    	let firstSMS = wholeSMS.substring(0, 160);
		    	let secondSMS = wholeSMS.substring(161, 320);
		    	let thirdSMS = wholeSMS.substring(321, 480);
		    	let fourthSMS = wholeSMS.substring(481, wholeSMS.length);

		    	getGroupMember(selectedIndex, firstSMS, 1, 4);
		    	getGroupMember(selectedIndex, secondSMS, 2, 4);
		    	getGroupMember(selectedIndex, thirdSMS, 3, 4);
		    	getGroupMember(selectedIndex, fourthSMS, 4, 4);		    	
		    }else if(smsCount == 5) {

		    	let firstSMS = wholeSMS.substring(0, 160);
		    	let secondSMS = wholeSMS.substring(161, 320);
		    	let thirdSMS = wholeSMS.substring(321, 480);
		    	let fourthSMS = wholeSMS.substring(481, 640);
		    	let fifthSMS = wholeSMS.substring(641, wholeSMS.length);

		    	getGroupMember(selectedIndex, firstSMS, 1, 5);
		    	getGroupMember(selectedIndex, secondSMS, 2, 5);
		    	getGroupMember(selectedIndex, thirdSMS, 3, 5);
		    	getGroupMember(selectedIndex, fourthSMS, 4, 5);
		    	getGroupMember(selectedIndex, fifthSMS, 5, 5);
		    }else {

		    	getGroupMember(selectedIndex, wholeSMS,1,1);
			}

		});
	});

	$(document).ajaxStop(function() {
		// $('#outboxModal').modal('toggle');
		$('#sendOutboxBtn').attr('disabled',false);
		$('#cancelOutboxBtn').attr('disabled',false);
		$('#message').val("");		
		$.LoadingOverlay("hide");
	});

});