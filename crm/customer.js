const addButton = $("#addContactButton");
const customerNameSelect = $("#customerNameInput");
const phoneSelect = $("#customerPhoneInput");
const emailSelect = $("#customerEmailInput");
const additionalSelect = $("#customerAdditionalInput");
const tbodySelect = $("#customerTbody");

let customerTableArray = [];
let customerName;
let phone;
let email;
let additional;
let info;
let dummyCustomer = 10;

$.ajax({
    url: "https://randomuser.me/api?results=" + dummyCustomer + "",
    dataType: 'json',
    success: function (data) {
        for (let i = 0; i < data.results.length; i++) {
            customerName = data.results[i].name.first + " " + data.results[i].name.last
            phone = data.results[i].phone
            email = data.results[i].email
            additional = "this is a fake contact"
            addCustomerToTableArray(customerName, phone, email, additional);
            printCustomerToTable();
        }

    }
});

addButton.on("click", function () {
    let i = 0;
    $(".customerInput").each(function (index, element) {
        if (element.value !== "") {
            i++;
        }
    });
    if (i !== 4) {
        alert("Please fill in all the fields");
    } else {
        console.log("New Customer added");
        customerName = customerNameSelect.val();
        phone = phoneSelect.val();
        email = emailSelect.val();
        additional = additionalSelect.val();
        console.log(customerName, phone, email, additional);

        addCustomerToTableArray(customerName, phone, email, additional);

        printCustomerToTable();
        $('[data-toggle="popover"]').popover({
        })
        console.log(customerTableArray);
        $("#addNewContactWindow").modal("hide");
        customerNameSelect.val("");
        phoneSelect.val("");
        emailSelect.val("");
        additionalSelect.val("");
    }
});




function addCustomerToTableArray(fullname, phone, email, additional) {
    let objC = {
        name: fullname,
        phoneNr: phone,
        mail: email,
        information: additional
    };

    customerTableArray.push(objC);
}

function printCustomerToTable(name, phone, email) {
    // $("#customerTbody").append("<tr id='cID" + (customerTableArray.length) + "'>" + "<th scope='row'>" + (customerTableArray.length) + "</th>" + "<td class='cName'>" + name +"</td>" + "<td class='cPhone'>" + phone +"</td>" + "<td class='cMail'>" + email +"</td>" + "</tr>");
    $("#customerTbody").empty();
    for (let i = 0; i < customerTableArray.length; i++) {
        $("#customerTbody").append("<tr id='cID" + i + "' data-toggle='tooltip' data-placement='bottom' title='Click for more information'>" + "<th scope='row'>" + i + "</th>" + "<td class='cName'>" + customerTableArray[i].name + "</td>" + "<td class='cPhone d-none d-lg-table-cell'>" + customerTableArray[i].phoneNr + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + customerTableArray[i].mail + "</td>" + "</tr>");
    }
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });
}


//Click/selected customer
$("#customerTbody").on("click", "tr", function () {
    $(this).attr("data-toggle", "modal");
    $(this).attr("data-target", "#editNewContactWindow");
    $(this).attr("data-picked", "true");
    $("#customerNameVal").val($(this).children(".cName").text());
    $("#customerPhoneVal").val($(this).children(".cPhone").text());
    $("#customerEmailVal").val($(this).children(".cMail").text());
    info = $.grep(customerTableArray, function (e) {
        return e.name == $("#customerNameVal").val();
    });
    console.log(info);
    $("#customerAdditionalVal").val(info[0].information);


});

// Remove selected contact
$("#removeContactButton").on("click", function () {
    if (confirm("Are you sure you want to remove this customer?")) {
        for (var i = 0; i < customerTableArray.length; i++) {
            if (customerTableArray[i].name == info[0].name && customerTableArray[i].phoneNr == info[0].phoneNr && customerTableArray[i].mail == info[0].mail && customerTableArray[i].information == info[0].information) {
                console.log(customerTableArray[i].name);
                console.log(info[0].name);
                customerTableArray.splice(i, 1);
                break;
            }
        }
        info = "";
        printCustomerToTable();
        console.log(customerTableArray);
        $(this).attr("data-dismiss", "modal");
        $("tr[data-picked='true']").remove();
    }
});

// edit customer
$("#editContactButton").on("click", function () {
    let j = 0;
    $(".customerEditInput").each(function (index, element) {
        if (element.value !== "") {
            j++;
        }
    });
    if (j !== 4) {
        alert("Please fill in all the fields");
    } else {
        for (var i = 0; i < customerTableArray.length; i++) {
            if (customerTableArray[i].name == info[0].name && customerTableArray[i].phoneNr == info[0].phoneNr && customerTableArray[i].mail == info[0].mail && customerTableArray[i].information == info[0].information) {
                let tmp = {
                    name: $("#customerNameVal").val(),
                    phoneNr: $("#customerPhoneVal").val(),
                    mail: $("#customerEmailVal").val(),
                    information: $("#customerAdditionalVal").val()
                };
                customerTableArray.splice(i, 1, tmp);
                break;
            }
        }
        info = "";
        console.log(customerTableArray);
        printCustomerToTable();
        $(this).attr("data-dismiss", "modal");
        $("tr[data-picked='true']").attr("data-picked", "false")
    }
});


