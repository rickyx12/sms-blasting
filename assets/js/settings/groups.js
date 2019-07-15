$(function(){
	
	var base_url = $('body').data('urlbase');


	var groupsTable = $('#groupsTable').DataTable({
	 					processing:true,
						serverSide:true,								
						ajax:{
							url: base_url+'Groups/groupsJSON',
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
								width:"11%",
								render:function(data,type,row) {

									$(document).on('click','#edit-btn'+data.id,function(){

										let id = $(this).data('id');
										let name = $(this).data('name');								

										$('.groups').val(id);
										$('#editName').val(name);

									});


									$(document).on('click','#delete-btn'+data.id,function(){

										let id = $(this).data('id');
										let name = $(this).data('name');

										$('.groups').val(id);
										$('#groupsName').html('<b>'+name+'</b>');

									});

									let buttons = "";
									buttons += "<button type='button' id='edit-btn"+data.id+"' data-id='"+data.id+"' data-name='"+data.name+"' class='btn btn-primary' data-toggle='modal' data-target='#editModal'><i class='fa fa-pen'></i></button>";
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

		let data = {
			name:name
		};

		$.ajax({
			url: base_url+'Groups/add',
			type:'POST',
			data:data,
			success:function(result) {

				let res = JSON.parse(result);

				if(res.status == 'success') {

					swal("Good job!",res.message, "success");
					$('#newModal').modal('hide');
					$('#newModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);
					groupsTable.ajax.reload(null,false);
					
					$('#name').val('');

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

		let groupsId = $('.groups').val();
		let name = $('#editName').val();

		let data = {
			groupsId:groupsId,
			name:name
		};

		$.ajax({
			url: base_url+'Groups/update',
			type:'POST',
			data:data,
			success:function(result) {

				let res = JSON.parse(result);

				if(res.status == 'success') {

					swal("Good job!",res.message, "success");
					$('#editModal').modal('hide');
					$('#editModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);
					groupsTable.ajax.reload(null,false);

					$('#editName').val('');			
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

		let groupsId = $('.groups').val();

		let data = {
			groups:groupsId
		};

		$.ajax({
			url: base_url+'Groups/delete',
			type:'POST',
			data:data,
			success:function(result) {

				let res = JSON.parse(result);

				if(res.status == 'success') {

					swal("Good job!",res.message, "success");
					$('#deleteModal').modal('hide');
					$('#deleteModalBtn').attr('disabled',false);
					$('.closeModalBtn').attr('disabled',false);
					groupsTable.ajax.reload(null,false);

				}else {

					swal("Ooopss!","Error!", "error");	
						$('#deleteModalBtn').attr('disabled',false);
						$('.closeModalBtn').attr('disabled',false);
				}
			}
		});
	});

});