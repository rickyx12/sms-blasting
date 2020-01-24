
var base_url = $('body').data('urlbase');

function simNumber(id, sms_address) {

	$.ajax({
		url: 'http://'+sms_address+'/phone_number',
		success:function(result) {
			
			let res = result.split("\n");
			let res1 = res[1]
			let res2 = res1.split(",");
			let number = res2[1].replace(/['"]+/g, '');

			setTimeout(function() {
				$('#phoneNumber'+id).html('+'+number);
			},5000);
		}
	});	

}

function simOperator(id, sms_address) {

	$.ajax({
		url: 'http://'+sms_address+'/operator',
		success:function(result) {
		
			let res = result.split("\n");
			let res1 = res[3];
			let res2 = res1.split(",");
			let res3 = res2[2];
			let operator = res3.replace(/['"]+/g, '');

			$('#network'+id).html(operator);
		}
	});	

}

function simSignal(id, sms_address) {

	$.ajax({
		url: 'http://'+sms_address+'/signal',
		success:function(result) {
			
			let res = result.split("\n");
			let res1 = res[1];
			let res2 = res1.split(",");
			let signalStrength = res2[0].replace("+CSQ:","");

			$('#signal'+id).html(signalStrength);
		},
		error:function() {

			$('#signal'+id).html("<span style='color:#FF0000'>Disconnected</span>");

	  //     $.LoadingOverlay('show',{
	  //         image: "",
	  //         text: "Reconnecting to SMS."
	  //     });  

			// startup();
		}
	});	
}

$(function() {

	$.ajax({
		url: base_url+'Config/smsDevice',
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				let res = JSON.parse(data);
				let html = '';

				$.each(res,function(index, val) {

					let id = val.id;
					let alias = val.alias;
					let ipaddress = val.ipaddress;
					let delay = val.delay;

					html += '<b>Alias</b>: '+alias;
					html += '<br>';
					html += '<b>Number</b>: <span id="phoneNumber'+id+'"></span>';
					html += '<br>';
					html += '<b>Address</b>: '+ipaddress;
					html += '<br>';
					html += '<b>Network</b>: <span id="network'+id+'"></span>';
					html += '<br>';
					html += '<b>Signal:</b> <span id="signal'+id+'"></span>';
					html += '<br>';
					html += '<b>Delay</b>: '+delay;
					html += '<br><br>'

					simNumber(id, ipaddress);
					simOperator(id, ipaddress);
					simSignal(id, ipaddress);

				});

				$('#smsInfo').html(html);

			}else {
				console.log('error');
			}

		}
	});

});