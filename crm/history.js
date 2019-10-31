let costumer1;
let costumer2;
let costumer3;
let costumer4;
let costumer5;

const addButton = $("#addContactButton");
const customerNameSelect = $("#customerNameInput");
const phoneSelect = $("#customerPhoneInput");
const emailSelect = $("#customerEmailInput");
const additionalSelect = $("#customerAdditionalInput");
const tbodySelect = $("#customerTbody");




$.ajax({
    method: "GET",
    url: "https://5db6da6bf6869d001474a972.mockapi.io/api/crm/costumer"
  })
    .done(function( data ) {
        
      customer1 = data[0]
      customer2 = data[1]
      customer3 = data[2]
      customer4 = data[3]
      customer5 = data[4]
      console.log(data);


      
      //CustomerName
      document.getElementById("name_1").innerHTML = customer1.name;
      document.getElementById("name_2").innerHTML = customer2.name;
      document.getElementById("name_3").innerHTML = customer3.name;
      document.getElementById("name_4").innerHTML = customer4.name;
      document.getElementById("name_5").innerHTML = customer5.name;
      //Costumercompany
      document.getElementById("company_1").innerHTML = customer1.Company;
      document.getElementById("company_2").innerHTML = customer2.Company;
      document.getElementById("company_3").innerHTML = customer3.Company;
      document.getElementById("company_4").innerHTML = customer4.Company;
      document.getElementById("company_5").innerHTML = customer5.Company;


    });
