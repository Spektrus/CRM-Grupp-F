let historyName;
let historyCompany;
let historyDate;
let historyEvent;
let historyTableArray= []





$.ajax({
    method: "GET",
    url: "https://5db6da6bf6869d001474a972.mockapi.io/api/crm/costumer"
  })
    .done(function( data ) {
     
      for(let i = 0; i < data.length; i++){
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
          $("#historyTbody").append("<tr id='cID" + i + "' data-toggle='tooltip' data-placement='bottom' title=''>" + "<th scope='row'>" + i + "</th>" + "<td class='cName'>" + historyTableArray[i].name + "</td>" + "<td d-none d-lg-table-cell'>" + historyTableArray[i].company + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + historyTableArray[i].event + "</td>"  + "<td class='cMail d-none d-sm-table-cell'>" + historyTableArray[i].date + "</td>" + "</tr>");
      }
      $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
      });
  }

  function addHistoryToTableArray(name,Company, date, Event) {
    let objC = {
        name: name,
        company: Company,
        date: date,
        event: Event
    };

    historyTableArray.push(objC);
}
    

