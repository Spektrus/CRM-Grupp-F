class CRM {
    constructor() {
        this.username = "admin";
        this.password = "admin";
    }

    createCustomers(amount) {
        $.ajax({
            url: "https://randomuser.me/api?results="+amount+"",
            dataType: 'json',
            success: function (data) {
                let customers = data.results;
                console.log(data.results);
                return customers;
            }
        });
        
    }

}

CRM = new CRM();
CRM.createCustomers(10);