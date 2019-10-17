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

CRM = new CRM();
CRM.createCustomers(10);

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    })
    
})