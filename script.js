/*class CRM {
    constructor() {
        this.username = "admin";
        this.password = "admin";
    }

    createCustomers(amount) {
        $.ajax({
            url: "https://randomuser.me/api?results=" + amount + "",
            dataType: 'json',
            success: function (data) {
                let customers = data.results;
                console.log(data.results);
                return customers;
            }
        });

    }
    createUser(tfn, namn, dob, email) {
        //
    }

}*/

class Events {
    constructor() {
        this.callData = '<a href=`#`>Call with phone</a><br><a href=`#`>Call with Skype</a>';
        this.call = '<a tabindex="0" data-toggle="popover" data-placement="bottom" data-html="true" data-content="' + this.callData + '"><img class="phone" src="../images/phone.png"></a>';
        this.email = '<a href="mailto:jessica@alba.com"><img class="email" src="../images/mail.png"></a>';
        this.delete = '<img src="../images/delete.png" class="delete">'
        this.edit = '<img src="../images/edit.png" class="edit" data-target="#editCurrEvent" data-toggle="modal"></img>'
        this.element = "";
    }

    sortByDate() {
        // TODO: Sort events by date
    }

    addEvent() {
        let modal = $(".addInput");
        let arr = [];
        modal.each(function (index, element) { // takes input values and puts them into array
            if (element.value != "") {
                arr.push(element.value);
            }
        });
        if (arr.length === 4) { // checks if all fields are entered
            let eventCard = "<div class='eventCard'><h3 class='eventTitle'>" + arr[0] + "</h3><span class='eventTime'>" + arr[2] + "</span><span class='eventDate'>" + arr[1] + "&nbsp;</span>" + "<p>" + arr[3] + "</p>" + this.call + this.email + this.delete + this.edit + "</div>";
            console.log(arr[1] + arr[2]);
            $("#events").append(eventCard);
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
            $("#addNewEvent").modal("hide");
        } else {
            alert("Fill in all fields");
        }
    }

    deleteEvent(element) { // deletes event element
        if (confirm("Delete?")) {
            $(element).parent().remove();
        }
    }
    getEventInfo(element) { // takes text from event element and puts it into inputs in modal
        this.element = element.parent();
        let arr = [];
        $(element).parent().children().each(function () {
            arr.push($(this).text());
        });
        let modal = $(".editInput");
        modal.each(function (index, element) {
            if (index < 4) {
                console.log(arr[index]);
                element.value = arr[index];
            }
        });
    }
    editEvent() { // inserts new values from inputs back into edited event
        let modal = $(".editInput");
        let arr = [];
        modal.each(function (index, element) {
            if (element.value != "") {
                arr.push(element.value);
            }
        });
        if (arr.length === 4) {
            this.element.children().each(function (index, element) {
                if (index < 4) {
                    $(element).html(arr[index]);
                    if ($(element).hasClass("eventDate")) {
                        element.innerHTML += "&nbsp;";
                    }
                }
            });
            $("#editCurrEvent").modal("hide");
        } else {
            alert("Fill in all fields");
        }
    }
}

class Calendar {
    constructor() {
        this.date = new Date();
        this.day = this.date.getDate();
        this.options = {
            month: "long"
        };
        this.currentMonth = this.date.getMonth();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
    }
    createCalendar(month, year) {
        this.date.setMonth(month);
        this.date.setYear(year);
        console.log(this.month, this.year);

        let monthName = new Intl.DateTimeFormat("en-US", this.options).format(this.date);
        let firstDay = (new Date(year, month)).getDay();
        let currentDay = firstDay - firstDay - firstDay + 1;
        for (currentDay; currentDay < 8 - firstDay; currentDay++) {
            let day = currentDay;
            if (day <= 0) {
                day = "";
            }
            $(".week1").append("<td>" + day + "</td>");
        }

        let days = this.getMonthDays(this.month, this.year);
        for (let week = 0; week < 7; week++) {
            $(".week2").append("<td>" + currentDay + "</td>");
            currentDay++;
        }
        for (let week = 0; week < 7; week++) {
            $(".week3").append("<td>" + currentDay + "</td>");
            currentDay++;
        }
        for (let week = 0; week < 7; week++) {
            $(".week4").append("<td>" + currentDay + "</td>");
            currentDay++;
        }
        for (let week = 0; week < 7; week++) {
            let day = currentDay;
            if (day > days) {
                day = "";
            }
            $(".week5").append("<td>" + day + "</td>");
            currentDay++;
        }
        for (currentDay; currentDay < days; currentDay++) {
            let day = currentDay;
            if (day > days) {
                day = "";
            }
            $(".week6").append("<td>" + day + "</td>");
        }

        $("#calendarMonth").prepend(monthName);
        $("#calendarYear").html(this.year);
        if (this.month == this.currentMonth) {
            $(".days tr td").each(function (index, element) {
                let today = Number(element.innerText);
                if (today === calendar.day) {
                    $(element).addClass("active");
                }
            });
        }
    }
    getMonthDays(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }
    nextMonth() {
        if (this.month == 11) {
            this.month = 0;
            this.year += 1;
        } else {
            this.month += 1;
        }
        $(".days tr td").remove();
        $("#calendarMonth").empty();
        this.createCalendar(this.month, this.year);
    }
    prevMonth() {
        if (this.month == 0) {
            this.month = 11;
            this.year -= 1;
        } else {
            this.month -= 1;
        }
        $(".days tr td").remove();
        $("#calendarMonth").empty();
        this.createCalendar(this.month, this.year);
    }
}


calendar = new Calendar();
events = new Events();

calendar.createCalendar(calendar.month, calendar.year);

$(".month").on("click", "#nextMonth", function () {
    calendar.nextMonth();
});


$(".month").on("click", "#prevMonth", function () {
    calendar.prevMonth();
});
$("#addEvent").click(function () {
    events.addEvent();
});

$("#editEvent").click(function () {
    events.editEvent();
});

$("#editEventDate").datepicker({
    dateFormat: "MM d",
    firstDay: 1
});

$("#addEventDate").datepicker({
    dateFormat: "MM d",
    firstDay: 1
});

$(document).on("click", ".delete", function () {
    events.deleteEvent($(this));
});

$(document).on("click", ".edit", function () {
    events.getEventInfo($(this));
});

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    });

});

function logOut() {
    document.cookie = "login=false; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;"
    if (document.cookie !== "login=true") {
        window.location.href = "../";
    }
}