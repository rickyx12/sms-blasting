var base_url = $('body').data('urlbase');
var sms_address = 'http://192.168.1.92';

var signal = null;

function startup(sms_address) {

  $.ajax({
    url: sms_address+'/startup',
    success:function(data, textStatus, xhr) {
	
		if(xhr.status == 200) {
			$.LoadingOverlay("hide");
    	}
    }
  }); 

}

function getSignal(sms_address) {

	$.ajax({
		url: sms_address+'/signal',
		success:function(result) {
			
			let res = result.split("\n");
			let res1 = res[1];
			let res2 = res1.split(",");
			let signalStrength = res2[0].replace("+CSQ:","");

			$('#signal').html(signalStrength);
		},
		error:function() {

	      $.LoadingOverlay('show',{
	          image: "",
	          text: "Reconnecting to SMS."
	      });  

			startup();
		}
	});	

}


function getNumber(sms_address) {

	$.ajax({
		url: sms_address+'/phone_number',
		success:function(result) {
			
			let res = result.split("\n");
			let res1 = res[1]
			let res2 = res1.split(",");
			let number = res2[1].replace(/['"]+/g, '');

			$('#phoneNumber').html(number);
		}
	});	

}

function getOperator(sms_address) {

	$.ajax({
		url: sms_address+'/operator',
		success:function(result) {
		
			let res = result.split("\n");
			let res1 = res[3];
			let res2 = res1.split(",");
			let res3 = res2[2];
			let operator = res3.replace(/['"]+/g, '');

			$('#network').html(operator);
		}
	});	

}

function isResponderOn(sms_address, index, keyword, cpNumber) {

	$.ajax({
		url: base_url+'Responder/isOn',
		success:function(result) {

			let res = JSON.parse(result);
			
			if(res.message === 1) {
				getReply(sms_address, index, keyword, cpNumber);
			}
		}
	});
};

function getReply(sms_address, index, keyword, cpNumber) {

	let data = {
		keyword:keyword
	};

	$.ajax({
		url: base_url+'Responder/search',
		type:'POST',
		data:data,
		success:function(result) {

			let res = JSON.parse(result);
			if(res.status === 'success') {
				toSend(sms_address, index, cpNumber, res.message);
			}
		}
	});

}

function toSend(sms_address, index, cpNumber,  message) {

	let data = {
		cpNumber: cpNumber,
		message: message
	};

	$.ajax({
		url:base_url+'Outbox/toSend',
		type:'POST',
		data:data,
		success:function(result) {
			setTimeout(function(){
				deleteMessage(sms_address, index);
			},10000);
		},
		complete:function() {

		}
	});

}

function unreadMsgNav(sms_address) {

	$.ajax({
		url: sms_address+'/unread_msg',
		success:function(result) {

			let indexes = result.matchAll(/(CMGL: (\w*))/g);
			let indexesArr = Array.from(indexes);
			let revIndexesArr = indexesArr.reverse();

			for(let i = 0; i < indexesArr.length; i++) {
				// console.log(revIndexesArr[i][2]);
				getMessage(sms_address, revIndexesArr[i][2]);
			}
		}
	});	

}


function getMessage(sms_address, index) {


	$.ajax({
		url: sms_address+'/specific_msg?index='+index,
		complete:function() {

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
			let removeSenderCountryCode = sanitizeMessageSender.replace('+63','');
			let messageDate = splitMessageHeader[3];
			let sanitizeMessageDate = messageDate.replace(/['"]+/g, '');
			let messageTime = splitMessageHeader[4].replace("+32","");
			let sanitizeMessageTime = messageTime.replace(/['"]+/g, '');
			let messageContent = splitByNewLine[2];

			
			isResponderOn(sms_address, index, messageContent.trim(), removeSenderCountryCode);
		}
	});
}


function deleteMessage(sms_address, index) {

    $.ajax({
    	url: sms_address+'/delete_msg?index='+index,
    	success:function(result) {

    	},
    	complete:function() {

    	}
    });

}

function responderIndicator(sms_address) {

	$.ajax({
		url: base_url+'Responder/isOn',
		success:function(result) {

			let res = JSON.parse(result);
			
			if(res.message === 1) {
				$('#responderIndicator').addClass('responderOn');

				setInterval(function() {
					unreadMsgNav(sms_address);
				},10000);

			}else {
				$('#responderIndicator').removeClass('responderOn');
			}
		}
	});
};


$(function() {

	$.ajax({
		url: base_url+'Config/smsDevice',
		beforeSend: function() {
			$.LoadingOverlay("show");
		},
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				let res = JSON.parse(data);
				let html = '';

				getSignal('http://'+res[0].ipaddress);
				getNumber('http://'+res[0].ipaddress);
				getOperator('http://'+res[0].ipaddress);	
				responderIndicator('http://'+res[0].ipaddress);	

				$('#smsInfo').html(html);

			}else {
				console.log('error');
			}

		}
	});

	$(document).ajaxStop(function() {
		$.LoadingOverlay('hide');
	});

	// setInterval(function() {
	// 	getSignal();
	// },10000);

});