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
        this.editData = '<a href=`#`>Edit event</a><br><a href=`#`>Delete event</a>';
        this.call = '<a tabindex="0" data-toggle="popover" data-placement="bottom" data-html="true" data-content="' + this.callData + '"><img class="phone" src="../images/phone.png"></a>';
        this.email = '<a href="mailto:jessica@alba.com"><img class="email" src="../images/mail.png"></a>';
        this.edit = '<a tabindex="0" data-toggle="popover" data-placement="right" class="right" data-html="true" data-content="' + this.editData + '"><img class="right more" src="../images/more.png"></a>';
    }

    sortByDate() {
        // TODO: Sort events by date
    }

    addEvent() {
        let modal = $(".form-control");
        let arr = [];
        modal.each(function (index, element) {
            if (element.value != "") {
                arr.push(element.value);
            }
        });
        if (arr.length === 5) { // TODO: Add drop down with selectable customers
            let eventCard = "<div class='eventCard'><h3 class='eventTitle'>" + arr[0] + "</h3><span>" + arr[2] + ", " + arr[3] + "</span>" + "<p>" + arr[4] + "</p>" + this.call + this.email + this.edit + "</div>";
            $("#events").append(eventCard);
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
            $("#addNewEvent").modal("hide");
        }
        else {
            alert("Fill in all fields");
        }
    }
}

events = new Events();

$("#addEvent").click(function () {
    events.addEvent();
});

$("#eventDate").datepicker({
    dateFormat: "MM d"
});

CRM = new CRM();
CRM.createCustomers(10);

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    });

});