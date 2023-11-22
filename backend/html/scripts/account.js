var editMode = 'create';

var accounts;



function renderAccountsTable()
{
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        
        accounts = JSON.parse(event.target.responseText);
        
        var table = document.getElementById('accountsTable');
        table.tBodies[0].remove();
        tBody = table.createTBody();
    
        for(var account of accounts)
        {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = account.AID;
            row.insertCell(1).innerHTML = account.Aname;   
            row.insertCell(2).innerHTML = account.Atype;
            row.insertCell(3).innerHTML = '<a href="#" onclick="updateAccount(\'' + account.AID + '\')">Update</a> | <a href="#" onclick="deleteAccount(\'' + account.AID + '\')">Delete</a>';
        }

    });

    req.open('GET', 'http://localhost:3000/account');
    req.send();    
}



function updateAccount(AID)
{
    console.log('updateAccount: ' + AID);

    for(var account of accounts)
    {
        if(account.AID == AID)
        {
            document.getElementById('AID').value = account.AID;
            document.getElementById('Aname').value = account.Aname;
            document.getElementById('Atype').value = account.Atype;
            

            document.getElementById('AID').readOnly = true;

            editMode = 'update';

            break;
        }
    }
}



function deleteAccount(AID)
{
    console.log('deleteAccount: ' + AID);

    if(confirm('Confirm delete account ' + AID + '?'))
    {
        var i;

        for(i = 0; i < accounts.length; i++)
        {
            if(accounts[i].AID == AID)
            {
                break;
            }
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', renderAccountsTable);
        req.open("DELETE", 'http://localhost:3000/account?AID=' + accounts[i].AID);
        req.send();
    }
}



function createUpdateAccount()
{
    console.log('createUpdateAccount: ');

    var AID = document.getElementById('AID').value;
    var Aname = document.getElementById('Aname').value;
    var Atype = document.getElementById('Atype').value;
   
    var account = {'AID':AID, 'Aname':Aname, 'Atype':Atype};

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderAccountsTable);

    if(editMode == 'create')
    {                    
        req.open("PUT", 'http://localhost:3000/account');        
    }
    else if(editMode == 'update')
    {
        req.open("POST", 'http://localhost:3000/account');        
    }
    
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(account));

    editMode = 'create';
    
    return false;
}