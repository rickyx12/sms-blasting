var base_url = $('body').data('urlbase');

var signal = null;

function getSignal() {

	$.ajax({
		url: 'http://192.168.1.92/signal',
		success:function(result) {
			
			let res = result.split("\n");
			let res1 = res[1];
			let res2 = res1.split(",");
			let signalStrength = res2[0].replace("+CSQ:","");

			console.log(signalStrength);
			$('#signal').html(signalStrength);
		},
		error:function() {
			window.location.href = base_url+'/Account/logout';
		}
	});	

}


function getNumber() {

	$.ajax({
		url: 'http://192.168.1.92/phone_number',
		success:function(result) {
			
			let res = result.split("\n");
			let res1 = res[1]
			let res2 = res1.split(",");
			let number = res2[1].replace(/['"]+/g, '');

			$('#phoneNumber').html(number);
		}
	});	

}

function getOperator() {

	$.ajax({
		url: 'http://192.168.1.92/operator',
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


$(function() {

	getSignal();
	getNumber();
	getOperator();	

	setInterval(function() {
		getSignal();
	},10000);

});