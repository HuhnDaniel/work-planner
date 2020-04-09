var timeBlocks = $(".time-block").toArray();

$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

timeBlocks.forEach(function(block) {
	if(parseInt(block.getAttribute("data-hour")) < parseInt(moment().format("HH"))) {
		block.classList.add("past");
	} else if(parseInt(block.getAttribute("data-hour")) === parseInt(moment().format("HH"))) {
		block.classList.add("present");
	} else {
		block.classList.add("future");
	}		
});