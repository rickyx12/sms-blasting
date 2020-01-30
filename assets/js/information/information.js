
var base_url = $('body').data('urlbase');

function startup(ipaddress) {

  $.ajax({
    url: 'http://'+ipaddress+'/startup',
    beforeSend:function() {
      $.LoadingOverlay('show',{
          image: "",
          text: "Connecting to SMS."
      });
    },
    success:function(result) {
      $.LoadingOverlay('hide');
    },
    error:function() {
      $.LoadingOverlay("text","Can't connect to SMS. Refresh the page.");   
    }
  }); 
}

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
				store_sms(id, sms_address, number);
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

function initInfo() {

	$.ajax({
		url: base_url+'Config/smsDevice',
		beforeSend: function() {
			$.LoadingOverlay("show");
		},
		success:function(data, textStatus, xhr) {

			if(xhr.status == 200) {

				let res = JSON.parse(data);
				let html = '';

				//function below is from navbar.js
				getSignal('http://'+res[0].ipaddress);
				getNumber('http://'+res[0].ipaddress);
				getOperator('http://'+res[0].ipaddress);	
				responderIndicator('http://'+res[0].ipaddress);	

				$.each(res,function(index, val) {

					let id = val.id;
					let alias = val.alias;
					let ipaddress = val.ipaddress;

					html += '<b>Alias</b>: '+alias;
					html += '<br>';
					html += '<b>Number</b>: <span id="phoneNumber'+id+'"></span>';
					html += '<br>';
					html += '<b>Address</b>: '+ipaddress;
					html += '<br>';
					html += '<b>Network</b>: <span id="network'+id+'"></span>';
					html += '<br>';
					html += '<b>Signal:</b> <span id="signal'+id+'"></span>';
					html += '<br><br>';

					startup(ipaddress);
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
}

$(function() {

	initInfo();

	$('#refreshInfo').click(function() {
		initInfo();
	});

	$(document).ajaxStop(function() {
		$.LoadingOverlay('hide');
	});

});