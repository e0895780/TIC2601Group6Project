var editMode = 'create';

var quotation;



function renderQuotationTable()
{
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        
        quotation = JSON.parse(event.target.responseText);
        
        var table = document.getElementById('quotationTable');
        table.tBodies[0].remove();
        tBody = table.createTBody();
    
        for(var quote of quotation)
        {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = quote.OrderID;
            row.insertCell(1).innerHTML = quote.ProductName;
            row.insertCell(2).innerHTML = quote.Client;
            row.insertCell(3).innerHTML = quote.Price;
            row.insertCell(4).innerHTML = quote.Quantity;
            row.insertCell(4).innerHTML = quote.Discount;
            row.insertCell(4).innerHTML = quote.OrderDate;
            row.insertCell(4).innerHTML = quote.Status;
            row.insertCell(5).innerHTML = '<a href="#" onclick="updateQuotation(\'' + quote.OrderID + '\')">Update</a> | <a href="#" onclick="deleteQuotation(\'' + quote.OrderID + '\')">Delete</a>';
        }

    });

    req.open('GET', 'http://localhost:3001/quotation');
    req.send();    
}



function updateQuotation(OrderID)
{
    console.log('updateQuotation: ' + OrderID);

    for(var quote of quotation)
    {
        if(quote.OrderID == OrderID)
        {
            document.getElementById('OrderID').value = quote.OrderID;
            document.getElementById('ProductName').value = quote.ProductName;
            document.getElementById('Client').value = quote.Client;
            document.getElementById('Price').value = quote.Price;
            document.getElementById('Quantity').value = quote.Quantity;
            document.getElementById('Discount').value = quote.Discount;
            document.getElementById('OrderDate').value = quote.OrderDate;
            document.getElementById('Status').value = quote.Status;

            document.getElementById('OrderID').readOnly = true;

            editMode = 'update';

            break;
        }
    }
}



function deleteQuotation(OrderID)
{
    console.log('deleteQuotation: ' + OrderID);

    if(confirm('Confirm delete quotation ' + OrderID + '?'))
    {
        var i;

        for(i = 0; i < quotation.length; i++)
        {
            if(quotation[i].OrderID == OrderID)
            {
                break;
            }
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', renderBooksTable);
        req.open("DELETE", 'http://localhost:3001/quotation?OrderID=' + quotation[i].OrderID);
        req.send();
    }
}



function createUpdateQuotation()
{
    console.log('createUpdateQuotation: ');

    var OrderID = document.getElementById('OrderID').value;
    var ProductName = document.getElementById('ProductName').value;
    var Client = document.getElementById('Client').value;
    var Price = document.getElementById('Price').value;
    var Quantity = document.getElementById('Quantity').value;
    var Discount = document.getElementById('Discount').value;
    var OrderDate = document.getElementById('OrderDate').value;
    var Status = document.getElementById('Status').value;
    var quote = {'OrderID':OrderID, 'ProductName':ProductName, 'Client':Client, 'Price':Price, 'Quantity':Quantity
    , 'Discount':Discount, 'OrderDate':OrderDate, 'Status':Status};

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderQuotationTable);

    if(editMode == 'create')
    {                    
        req.open("PUT", 'http://localhost:3001/quotation');        
    }
    else if(editMode == 'update')
    {
        req.open("POST", 'http://localhost:3001/quotation');        
    }
    
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(quote));

    editMode = 'create';
    
    return false;
}