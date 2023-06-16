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
    hourStart: 00,
    hourEnd: 24,
    showNowIndicator: false,
  });


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

    calendar.createSchedules([appointment]);
    form.reset();
  });
});








/***document.addEventListener("DOMContentLoaded", function () {
  const Calendar = tui.Calendar;

  const calendar = new Calendar("#calendar", {
    defaultView: "week",
    usageStatistics: false,
    // Rest of the calendar options...

    useFormPopup: true,
    useDetailPopup: true,
    // Rest of the options...
  });

  calendar.setOptions({
    week: {
      taskView: false,
      eventView: ["time"],
      hourStart: 00,
      hourEnd: 24,
      showNowIndicator: false,
    },
  });

  calendar.createSchedules([
    {
      id: "1",
      calendarId: "1",
      title: "pandol",
      category: "time",
      dueDateClass: "",
      start: "2023-06-10T22:30:00+03:00",
      end: "2023-06-10T23:30:00+03:00",
    },
  ]);

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

    calendar.createSchedules([appointment]);
    form.reset();
  });
});



/*document.addEventListener("DOMContentLoaded", function () {

  const Calendar = tui.Calendar; // Make sure tui.Calendar is available

  const calendar = new Calendar("#calendar", {
    defaultView: "week",
    usageStatistics: false,


    template: {
      monthDayname: function (dayname) {
        return (
          '<span class="calendar-week-dayname-name">' +
          dayname.label +
          "</span>"
        );
      },
    },
    disableDblClick: false, // Disable double-click to create a new event
    disableClick: function (schedule) {
      return schedule.category === "milestone"; // Disable click on milestone events
    },

    timezones: [
      {
        timezoneOffset: 9 * 60, // Set your desired timezone offset
        displayLabel: "GMT+3:00", // Set the timezone display label
        tooltip: "KSA", // Set the timezone tooltip
      },
    ],
    
    useFormPopup: true,
    useDetailPopup: true, // Disable the detail popup for events
    isReadOnly: false, // Make the calendar read-only
    disableDrag: false, // Disable dragging events
    disableResize: false, // Disable resizing events
  });

  calendar.setOptions({
    week: {
      taskView: false,
      eventView: ["time"],
      hourStart: 00,
      hourEnd: 24,
      showNowIndicator: false,
    },
  });


  calendar.createEvents([
    {
      id: "1",
      calendarId: "1",
      title: "pandol",
      category: "time",
      dueDateClass: "",
      start: "2023-06-10T22:30:00+3:00",
      end: "2023-06-10T23:30:00+3:00",
    },
  ]);


  let form = document.getElementById("appointmentform");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    console.log(title);
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

    calendar.createEvents([appointment]);
  });
});

/*document.addEventListener("DOMContentLoaded", function () {
  const Calendar = tui.Calendar; // Make sure tui.Calendar is available

  const calendar = new Calendar("#calendar", {
    defaultView: "week",
    taskView: true,
    usaageStatistics: false,



    

    template: {
      monthDayname: function (dayname) {
        return (
          '<span class="calendar-week-dayname-name">' +
          dayname.label +
          "</span>"
        );
      },
    },
  });
  
  calendar.createEvents([
    {   
        id: "1",
        calendarId: "1",
        title: "pandol",
        category: "time",
        dueDateClass: "",
        start: "2023-05-30T22:30:00+09:00",
        end: "2023-05-30T23:30:00+09:00",


    }
  ]);
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
    }

  calendar.createEvents([
    {   
        id: "1",
        calendarId: "1",
        title: "pandol",
        category: "time",
        dueDateClass: "",
        start: "2023-06-10T22:30:00+09:00",
        end: "2023-06-10T23:30:00+09:00",


    }
  ]);
});
});
/*
html:
creat a form with id appointmentform
    input == title == panadol   // diff id
    input == start == 2023-05-29T22:30:00+09:00 // diff id
    input == end == 2023-05-29T23:30:00+09:00 // diff id
    button == submit == submit // diff id
js:


var form = document.getElementById("appointmentform");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    
    var appointment = { 
        id: String(date.now()),
        calendarId: "1",
        title: title,
        category: "time",
        dueDateClass: "",
        start: start,
        end: end,
    }


calendar.createEvents([
    appointment

]);
});

form.reset();











    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;
        const id = document.getElementById("id").value;
        const calendarId = document.getElementById("calendarId").value;
        const category = document.getElementById("category").value;
        const dueDateClass = document.getElementById("dueDateClass").value;
        const raw = document.getElementById("raw").value;
        const state = document.getElementById("state").value;
        const color = document.getElementById("color").value;
        const bgColor = document.getElementById("bgColor").value;
        const dragBgColor = document.getElementById("dragBgColor").value;
        const borderColor = document.getElementById("borderColor").value;
        const location = document.getElementById("location").value;


*/
