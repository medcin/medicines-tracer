/*document.addEventListener("DOMContentLoaded", function () {
  const Calendar = tui.Calendar;

  const calendar = new Calendar("#calendar", {
    defaultView: "week",
    usageStatistics: false,
    // Rest of the calendar options...
    useFormPopup: false,
    useDetailPopup: false,
    // Rest of the options...
    taskView: false,
    eventView: ["time"],
    hourStart: 00,
    hourEnd: 24,
    showNowIndicator: false,
  });



//-----------
let form = document.getElementById("appointmentform");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  let appointment = {
    id: String(Date.now()),
      calendarId: "1",
    title: title,
    category: "time",
      dueDateClass: "",
    start: start,
    end: end,
  };

  // Make a POST request to the server endpoint
  fetch("/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  })
    .then((response) => {
      if (response.ok) {
        // Event data stored successfully, do something if needed
        console.log("Event stored successfully");
        form.reset();
      } else {
        console.error("Failed to store event");
      }
    })
    .catch((error) => {
      console.error("Error storing event:", error);
    });
});
    calendar.createSchedules([appointment]);

    form.reset();
});*/
//-----------
document.addEventListener("DOMContentLoaded", function () {
  const Calendar = tui.Calendar;

  const calendar = new Calendar("#calendar", {
    defaultView: "week",
    usageStatistics: false,
    // Rest of the calendar options...
    useFormPopup: false,
    useDetailPopup: false,
    // Rest of the options...
    taskView: false,
    eventView: ["time"],
    hourStart: 0,
    hourEnd: 24,
    showNowIndicator: false,
  });

  // Fetch events from the server and update the calendar
  function fetchEvents() {
    fetch("/events")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Retrieved events:", data);
        calendar.createSchedules(data);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        // Display an error message to the user
        const errorMessage = "Failed to fetch events. Please try again later.";
        alert(errorMessage);
      });
  }

  // Call the fetchEvents() function to initially fetch events when the page loads
  fetchEvents();

  let form = document.getElementById("appointmentform");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    let appointment = {
      id: String(Date.now()),
      calendarId: "1",
      title: title,
      category: "time",
      dueDateClass: "",
      start: start,
      end: end,
    };

    fetch("/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => {
        if (response.ok) {
          const errorMessage = "Medicine stored successfully.";
          alert(errorMessage);
          console.log("Event stored successfully");
          form.reset();
          // Fetch events again to update the calendar with the newly added event
          fetchEvents();
        } else {
          const errorMessage = "Failed to store Medicine.";
          alert(errorMessage);
          console.error("Failed to store event");
        }
      })
      .catch((error) => {
        console.error("Error storing event:", error);
      });
  });
});
