$(function () {
  // Function to handle click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();
    // Get the id of the time-block containing the button that was clicked
    var timeBlockId = $(this).parent().attr("id");
    // Save the user input in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to apply past, present, or future class to each time block
  function updateHourlyBlocks() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      // Compare the block hour with the current hour and apply classes accordingly
      if (blockHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (blockHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Call the function to update hourly blocks when the page loads
  updateHourlyBlocks();

  // Function to display any user input saved in local storage
  function displaySavedInput() {
    // Loop through each time block
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      // Get the user input from local storage using the block id as the key
      var userInput = localStorage.getItem(blockId);
      // Set the value of the textarea to the saved user input
      $(this).find(".description").val(userInput);
    });
  }

  // Call the function to display saved input when the page loads
  displaySavedInput();

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
