var editMode = 'create';

var opportunities;

function renderOpportunitiesTable()
{
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        
        opportunities = JSON.parse(event.target.responseText);
        
        var table = document.getElementById('opportunitiesTable');
        table.tBodies[0].remove();
        tBody = table.createTBody();
    
        for(var opportunity of opportunities)
        {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = opportunity.Oid;
            row.insertCell(1).innerHTML = opportunity.Oname;
            row.insertCell(2).innerHTML = opportunity.Opartner;
            row.insertCell(3).innerHTML = opportunity.Odistributor;
            row.insertCell(4).innerHTML = opportunity.Ostage;
            row.insertCell(5).innerHTML = opportunity.Oclosedate.slice(0,10);
            row.insertCell(6).innerHTML = opportunity.Oamount;
            row.insertCell(7).innerHTML = '<a href="#" onclick="updateOpportunity(\'' + opportunity.Oid + '\')">Update</a> | <a href="#" onclick="deleteOpportunity(\'' + opportunity.Oid + '\')">Delete</a>';
        }

    });

    req.open('GET', 'http://localhost:3000/opportunity');
    req.send();    
}

function updateOpportunity(Oid)
{
    console.log('updateOpportunity: ' + Oid);

    for(var opportunity of opportunities)
    {
        if(opportunity.Oid == Oid)
        {
            document.getElementById('Oid').value = opportunity.Oid;
            document.getElementById('Oname').value = opportunity.Oname;
            document.getElementById('Opartner').value = opportunity.Opartner;
            document.getElementById('Odistributor').value = opportunity.Odistributor;
            document.getElementById('Ostage').value = opportunity.Ostage;
            document.getElementById('Oclosedate').value = opportunity.Oclosedate.slice(0,10);
            document.getElementById('Oamount').value = opportunity.Oamount;

            document.getElementById('Oid').readOnly = true;

            editMode = 'update';

            break;
        }
    }
}



function deleteOpportunity(Oid)
{
    console.log('deleteOpportunity: ' + Oid);

    if(confirm('Confirm delete opportunity ' + Oid + '?'))
    {
        var i;

        for(i = 0; i < opportunities.length; i++)
        {
            if(opportunities[i].Oid == Oid)
            {
                break;
            }
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', renderOpportunitiesTable);
        req.open("DELETE", 'http://localhost:3000/opportunity?Oid=' + opportunities[i].Oid);
        req.send();
    }
}



function createUpdateOpportunity()
{
    console.log('createUpdateOpportunity: ');

    var Oid = document.getElementById('Oid').value;
    var Oname = document.getElementById('Oname').value;
    var Opartner = document.getElementById('Opartner').value;
    var Odistributor = document.getElementById('Odistributor').value;
    var Ostage = document.getElementById('Ostage').value;
    var Oclosedate = document.getElementById('Oclosedate').value;
    var Oamount = document.getElementById('Oamount').value;
    var opportunity = {'Oid':Oid, 'Oname':Oname, 'Opartner':Opartner, 'Odistributor':Odistributor, 'Ostage':Ostage, 'Oclosedate':Oclosedate, 'Oamount':Oamount};

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderOpportunitiesTable);

    if(editMode == 'create')
    {                    
        req.open("PUT", 'http://localhost:3000/opportunity');        
    }
    else if(editMode == 'update')
    {
        req.open("POST", 'http://localhost:3000/opportunity');        
    }
    
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(opportunity));

    editMode = 'create';
    
    return false;
}