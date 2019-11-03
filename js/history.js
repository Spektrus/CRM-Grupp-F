let historyName;
let historyCompany;
let historyDate;
let historyEvent;
let historyTableArray = []





$.ajax({
  method: "GET",
  url: "https://5db6da6bf6869d001474a972.mockapi.io/api/crm/costumer"
})
  .done(function (data) {

    for (let i = 0; i < data.length; i++) {
      historyName = data[i].name;
      historyCompany = data[i].Company;
      historyDate = data[i].date;
      historyEvent = data[i].Event;

      addHistoryToTableArray(historyName, historyCompany, historyDate, historyEvent);

      printHistory();

    }



  });


console.log();


function printHistory(name, Company, date, Event) {

  $("#historyTbody").empty();
  for (let i = 0; i < historyTableArray.length; i++) {
    $("#historyTbody").append("<tr id='cID" + i + "' data-toggle='tooltip' data-placement='bottom' title=''>" + "<th scope='row'>" + (i+1) + "</th>" + "<td class='cName'>" + historyTableArray[i].name + "</td>" + "<td d-none d-lg-table-cell'>" + historyTableArray[i].company + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + historyTableArray[i].event + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + historyTableArray[i].date + "</td>" + "</tr>");
  }
 
}

function addHistoryToTableArray(name, Company, date, Event) {
  let objC = {
    name: name,
    company: Company,
    date: date,
    event: Event
  };

  historyTableArray.push(objC);
}

function addDealToHistory() {

  

    let dealname = document.getElementById("deal_name").value;
    let dealcompany = document.getElementById("deal_company").value;
    let deal_deal = document.getElementById("deal_deal").value;
    let deal_date = document.getElementById("deal_date").value;

    //console.log(dealname + "" , dealcompany + deal_deal+ deal_date);


    if (dealname == "" || dealcompany == "" || deal_deal == "") {

      $(".hidden").addClass("show").fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

      //alert("No input!")
      //return;

    } else {

      let objD = {
        name: dealname,
        company: dealcompany,
        event: deal_deal,
        date: deal_date

      };

      historyTableArray.push(objD);// pushar upp det nya objektet i arreyen med alla objekt
      printHistory();//Skirver ut objektet från arrayen
      resetForm(); // kallar på funktionen som tömmer inputfälten

    }

    console.log(historyTableArray);

}

function resetForm() {

  document.getElementById("myForm").reset();

}

