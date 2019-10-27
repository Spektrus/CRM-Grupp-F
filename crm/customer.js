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


addButton.on("click", function() {
    console.log("New Customer added");
    customerName = customerNameSelect.val();
    phone = phoneSelect.val();
    email = emailSelect.val();
    additional = additionalSelect.val();
    console.log(customerName, phone, email, additional);
    
    addCustomerToTableArray(customerName, phone, email, additional);

    printCustomerToTable(customerName, phone, email);

    console.log(customerTableArray);
    addButton.attr("data-dismiss", "modal");
    customerNameSelect.val("");
    phoneSelect.val("");
    emailSelect.val("");
    additionalSelect.val("");
});




function addCustomerToTableArray(fullname, phone, email, additional){
    let objC = {
        name: fullname,
        phoneNr: phone,
        mail: email,
        information: additional
    };

    customerTableArray.push(objC);
}

function printCustomerToTable(name, phone, email) {
    $("#customerTbody").append("<tr id='cID" + (customerTableArray.length) + "'>" + "<th scope='row'>" + (customerTableArray.length) + "</th>" + "<td class='cName'>" + name +"</td>" + "<td class='cPhone'>" + phone +"</td>" + "<td class='cMail'>" + email +"</td>" + "</tr>");
    
    // let trow = document.createElement("tr");
    // let tRowNumber = document.createElement("th");
    // let n = document.createElement("td");
    // n.classList.add("fullname");
    // let p = document.createElement("td");
    // let e = document.createElement("td");
    // let more = document.createElement("td")
    // tRowNumber = customerTableArray.length;
    // n.innerText = first + " " + last
    // p.innerText = phone;
    // e.innerText = email;
    // trow.append(tRowNumber, n, p, e);
    // tbodySelect.append(trow)
}


//Click/selected customer
$("#customerTbody").on("click", "tr", function() {
    $(this).attr("data-toggle", "modal");
    $(this).attr("data-target", "#editNewContactWindow");
    $(this).attr("data-picked", "true");
    $("#customerNameVal").val($(this).children(".cName").text());
    $("#customerPhoneVal").val($(this).children(".cPhone").text());
    $("#customerEmailVal").val($(this).children(".cMail").text());
    info = $.grep(customerTableArray, function(e) {
        return e.name == $("#customerNameVal").val();
    });
    console.log(info);
    $("#customerAdditionalVal").val(info[0].information);

    // Remove selected contact
    $("#removeContactButton").on("click", function() {
        for(var i = 0; i < customerTableArray.length; i++) {
            if(customerTableArray[i].information == info.information) {
                customerTableArray.splice(i, 1);
                break;
            }
        }
       info = "";
        console.log(customerTableArray);
        $(this).attr("data-dismiss", "modal");
        $("tr[data-picked='true']").remove();

    });
    $("#editContactButton").on("click", function() {
        for(var i = 0; i < customerTableArray.length; i++) {
            if(customerTableArray[i].name == info.name) {
                let tmp = {
                    name: $("#customerNameVal").val(),
                    phoneNr: $("#customerPhoneVal").val(),
                    mail: $("#customerEmailVal").val(),
                    information: $("#customerAdditionalVal").val()
                };
                customerTableArray.splice(i, 1);
                customerTableArray.push(tmp);
                break;
            }
        }
        info = "";
        console.log(customerTableArray);
        $(this).attr("data-dismiss", "modal");
        $("tr[data-picked='true']").attr("data-picked", "false")
    });
})


