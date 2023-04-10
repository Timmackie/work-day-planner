// Get the current date
let curDate = new Date();

// Run this function once the document is ready
$(function () {
  // Set the current date to the "currentDay" element
  $('#currentDay').text(curDate.toLocaleDateString());

  // Generate the HTML for the time blocks
  $('#hour-container').html(
    [9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
      var timeReference = '';
      // Get the stored value for each hour from localStorage
      var curVal = localStorage.getItem(`block-${hour}`) || '';

      // Determine if the time block is in the past, present, or future
      if (curDate.getHours() === hour) {
        timeReference = 'present row time-block';
      } else if (curDate.getHours() < hour) {
        timeReference = 'future row time-block';
      } else {
        timeReference = 'past row time-block';
      }

      // Generate the HTML for each time block
      return `<div id="hour-${hour}" class="row ${timeReference}">
        <div class="col-2 col-md-1 hour text-center py-3 d-flex align-items-center justify-content-center">${hour === 12 ? 12 : hour % 12}${hour / 12 >= 1 ? 'PM' : 'AM'}</div>
        <textarea id="block-${hour}" class="description col-8 col-md-9" rows="3">${curVal}</textarea>
        <div class="col-2 col-md-2 d-flex">
        <button id="btn-${hour}" class="btn saveBtn w-100" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
        </button>
        </div>
        </div>`;

    }).join('')
  );

  // When a textarea (description) value changes
  $('.description').on('change', (text) => {
    // Attach a click event listener to the save buttons and icons
    $(document).on('click', '.saveBtn, .saveBtn i', (btn) => {
      // Get the hour ID from the clicked button or its icon
      var hourId = btn.target.id ? btn.target.id.split('-')[1] : btn.target.parentElement.id.split('-')[1];
      // Construct the newTextID using the hour ID
      var newTextID = `block-${hourId}`;
      // Get the new text from the corresponding textarea
      var newText = $(`#${newTextID}`).val();

      // Save the new text to localStorage
      localStorage.setItem(newTextID, newText);
      console.log(newText);
      console.log(newTextID);
    });

  });
});
