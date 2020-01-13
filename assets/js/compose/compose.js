
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

function sendToOutbox(cpNumber, name, message) {

	$('#outboxModal').modal('toggle');

	let data = {
		cpNumber:cpNumber,
		name:name,
		message:message
	};

	$.ajax({
		url: base_url+'Outbox/add',
		type:'POST',
		data:data,
		success:function(result) {
			addedToOutbox += 1;
			$.LoadingOverlay("text", addedToOutbox+"/"+totalMember+" added to Outbox.");
		},
		complete:function() {

		} 
	});	

	$(document).ajaxStop(function() {
		// $('#outboxModal').modal('toggle');
		$('#sendOutboxBtn').attr('disabled',false);
		$('#cancelOutboxBtn').attr('disabled',false);
		$('#message').val("");		
		$.LoadingOverlay("hide");
	});

}

function getGroupMember(groupId,message) {

	let fixFormat = replaceAll(message,"[[]]",);


	let data = {
		groupId:groupId
	};

	$.ajax({
		url: base_url+'Groups/getPeopleByGroup',
		type:'POST',
		data:data,
		success:function(result) {

			let res = JSON.parse(result);

			$.each(res,function(index, val) {

				let fixFormat = replaceAll(message,"[[x]]",val.name);

				totalMember += 1;
				
				setTimeout(function() {
					sendToOutbox(val.contact, val.name, fixFormat);
				},6000);	
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
	
	let remainChar = 160;

	getGroups();

	$('#message').keyup(function(e){

		if(remainChar != 0) {

			if(e.keyCode == 8)	{

				remainChar += 1;
				$('#remainChar').html(remainChar);			
			}else {

				remainChar -= 1;
				$('#remainChar').html(remainChar);
			}
		}

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

		$.LoadingOverlay("show",{
			image: "",
			text: "Sending to outbox."
		});

		$('#sendOutboxBtn').attr('disabled',true);
		$('#cancelOutboxBtn').attr('disabled',true);

		$("input:checkbox[name=groupId]:checked").each(function(){

		    let selectedIndex = $(this).val();

		    getGroupMember(selectedIndex, $('#message').val());

		});
	});

});