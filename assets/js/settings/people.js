$(function(){
	
	var base_url = $('body').data('urlbase');


	var peopleTable = $('#peopleTable').DataTable({
	 					processing:true,
						serverSide:true,								
						ajax:{
							url: base_url+'People/peopleJSON',
						},
						columns:[
							{
								data:null,
								render:function(data,type,row) {
									return data.name;
								}
							},
							{
								data:null,
								render:function(data,type,row){
									return "+63"+data.contact;
								}
							},
							{
								data:null,
								render:function(data,type,row) {
									return data.groups
								}
							},
							{
								data:null,
								width:"11%",
								render:function(data,type,row) {

									$(document).on('click','#edit-btn'+data.id,function(){

										let id = $(this).data('id');
										let name = $(this).data('name');								
										let contact = $(this).data('contact');
										let groups = $(this).data('groups');

										$('.people').val(id);
										$('#editName').val(name);
										$('#editContact').val(contact);
										$('#editGroups option:contains("'+groups+'")').prop('selected',true);

									});


									$(document).on('click','#delete-btn'+data.id,function(){

										let id = $(this).data('id');
										let name = $(this).data('name');

										$('.people').val(id);
										$('#peopleName').html('<b>'+name+'</b>');

									});

									let buttons = "";
									buttons += "<button type='button' id='edit-btn"+data.id+"' data-id='"+data.id+"' data-name='"+data.name+"' data-contact='"+data.contact+"' data-groups='"+data.groups+"' class='btn btn-primary' data-toggle='modal' data-target='#editModal'><i class='fa fa-pen'></i></button>";
									buttons += " <button type='button' id='delete-btn"+data.id+"' class='btn btn-danger' data-id='"+data.id+"' data-name='"+data.name+"' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button>";

									return buttons;
								}
							}
						]
					});


	$('#newModalBtn').click(function() {

		$('#newModalBtn').attr('disabled',true);
		$('.closeModalBtn').attr('disabled',true);

		let name = $('#name').val();
		let contact = $('#contact').val();
		let groups = $('#groups').val();

		let data = {
			name:name,
			contact:contact,
			groups:groups
		};

		$.ajax({
			url: base_url+'People/add',
			type:'POST',
			data:data,
			success:function(result) {

				let res = JSON.parse(result);

				if(res.status == 'success') {

					swal("Good job!",res.message, "success");
					$('#newModal').modal('hide');
					$('#newModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);
					peopleTable.ajax.reload(null,false);
					
					$('#name').val('');
					$('#contact').val('');

				}else {

					swal("Ooopss!",res.message, "error");
					$('#newModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);					
				}
			}
		});
	});


	$('#editModalBtn').click(function() {

		$('#editModalBtn').attr('disabled',true);
		$('.closeModalBtn').attr('disabled',true);

		let peopleId = $('.people').val();
		let name = $('#editName').val();
		let contact = $('#editContact').val();
		let groups = $('#editGroups').val();

		let data = {
			peopleId:peopleId,
			name:name,
			contact:contact,
			groups:groups
		};

		$.ajax({
			url: base_url+'People/update',
			type:'POST',
			data:data,
			success:function(result) {

				let res = JSON.parse(result);

				if(res.status == 'success') {

					swal("Good job!",res.message, "success");
					$('#editModal').modal('hide');
					$('#editModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);
					peopleTable.ajax.reload(null,false);

					$('#editName').val('');
					$('#editContact').val('');					
				}else {

					swal("Ooopss!",res.message, "error");	
					$('#editModalBtn').attr('disabled',true);
					$('.closeModalBtn').attr('disabled',true);									
				}
			}
		});
 	});


	$('#deleteModalBtn').click(function(){

		$('#deleteModalBtn').attr('disabled',true);
		$('.closeModalBtn').attr('disabled',true);

		let peopleId = $('.people').val();

		let data = {
			people:peopleId
		};

		$.ajax({
			url: base_url+'People/delete',
			type:'POST',
			data:data,
			success:function(result) {

				let res = JSON.parse(result);

				if(res.status == 'success') {

					swal("Good job!",res.message, "success");
					$('#deleteModal').modal('hide');
					$('#deleteModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);
					peopleTable.ajax.reload(null,false);

				}else {

					swal("Ooopss!","Error!", "error");	
						$('#deleteModalBtn').attr('disabled',false);
						$('.closeModalBtn').attr('disabled',false);
				}
			}
		});
	});

});