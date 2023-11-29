import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { ProductToEditContext } from '../contexts/ProductToEditContext';

import InputAccountAID from "../components/product/InputAccountAID"
import InputOId from "../components/product/InputOId"
import InputPBrand from "../components/product/InputPBrand"
import InputPCategory from "../components/product/InputPCategory"
import InputPDescription from "../components/product/InputPDescription"
import InputPDimensionalWeight from "../components/product/InputPDimensionalWeight"
import InputPDate from "../components/product/InputPDate"
import InputPProductName from "../components/product/InputPProductName"
import InputPSKUID from "../components/product/InputPSKUID"
import InputPStockQuantity from "../components/product/InputPStockQuantity"
import InputQOrid from "../components/product/InputQOrid"

axios.defaults.headers.put['Content-Type'] = 'application/json';

function InputFormProduct() {

    const{
        editMode, setEditMode, 
        products, setProducts,
        PSKUIDToEdit, setPSKUIDToEdit,
        PDescriptionToEdit, setPDescriptionToEdit,
        PProductNameToEdit, setPProductNameToEdit,
        PBrandToEdit, setPBrandToEdit,
        PManufacturingDateToEdit, setPManufacturingDateToEdit,
        PExpireDateToEdit, setPExpireDateToEdit,
        PDimensionalWeightToEdit, setPDimensionalWeightToEdit,
        PCategoryToEdit, setPCategoryToEdit,
        PStockQuantityToEdit, setPStockQuantityToEdit,
        AccountAIDToEdit, setAccountAIDToEdit,
        QOridToEdit, setQOridToEdit,
        OIdToEdit, setOIdToEdit, 
        reloadProducts, setReloadProducts
    } = useContext(ProductToEditContext);

    function resetInputState() {
        setPSKUIDToEdit('')
        setPDescriptionToEdit('')
        setPProductNameToEdit('')
        setPBrandToEdit('')
        setPManufacturingDateToEdit('')
        setPExpireDateToEdit('')
        setPDimensionalWeightToEdit('')
        setPCategoryToEdit('')
        setPStockQuantityToEdit('')
        setAccountAIDToEdit('')
        setQOridToEdit('')
        setOIdToEdit('')
    }

    function processForm() {


        if (editMode === 'create') {

            var newProduct = { 'PSKUID': PSKUIDToEdit, 'PDescription': PDescriptionToEdit, 'PProductName': PProductNameToEdit, 'PBrand': PBrandToEdit, 'PManufacturingDate': PManufacturingDateToEdit, 'PExpireDate': PExpireDateToEdit, 'PDimensionalWeight': PDimensionalWeightToEdit, 'PCategory': PCategoryToEdit, 'PStockQuantity': PStockQuantityToEdit, 'AccountAID': AccountAIDToEdit, 'QOrid': QOridToEdit, 'OId': OIdToEdit }
            axios.put('http://localhost:3001/product',newProduct).then((response)=>{
                resetInputState();
                setReloadProducts(!reloadProducts)
            })
            
        }
        else if (editMode === 'edit') {

            var productToEdit = { 'PSKUID': PSKUIDToEdit, 'PDescription': PDescriptionToEdit, 'PProductName': PProductNameToEdit, 'PBrand': PBrandToEdit, 'PManufacturingDate': PManufacturingDateToEdit, 'PExpireDate': PExpireDateToEdit, 'PDimensionalWeight': PDimensionalWeightToEdit, 'PCategory': PCategoryToEdit, 'PStockQuantity': PStockQuantityToEdit, 'AccountAID': AccountAIDToEdit, 'QOrid': QOridToEdit, 'OId': OIdToEdit }
            axios.post('http://localhost:3001/product',productToEdit).then((response)=>{
                resetInputState();
                setReloadProducts(!reloadProducts)
                setEditMode('create')
            })

        }


    }

    return (
        <>
            <h3>Create/Update Product</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                    <td><b>SKU ID</b></td>
                        <td>
                            <InputPSKUID label='SKU ID' value={PSKUIDToEdit} setValue={setPSKUIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Description</b></td>
                        <td>
                            <InputPDescription label='Description' value={PDescriptionToEdit} setValue={setPDescriptionToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Product Name</b></td>
                        <td>
                            <InputPProductName label='Product Name' value={PProductNameToEdit} setValue={setPProductNameToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Brand</b></td>
                        <td>
                            <InputPBrand label='Brand' value={PBrandToEdit} setValue={setPBrandToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Manufacturing Date</b></td>
                        <td>
                            <InputPDate minDate='1990-01-01' maxDate='2099-12-31' value={PManufacturingDateToEdit} setValue={setPManufacturingDateToEdit} />  
                        </td>
                    </tr>
                    <tr>
                        <td><b>Expire Date</b></td>
                        <td>
                            <InputPDate minDate='1990-01-01' maxDate='2099-12-31' value={PExpireDateToEdit} setValue={setPExpireDateToEdit} /> 
                        </td>
                    </tr>
                    <tr>
                        <td><b>Dimensional Weight</b></td>
                        <td>
                            <InputPDimensionalWeight label='Dimensional Weight' value={PDimensionalWeightToEdit} setValue={setPDimensionalWeightToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Category</b></td>
                        <td>
                            <InputPCategory label='Category' value={PCategoryToEdit} setValue={setPCategoryToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Stock Quantity</b></td>
                        <td>
                            <InputPStockQuantity label='Stock Quantity' value={PStockQuantityToEdit} setValue={setPStockQuantityToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Account ID</b></td>
                        <td>
                            <InputAccountAID label='Account ID' value={AccountAIDToEdit} setValue={setAccountAIDToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Quotation ID</b></td>
                        <td>
                            <InputQOrid label='Quotation ID' value={QOridToEdit} setValue={setQOridToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Opportunity ID</b></td>
                        <td>
                            <InputOId label='Opportunity ID' value={OIdToEdit} setValue={setOIdToEdit} />   
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

function TableRowsProducts() {
    const{
        editMode, setEditMode, 
        products, setProducts,
        PSKUIDToEdit, setPSKUIDToEdit,
        PDescriptionToEdit, setPDescriptionToEdit,
        PProductNameToEdit, setPProductNameToEdit,
        PBrandToEdit, setPBrandToEdit,
        PManufacturingDateToEdit, setPManufacturingDateToEdit,
        PExpireDateToEdit, setPExpireDateToEdit,
        PDimensionalWeightToEdit, setPDimensionalWeightToEdit,
        PCategoryToEdit, setPCategoryToEdit,
        PStockQuantityToEdit, setPStockQuantityToEdit,
        AccountAIDToEdit, setAccountAIDToEdit,
        QOridToEdit, setQOridToEdit,
        OIdToEdit, setOIdToEdit, 
        reloadProducts, setReloadProducts
    } = useContext(ProductToEditContext);

    useEffect(
        () => {
            axios.get('http://localhost:3001/product').then((response) => {
                setProducts(response.data);
            })
        }, [reloadProducts]
    )

    function updateProduct(event, PSKUID) {
        setEditMode('edit')

        var product = products.find(product => product.PSKUID === PSKUID)
        setPSKUIDToEdit(product.PSKUID)
        setPDescriptionToEdit(product.PDescription)
        setPProductNameToEdit(product.PProductName)
        setPBrandToEdit(product.PBrand)
        setPManufacturingDateToEdit(product.PManufacturingDate)
        setPExpireDateToEdit(product.PExpireDate)
        setPDimensionalWeightToEdit(product.PDimensionalWeight)
        setPCategoryToEdit(product.PCategory)
        setPStockQuantityToEdit(product.PStockQuantity)
        setAccountAIDToEdit(product.AccountAID)
        setQOridToEdit(product.QOrid)
        setOIdToEdit(product.OId)
    }

    function deleteProduct(event, PSKUID) {
        axios.delete('http://localhost:3001/product', { params: { 'PSKUID': PSKUID } }).then((response) => {
            setReloadProducts(!reloadProducts)
        })
    }

    return (
        <>
            {products.map(
                product =>
                    <tr key={product.PSKUID}>
                        <td>{product.PSKUID}</td><td>{product.PDescription}</td><td>{product.PProductName}</td><td>{product.PBrand}</td><td>{product.PManufacturingDate}</td><td>{product.PExpireDate}</td><td>{product.PDimensionalWeight}</td><td>{product.PCategory}</td><td>{product.PStockQuantity}</td><td>{product.AccountAID}</td><td>{product.QOrid}</td><td>{product.OId}</td>
                        <td>
                            <Link onClick={event => updateProduct(event, product.PSKUID)}>Update</Link> |
                            <Link onClick={event => deleteProduct(event, product.PSKUID)}>Delete</Link> 
                        </td>
                    </tr>
            )}
        </>
    )
}


function TableProducts() {

    return (
        <>
            <h3>View All Products</h3>

            <table id={'productsTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>SKU ID</th>
                        <th>Description</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Manufacturing Date</th>
                        <th>Expire Date</th>
                        <th>Dimensional Weight</th>
                        <th>Category</th>
                        <th>Stock Quantity</th>
                        <th>Account ID</th>
                        <th>Quotation ID</th>
                        <th>Opportunity ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsProducts />
                </tbody>
            </table>
        </>
    )
}

export default function Product() {

    const [editMode, setEditMode] = useState('create')
    const [products, setProducts] = useState([]);

    const [PSKUIDToEdit, setPSKUIDToEdit] = useState('')
    const [PDescriptionToEdit, setPDescriptionToEdit] = useState('')
    const [PProductNameToEdit, setPProductNameToEdit] = useState('')
    const [PBrandToEdit, setPBrandToEdit] = useState('')
    const [PManufacturingDateToEdit, setPManufacturingDateToEdit] = useState('')
    const [PExpireDateToEdit, setPExpireDateToEdit] = useState('')
    const [PDimensionalWeightToEdit, setPDimensionalWeightToEdit] = useState('')
    const [PCategoryToEdit, setPCategoryToEdit] = useState('')
    const [PStockQuantityToEdit, setPStockQuantityToEdit] = useState('')
    const [AccountAIDToEdit, setAccountAIDToEdit] = useState('')
    const [QOridToEdit, setQOridToEdit] = useState('')
    const [OIdToEdit, setOIdToEdit] = useState('')
    

    const [reloadProducts, setReloadProducts] = useState(true)

    return (
        <>
            <ProductToEditContext.Provider value={{
                editMode, setEditMode,
                products, setProducts,
                PSKUIDToEdit, setPSKUIDToEdit,
                PDescriptionToEdit, setPDescriptionToEdit,
                PProductNameToEdit, setPProductNameToEdit,
                PBrandToEdit, setPBrandToEdit,
                PManufacturingDateToEdit, setPManufacturingDateToEdit,
                PExpireDateToEdit, setPExpireDateToEdit,
                PDimensionalWeightToEdit, setPDimensionalWeightToEdit,
                PCategoryToEdit, setPCategoryToEdit,
                PStockQuantityToEdit, setPStockQuantityToEdit,
                AccountAIDToEdit, setAccountAIDToEdit,
                QOridToEdit, setQOridToEdit,
                OIdToEdit, setOIdToEdit,                
                reloadProducts, setReloadProducts
            }}>

                <div className="row" style={{ width: '100%' }}>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h2 style={{ marginTop: '0px' }}>Product</h2>
                    </div>
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <InputFormProduct />
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <TableProducts />
                </div>
            </ProductToEditContext.Provider>
        </>
    )
};