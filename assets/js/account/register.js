
var base_url = $('body').data('urlbase');

$('#registerBtn').click(function(e) {
	
	e.preventDefault();

	let username = $('#username').val();
	let password = $('#password').val();

	var data = {
		username:username,
		password:password
	};

	$.ajax({
		url:base_url+'Account/registerNow',
		type:'POST',
		data:data,
		success:function(result) {

			let res = JSON.parse(result);

			if(res.status == 'okay') {
				swal('Success!',res.message,'success');
				$('#username').val("");
				$('#password').val("");
			}else {
				swal('Error!',res.message,'error');
			}
		}
	});

});