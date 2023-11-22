import { useState } from 'react';
import { Link } from "react-router-dom";

import InputQOrid from "../components/InputQOrid"
import InputQProductName from "../components/InputQProductName"
import InputQClient from "../components/InputQClient"
import InputQPrice from "../components/InputQPrice"
import InputQQuantity from "../components/InputQQuantity"
import InputQDiscount from "../components/InputQDiscount"
import InputQOrderDate from "../components/InputQOrderDate"
import InputQStatus from "../components/InputQStatus"







/////////////////////////////////////////////////////////////Provides a form for creating and updating quotations./////////////////////////////////////////////////////////////
function InputFormQuotation({ editMode, setEditMode, quotation, setquotation,
    OrderIDToEdit, setOrderIDToEdit, ProductNameToEdit, setProductNameToEdit, ClientToEdit, setClientToEdit, PriceToEdit, setPriceToEdit, 
    QuantityToEdit, setQuantityToEdit, DiscountToEdit, setDiscountToEdit, OrderDateToEdit, setOrderDateToEdit, StatusToEdit, setStatusToEdit }) {

    function processForm() {

        console.log('InputFormQuotation: processForm')

        if (editMode === 'create') {

            var newQuotation = { 'OrderID': OrderIDToEdit, 'ProductName': ProductNameToEdit, 'Client': ClientToEdit, 'Price': PriceToEdit, 'Quantity': QuantityToEdit, 
            'Discount': DiscountToEdit, 'OrderDate': OrderDateToEdit, 'Status': StatusToEdit}
            setquotation(quotation.concat([newQuotation]));
        }
        else if (editMode === 'edit') {

            var quotation = quotation.find(quotation => quotation.OrderID === OrderIDToEdit)
            quotation.OrderID = OrderIDToEdit
            quotation.ProductName = ProductNameToEdit
            quotation.Client = ClientToEdit
            quotation.Price = PriceToEdit
            quotation.Quantity = QuantityToEdit
            quotation.Discount = DiscountToEdit
            quotation.OrderDate = OrderDateToEdit
            quotation.Status = StatusToEdit

            setEditMode('create')
        }

        setOrderIDToEdit('')
        setProductNameToEdit('')
        setClientToEdit('')
        setPriceToEdit('')
        setQuantityToEdit('')
        setDiscountToEdit('')
        setOrderDateToEdit('')
        setStatusToEdit('')
    }

    return (
        <>
            <h3>Create/Update Quotation</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Oid</b></td>
                        <td>
                            <InputQOrid label='OrderID' value={OrderIDToEdit} setValue={setOrderIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>ProductName</b></td>
                        <td>
                            <InputQProductName label='ProductName' value={ProductNameToEdit} setValue={setProductNameToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Client</b></td>
                        <td>
                            <InputQClient label='Client' value={ClientToEdit} setValue={setClientToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Price</b></td>
                        <td>
                            <InputQPrice label='Price' value={PriceToEdit} setValue={setPriceToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Quantity</b></td>
                        <td>
                            <InputQQuantity label='Quantity' value={QuantityToEdit} setValue={setQuantityToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Discount</b></td>
                        <td>
                            <InputQDiscount label='Discount' value={DiscountToEdit} setValue={setDiscountToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>OrderDate</b></td>
                        <td>
                            <InputQOrderDate minDate='1990-01-01' maxDate='2050-12-31' value={OrderDateToEdit} setValue={setOrderDateToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Status</b></td>
                        <td>
                            <InputQStatus value={StatusToEdit} setValue={setStatusToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={'2'} style={{ textAlign: 'center' }}>
                            <input type={'reset'} value={'Clear'} />
                            <input type={'button'} value='Create/Update' onClick={processForm} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}









/////////////////////////////////////////////////////////////Generates rows in the quotations table/////////////////////////////////////////////////////////////
function TableRowsQuotation({ editMode, setEditMode, quotation, setquotation,
    OrderIDToEdit, setOrderIDToEdit, ProductNameToEdit, setProductNameToEdit, ClientToEdit, setClientToEdit, PriceToEdit, setPriceToEdit, 
    QuantityToEdit, setQuantityToEdit, DiscountToEdit, setDiscountToEdit, OrderDateToEdit, setOrderDateToEdit, StatusToEdit, setStatusToEdit}) {

    function updateQuotation(event, OrderID) {
        setEditMode('edit')
        console.log('Editing ' + OrderID)

        var quotation = quotation.find(quotation => quotation.OrderID === OrderID)
        setOrderIDToEdit(quotation.OrderID)
        setProductNameToEdit(quotation.ProductName)
        setClientToEdit(quotation.Client)
        setPriceToEdit(quotation.Price)
        setQuantityToEdit(quotation.Quantity)
        setDiscountToEdit(quotation.Discount)
        setOrderDateToEdit(quotation.OrderDate)
        setStatusToEdit(quotation.Status)
    }

    function deleteQuotation(event, OrderID) {
        setquotation(quotation.filter(quotation =>
            quotation.OrderID !== OrderID
        ))
    }

    return (
        <>
            {quotation.map(
                quotation =>
                    <tr key={quotation.OrderID}>
                        <td>{quotation.OrderID}</td><td>{quotation.ProductName}</td><td>{quotation.Client}</td><td>{quotation.Price}</td><td>{quotation.Quantity}</td>
                        <td>{quotation.Discount}</td><td>{quotation.OrderDate}</td><td>{quotation.Status}</td>
                        <td>
                            <Link onClick={event => updateQuotation(event, quotation.OrderID)}>Update</Link> |
                            <Link onClick={event => deleteQuotation(event, quotation.OrderID)}>Delete</Link>
                        </td>
                    </tr>
            )}
        </>
    )
}







/////////////////////////////////////////////////////////////Displays the quotations table header and utilizes TableRowsQuotation to render the rows/////////////////////////////////////////////////////////////
function TableQuotation({ editMode, setEditMode, quotation, setquotation,
    OrderIDToEdit, setOrderIDToEdit, ProductNameToEdit, setProductNameToEdit, ClientToEdit, setClientToEdit, PriceToEdit, setPriceToEdit, 
    QuantityToEdit, setQuantityToEdit, DiscountToEdit, setDiscountToEdit, OrderDateToEdit, setOrderDateToEdit, StatusToEdit, setStatusToEdit }) {

    return (
        <>
            <h3>View All Quotations</h3>

            <table id={'quotationTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>ProductName</th>
                        <th>Client</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>OrderDate</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsQuotation editMode={editMode} setEditMode={setEditMode} 
                        quotation={quotation} setquotation={setquotation}
                        OrderIDToEdit={OrderIDToEdit} setOrderIDToEdit={setOrderIDToEdit}
                        ProductNameToEdit={ProductNameToEdit} setProductNameToEdit={setProductNameToEdit}
                        ClientToEdit={ClientToEdit} setClientToEdit={setClientToEdit}
                        PriceToEdit={PriceToEdit} setPriceToEdit={setPriceToEdit}
                        QuantityToEdit={QuantityToEdit} setQuantityToEdit={setQuantityToEdit}
                        DiscountToEdit={DiscountToEdit} setDiscountToEdit={setDiscountToEdit}
                        OrderDateToEdit={OrderDateToEdit} setOrderDateToEdit={setOrderDateToEdit}
                        StatusToEdit={StatusToEdit} setStatusToEdit={setStatusToEdit}/>
                </tbody>
            </table>
        </>
    )
}







export default function quotation() {

    const [editMode, setEditMode] = useState('create')
    const [quotation, setquotation] = useState([]);
    const [OrderIDToEdit, setOrderIDToEdit] = useState('')
    const [ProductNameToEdit, setProductNameToEdit] = useState('')
    const [ClientToEdit, setClientToEdit] = useState('')
    const [PriceToEdit, setPriceToEdit] = useState('')
    const [QuantityToEdit, setQuantityToEdit] = useState('')
    const [DiscountToEdit, setDiscountToEdit] = useState('')
    const [OrderDateToEdit, setOrderDateToEdit] = useState('')
    const [StatusToEdit, setStatusToEdit] = useState('')

    return (
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Quotation</h2>
                </div>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <InputFormQuotation
                    editMode={editMode} setEditMode={setEditMode} 
                    quotation={quotation} setquotation={setquotation}
                    OrderIDToEdit={OrderIDToEdit} setOrderIDToEdit={setOrderIDToEdit}
                    ProductNameToEdit={ProductNameToEdit} setProductNameToEdit={setProductNameToEdit}
                    ClientToEdit={ClientToEdit} setClientToEdit={setClientToEdit}
                    PriceToEdit={PriceToEdit} setPriceToEdit={setPriceToEdit}
                    QuantityToEdit={QuantityToEdit} setQuantityToEdit={setQuantityToEdit}
                    DiscountToEdit={DiscountToEdit} setDiscountToEdit={setDiscountToEdit}
                    OrderDateToEdit={OrderDateToEdit} setOrderDateToEdit={setOrderDateToEdit}
                    StatusToEdit={StatusToEdit} setStatusToEdit={setStatusToEdit}/>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <TableQuotation 
                    editMode={editMode} setEditMode={setEditMode} 
                    quotation={quotation} setquotation={setquotation}
                    OrderIDToEdit={OrderIDToEdit} setOrderIDToEdit={setOrderIDToEdit}
                    ProductNameToEdit={ProductNameToEdit} setProductNameToEdit={setProductNameToEdit}
                    ClientToEdit={ClientToEdit} setClientToEdit={setClientToEdit}
                    PriceToEdit={PriceToEdit} setPriceToEdit={setPriceToEdit}
                    QuantityToEdit={QuantityToEdit} setQuantityToEdit={setQuantityToEdit}
                    DiscountToEdit={DiscountToEdit} setDiscountToEdit={setDiscountToEdit}
                    OrderDateToEdit={OrderDateToEdit} setOrderDateToEdit={setOrderDateToEdit}
                    StatusToEdit={StatusToEdit} setStatusToEdit={setStatusToEdit}/>
            </div>
        </>
    )
};
