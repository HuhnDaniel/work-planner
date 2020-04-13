var hourlyContent = [];
var HOURS_IN_DAY = 24;
var startHour = document.getElementById("start-hour");
var endHour = document.getElementById("end-hour");

// If there is hourlyContent data in localStorage, put it in an array
if(localStorage.getItem("hourlyContent") !== null) {
	hourlyContent = localStorage.getItem("hourlyContent").split(",")
}

// Display current day month and year at top
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

// Populate dropdown selectors with hours to chose from
for(var i = 0; i < HOURS_IN_DAY; i++) {
	var startOption = $("<option>");
	var endOption = $("<option>");

	startOption.attr("data-start", i);
	endOption.attr("data-end", i);
	
	switch(i){
		case 0:
			startOption.text("12 AM");
			endOption.text("12 AM");
		break;
		case 9:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 10:
		case 11:
			startOption.text(i + " AM");
			endOption.text(i + " AM");
		break;
		case 12:
			startOption.text("12 PM");
			endOption.text("12 PM");
		break;
		case 17:
			endOption.attr("selected", true);
		default:
			startOption.text((i - 12) + " PM");
			endOption.text((i - 12) + " PM");
		break;
	}

	$("#start-hour").append(startOption);
	$("#end-hour").append(endOption);
}

if(localStorage.getItem("startHour") !== null) {
	startHour.selectedIndex = parseInt(localStorage.getItem("startHour"));
} else {
	startHour.selectedIndex = 9;
}
if(localStorage.getItem("endHour") !== null) {
	endHour.selectedIndex = parseInt(localStorage.getItem("endHour"));
} else {
	endHour.selectedIndex = 17;
}

// Function to determine what blocks are past present and future and to populate list with text out of localStorage
$(".time-block").toArray().forEach(function(block) {
	// Check data hour against current 24-hour-time hour (negates the need for AM/PM checking)
	if(parseInt(block.getAttribute("data-hour")) < parseInt(moment().format("HH"))) {
		block.classList.add("past");
	} else if(parseInt(block.getAttribute("data-hour")) === parseInt(moment().format("HH"))) {
		block.classList.add("present");
	} else {
		block.classList.add("future");
	}

	block.children[1].textContent = hourlyContent[parseInt(block.getAttribute("data-hour"))];
});



$(document).ready(function() {
	// Function to save text content when lock button is clicked
	$(".saveBtn").click(function() {
		// Get hour-data from parent time-block
		var hourToSave = parseInt(this.parentElement.getAttribute("data-hour"));
		
		// Get text from associated timeblock and save in that hours index of array
		hourSchedule = this.parentElement.children[1].textContent;
		hourlyContent[hourToSave] =  hourSchedule;
		
		// Save array to localStorage
		localStorage.setItem("hourlyContent", hourlyContent.toString());
	});
	
});