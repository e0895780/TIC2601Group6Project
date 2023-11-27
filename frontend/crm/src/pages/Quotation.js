import { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { QuotationToEditContext } from '../contexts/QuotationToEditContext';

import InputQOrid from "../components/InputQOrid"
import InputQProductName from "../components/InputQProductName"
import InputQClient from "../components/InputQClient"
import InputQPrice from "../components/InputQPrice"
import InputQQuantity from "../components/InputQQuantity"
import InputQDiscount from "../components/InputQDiscount"
import InputQOrderDate from "../components/InputQOrderDate"
import InputQStatus from "../components/InputQStatus"


axios.defaults.headers.put['Content-Type'] = 'application/json';




/////////////////////////////////////////////////////////////Provides a form for creating and updating quotations./////////////////////////////////////////////////////////////
function InputFormQuotation(){
    const{
        editMode, setEditMode, 
        quotation, setquotation,
        OrderIDToEdit, setOrderIDToEdit, 
        ProductNameToEdit, setProductNameToEdit, 
        ClientToEdit, setClientToEdit, 
        PriceToEdit, setPriceToEdit, 
        QuantityToEdit, setQuantityToEdit, 
        DiscountToEdit, setDiscountToEdit, 
        OrderDateToEdit, setOrderDateToEdit, 
        StatusToEdit, setStatusToEdit,
        reloadQuotation, setReloadQuotation
    } = useContext(QuotationToEditContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    function resetInputState() {
        setOrderIDToEdit('')
        setProductNameToEdit('')
        setClientToEdit('')
        setPriceToEdit('')
        setQuantityToEdit('')
        setDiscountToEdit('')
        setOrderDateToEdit('')
        setStatusToEdit('')
    }


    function processForm() {

        if (editMode === 'create') {

            var newQuotation = { 
                'OrderID': OrderIDToEdit, 
                'ProductName': ProductNameToEdit, 
                'Client': ClientToEdit, 
                'Price': PriceToEdit, 
                'Quantity': QuantityToEdit, 
                'Discount': DiscountToEdit, 
                'OrderDate': OrderDateToEdit, 
                'Status': StatusToEdit
            }
            axios.put('http://localhost:3001/quotation', newQuotation).then((response) => {
                resetInputState();
                setReloadQuotation(!reloadQuotation)
            })
        }
        else if (editMode === 'edit') {

            var quotationToEdit = {
                'OrderID': OrderIDToEdit, 
                'ProductName': ProductNameToEdit, 
                'Client': ClientToEdit, 
                'Price': PriceToEdit, 
                'Quantity': QuantityToEdit, 
                'Discount': DiscountToEdit, 
                'OrderDate': OrderDateToEdit, 
                'Status': StatusToEdit
            }
            axios.put('http://localhost:3001/quotation', quotationToEdit).then((response) => {
                resetInputState();
                setReloadQuotation(!reloadQuotation)
                setEditMode('create')
            })
        }
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
function TableRowsQuotation(){ 
    
    const {
        editMode, setEditMode, 
        quotation, setquotation,
        OrderIDToEdit, setOrderIDToEdit, 
        ProductNameToEdit, setProductNameToEdit, 
        ClientToEdit, setClientToEdit, 
        PriceToEdit, setPriceToEdit, 
        QuantityToEdit, setQuantityToEdit, 
        DiscountToEdit, setDiscountToEdit, 
        OrderDateToEdit, setOrderDateToEdit, 
        StatusToEdit, setStatusToEdit,
        reloadQuotation, setReloadQuotation
    } = useContext(QuotationToEditContext);

    useEffect(
        () => {
            axios.get('http://localhost:3001/quotation').then((response) => {
                setquotation(response.data);
            })
        }, [reloadQuotation]
    )

    function updateQuotation(event, OrderID) {
        setEditMode('edit')

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
        axios.delete('http://localhost:3001/quotation', { params: { 'Orderid': OrderID } }).then((response) => {
            setReloadQuotation(!reloadQuotation)
        })
    }

    return (
        <>
            {quotation.map(
                quotation =>
                    <tr key={quotation.OrderID}>
                        <td>{quotation.OrderID}</td>
                        <td>{quotation.ProductName}</td>
                        <td>{quotation.Client}</td>
                        <td>{quotation.Price}</td>
                        <td>{quotation.Quantity}</td>
                        <td>{quotation.Discount}</td>
                        <td>{quotation.OrderDate}</td>
                        <td>{quotation.Status}</td>
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
function TableQuotation(){ 

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
                    <TableRowsQuotation />
                </tbody>
            </table>
        </>
    )
}







export default function Quotation() {

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

    const [reloadQuotation, setReloadQuotation] = useState(true)

    return (
        <>
            <QuotationToEditContext.Provider value={{
                editMode, setEditMode, 
                quotation, setquotation,
                OrderIDToEdit, setOrderIDToEdit, 
                ProductNameToEdit, setProductNameToEdit, 
                ClientToEdit, setClientToEdit, 
                PriceToEdit, setPriceToEdit, 
                QuantityToEdit, setQuantityToEdit, 
                DiscountToEdit, setDiscountToEdit, 
                OrderDateToEdit, setOrderDateToEdit, 
                StatusToEdit, setStatusToEdit,

                reloadQuotation, setReloadQuotation
                
            }}>

                <div className="row" style={{ width: '100%' }}>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h2 style={{ marginTop: '0px' }}>Opportunity</h2>
                    </div>
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <InputFormQuotation />
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <TableQuotation/>
                </div>
            </QuotationToEditContext.Provider>
        </>
    )
};
