let historyName;
let historyCompany;
let historyDate;
let historyEvent;
let historyPeople= []





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


        
         historyPeople.push(historyName, historyCompany, historyDate, historyEvent);
         
       
      }
      //historyPeople = data;

    
      
      printHistory();
    
    });

   

    console.log(historyPeople);
    
 
    function printHistory() {
      
      $("#historyTbody").empty();
      for (let i = 0; i < historyPeople.length; i++) {
          $("#historyTbody").append("<tr id='cID" + i + "' data-toggle='tooltip' data-placement='bottom'" + "<th scope='row'>" + historyPeople[i] + "</th>" + "<td>" + historyPeople[i].historyName + "</td>" + "<td  d-none d-lg-table-cell'>" + historyPeople[i].historyCompany + "</td>" + "<td d-none d-sm-table-cell'>" + historyPeople[i].historyEvent + "</td>" +  + "<td>" + historyPeople[i].historyEvent+ "</td>" +  + "<td>" + historyPeople[i].historyDate+ "</td>" + "</tr>");
      }
      $('[data-toggle="tooltip"]').tooltip({
          trigger: 'hover'
      });
  }
    

