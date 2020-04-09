var timeBlocks = $(".time-block").toArray();
var hourlyContent = [];

// Display current day month and year at top
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

// Function to determine what blocks are past present and future
timeBlocks.forEach(function(block) {
	// Check data hour against current 24-hour-time hour (negates the need for AM/PM checking)
	if(parseInt(block.getAttribute("data-hour")) < parseInt(moment().format("HH"))) {
		block.classList.add("past");
	} else if(parseInt(block.getAttribute("data-hour")) === parseInt(moment().format("HH"))) {
		block.classList.add("present");
	} else {
		block.classList.add("future");
	}		
});

// Function to save text content when lock button is clicked
$(".saveBtn").click(function() {
	// Get hour-data from parent time-block
	var hourToSave = parseInt(this.parentElement.getAttribute("data-hour"));

	// Get text from associated timeblock and save in that hours index of array
	hourSchedule = this.parentElement.children[1].textContent;
	hourlyContent[hourToSave] =  hourSchedule;
	console.log(hourlyContent);

	// Save array to localStorage
	localStorage.setItem("hourlyContent", hourlyContent.toString());
});