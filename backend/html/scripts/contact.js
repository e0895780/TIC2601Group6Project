var editMode = 'create';

var contacts;



function renderContactsTable()
{
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        
        contacts = JSON.parse(event.target.responseText);
        
        var table = document.getElementById('contactsTable');
        table.tBodies[0].remove();
        tBody = table.createTBody();
    
        for(var contact of contacts)
        {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = contact.AccountAID; 
            row.insertCell(1).innerHTML = contact.Cfname;
            row.insertCell(2).innerHTML = contact.CLname;
            row.insertCell(3).innerHTML = contact.Caddress;
            row.insertCell(4).innerHTML = contact.Cemail;
            row.insertCell(5).innerHTML = contact.Cnumber;
            row.insertCell(6).innerHTML = '<a href="#" onclick="updateContact(\'' + contact.AccountAID + '\')">Update</a> | <a href="#" onclick="deleteContact(\'' + contact.AccountAID + '\')">Delete</a>';
        }

    });

    req.open('GET', 'http://localhost:3001/contact');
    req.send();    
}



function updateAccount(AccountAID)
{
    console.log('updateContact: ' + AccountAID);

    for(var contact of contacts)
    {
        if(contact.AccountAID == AccountAID)
        {
            document.getElementById('AccountAID').value = contact.AccountAID; 
            document.getElementById('Cfname').value = contact.Cfname;
            document.getElementById('CLname').value = contact.CLname;
            document.getElementById('Caddress').value = contact.Caddress;
            document.getElementById('Cemail').value = contact.Cemail;
            document.getElementById('Cnumber').value = contact.Cnumber;

            document.getElementById('AccountAID').readOnly = true;

            editMode = 'update';

            break;
        }
    }
}



function deleteAccount(AccountAID)
{
    console.log('deleteContact: ' + AccountAID);

    if(confirm('Confirm delete contact ' + AccountAID + '?'))
    {
        var i;

        for(i = 0; i < contacts.length; i++)
        {
            if(contacts[i].AccountAID == AccountAID)
            {
                break;
            }
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', renderAccountsTable);
        req.open("DELETE", 'http://localhost:3001/contact?AccountAID=' + accounts[i].AccountAID);
        req.send();
    }
}



function createUpdateContact()
{
    console.log('createUpdateContact: ');

    var AccountAID = document.getElementById('AccountAID').value;
    var Cfname = document.getElementById('Cfname').value;
    var CLname = document.getElementById('CLname').value;
    var Caddress = document.getElementById('Caddress').value;
    var Cemail = document.getElementById('Cemail').value;
    var Cnumber = document.getElementById('Cnumber').value;

    var contact = {
        'AccountAID': AccountAID,
        'Cfname': Cfname,
        'CLname': CLname,
        'Caddress': Caddress,
        'Cemail': Cemail,
        'Cnumber': Cnumber
    };

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderContactsTable);

    if(editMode == 'create')
    {                    
        req.open("PUT", 'http://localhost:3001/contact');        
    }
    else if(editMode == 'update')
    {
        req.open("POST", 'http://localhost:3001/contact');        
    }
    
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(contact));

    editMode = 'create';
    
    return false;
}