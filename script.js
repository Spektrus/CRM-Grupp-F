class CRM {
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

}

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

    deleteEvent(element) {
        if (confirm("Delete?")) {
            $(element).parent().remove();
        }
    }
    getEventInfo(element) {
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
    editEvent() {
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
        this.month = new Intl.DateTimeFormat("en-US", this.options).format(this.date);
        this.year = this.date.getFullYear();
    }
    setCurrentDate() {
        this.month;
        $("#calendarMonth").prepend(this.month);
        $("#calendarYear").html(this.year);
        $(".days li").each(function (index, element) {
            let listValue = Number(element.innerText);
            if (listValue === calendar.day) {
                $(element).addClass("active");
            }
        });
    }

}


calendar = new Calendar();
events = new Events();
calendar.setCurrentDate();


$("#addEvent").click(function () {
    events.addEvent();
});

$("#editEvent").click(function () {
    console.log("hej");
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
    console.log("hej");
    events.getEventInfo($(this));
});



CRM = new CRM();
CRM.createCustomers(10);

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    });

});

function logOut(){
    window.location.href = "/CRM-Grupp-F/index.html";
}