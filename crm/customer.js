const addButton = document.getElementById("addContactButton");
const firstNameSelect = document.getElementById("customerFirstNameInput");
const lastNameSelect = document.getElementById("customerLastNameInput");
const phoneSelect = document.getElementById("customerPhoneInput");
const emailSelect = document.getElementById("customerEmailInput");
const additionalSelect = document.getElementById("customerAdditionalInput");
const tbodySelect = document.getElementById("customerTbody");

let customerTableArray = [];

addButton.addEventListener("click", e => {
    console.log("New Customer added");
    let firstName = firstNameSelect.value;
    let lastName = lastNameSelect.value;
    let phone = phoneSelect.value;
    let email = emailSelect.value;
    let additional = additionalSelect.value;
    console.log(firstName, lastName, phone, email, additional);


    addCustomerToTableArray(firstName, lastName, phone, email, additional);

    printCutomerToTable(firstName, lastName, phone, email);

    console.log(customerTableArray);
    addButton.setAttribute("data-dismiss", "modal");
    firstNameSelect.value = "";
    lastNameSelect.value = "";
    phoneSelect.value = "";
    emailSelect.value = "";
    additionalSelect.value = "";
});




function addCustomerToTableArray(first, last, phone, email, additional){
    objC = {
        name: (first + " " + last),
        phoneNr: phone,
        mail: email,
        information: additional
    }

    customerTableArray.push(objC);
}

function printCutomerToTable(first, last, phone, email) {
    let trow = document.createElement("tr");
    let tRowNumber = document.createElement("th");
    let n = document.createElement("td");
    let p = document.createElement("td");
    let e = document.createElement("td");
    n.innerText = first + " " + last
    p.innerText = phone;
    e.innerText = email;
    trow.append(tRowNumber, n, p, e);
    tbodySelect.append(trow)
}