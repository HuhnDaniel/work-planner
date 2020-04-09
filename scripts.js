var hourlyContent = [];
// If there is hourlyContent data in localStorage, put it in an array
if(localStorage.getItem("hourlyContent") !== null) {
	hourlyContent = localStorage.getItem("hourlyContent").split(",")
}

// Display current day month and year at top
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

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