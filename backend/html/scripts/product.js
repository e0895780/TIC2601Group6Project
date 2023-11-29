var editMode = 'create';

var products;



function renderProductsTable()
{
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        
        products = JSON.parse(event.target.responseText);
        
        var table = document.getElementById('productsTable');
        table.tBodies[0].remove();
        tBody = table.createTBody();
    
        for(var product of products)
        {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = product.PSKUID;
            row.insertCell(1).innerHTML = product.PDescription;
            row.insertCell(2).innerHTML = product.PProductName;
            row.insertCell(3).innerHTML = product.PBrand;
            row.insertCell(4).innerHTML = product.PManufacturingDate;
            row.insertCell(5).innerHTML = product.PExpireDate;
            row.insertCell(6).innerHTML = product.PDimensionalWeight;
            row.insertCell(7).innerHTML = product.PCategory;
            row.insertCell(8).innerHTML = product.PStockQuantity;
            row.insertCell(9).innerHTML = product.AccountAID;
            row.insertCell(10).innerHTML = product.QOrid;
            row.insertCell(11).innerHTML = product.OId;            
            row.insertCell(12).innerHTML = '<a href="#" onclick="updateProduct(\'' + product.PSKUID + '\')">Update</a> | <a href="#" onclick="deleteProduct(\'' + product.PSKUID + '\')">Delete</a>';
        }

    });

    req.open('GET', 'http://localhost:3001/product');
    req.send();    
}



function updateProduct(PSKUID)
{
    console.log('updateProduct: ' + PSKUID);

    for(var product of products)
    {
        if(product.PSKUID == PSKUID)
        {
            document.getElementById('PSKUID').value = product.PSKUID;
            document.getElementById('PDescription').value = product.PDescription;
            document.getElementById('PProductName').value = product.PProductName;
            document.getElementById('PBrand').value = product.PBrand;
            document.getElementById('PManufacturingDate').value = product.PManufacturingDate;
            document.getElementById('PExpireDate').value = product.PExpireDate;
            document.getElementById('PDimensionalWeight').value = product.PDimensionalWeight;
            document.getElementById('PCategory').value = product.PCategory;
            document.getElementById('PStockQuantity').value = product.PStockQuantity;
            document.getElementById('AccountAID').value = product.AccountAID;
            document.getElementById('QOrid').value = product.QOrid;
            document.getElementById('OId').value = product.OId;
            
            document.getElementById('PSKUID').readOnly = true;

            editMode = 'update';

            break;
        }
    }
}



function deleteProduct(PSKUID)
{
    console.log('deleteProduct: ' + PSKUID);

    if(confirm('Confirm delete product ' + PSKUID + '?'))
    {
        var i;

        for(i = 0; i < products.length; i++)
        {
            if(products[i].PSKUID == PSKUID)
            {
                break;
            }
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', renderProductsTable);
        req.open("DELETE", 'http://localhost:3001/product?PSKUID=' + products[i].PSKUID);
        req.send();
    }
}



function createUpdateProduct()
{
    console.log('createUpdateProduct: ');

    var PSKUID = document.getElementById('PSKUID').value;
    var PDescription = document.getElementById('PDescription').value;
    var PProductName = document.getElementById('PProductName').value;
    var PBrand = document.getElementById('PBrand').value;
    var PManufacturingDate = document.getElementById('PManufacturingDate').value;
    var PExpireDate = document.getElementById('PExpireDate').value;
    var PDimensionalWeight = document.getElementById('PDimensionalWeight').value;
    var PCategory = document.getElementById('PCategory').value;
    var PStockQuantity = document.getElementById('PStockQuantity').value;
    var AccountAID = document.getElementById('AccountAID').value;
    var QOrid = document.getElementById('QOrid').value;
    var OId = document.getElementById('OId').value;
    
   
    var product = {
        'PSKUID': PSKUID, 
        'PDescription': PDescription, 
        'PProductName': PProductName, 
        'PBrand': PBrand, 
        'PManufacturingDate': PManufacturingDate, 
        'PExpireDate': PExpireDate, 
        'PDimensionalWeight': PDimensionalWeight, 
        'PCategory': PCategory, 
        'PStockQuantity': PStockQuantity, 
        'AccountAID': AccountAID, 
        'QOrid': QOrid, 
        'OId': OId
    };

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderProductsTable);

    if(editMode == 'create')
    {                    
        req.open("PUT", 'http://localhost:3001/product');        
    }
    else if(editMode == 'update')
    {
        req.open("POST", 'http://localhost:3001/product');        
    }
    
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(product));

    editMode = 'create';
    
    return false;
}