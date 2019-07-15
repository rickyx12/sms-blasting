
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;

function formatDate(param) {

	let dates = param;

	let date = dates.split("-");
	let month = null;
	let final = null;

	if(date[1] == "01") {
		month = "Jan";		
	}else if(date[1] == "02") {
		month = "Feb";
	}else if(date[1] == "03") {
		month = "Mar";
	}else if(date[1] == "04") {
		month = "Apr";
	}else if(date[1] == "05") {
		month = "May";
	}else if(date[1] == "06") {
		month = "Jun";
	}else if(date[1] == "07") {
		month = "Jul";
	}else if(date[1] == "08") {
		month = "Aug";
	}else if(date[1] == "09") {
		month = "Sep";
	}else if(date[1] == "10") {
		month = "Oct";
	}else if(date[1] == "11") {
		month = "Nov";
	}else if(date[1] == "12") {
		month = "Dec";
	}else {
		month = "error";
	}

	return month+" "+date[2]+", "+date[0];

}


function formatTime(param) {

	let times = param;
	let time = times.split(":");
	let hour = null;
	let final = null;
	let mode = null;

	if(time[0] > 12) {
		hour = time[0] - 12;
		mode = "PM"; 
	}else {
		hour = time[0];
		mode = "AM";
	}

	return hour+":"+time[1]+" "+mode;
}
