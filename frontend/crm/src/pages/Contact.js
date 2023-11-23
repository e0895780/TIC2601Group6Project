import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { ContactToEditContext } from '../contexts/ContactToEditContext';

import InputAccountAID from "../components/InputAccountAID"
import InputCfname from "../components/InputCfname"
import InputCLname from "../components/InputCLname"
import InputCaddress from "../components/InputCaddress"
import InputCemail from "../components/InputCemail"
import InputCnumber from "../components/InputCnumber"


axios.defaults.headers.put['Content-Type'] = 'application/json';



function InputFormContact() {

    const{
        editMode, setEditMode, 
        contacts, setContacts,
        AccountAIDToEdit, setAccountAIDToEdit,
        CfnameToEdit, setCfnameToEdit, 
        CLnameToEdit, setCLnameToEdit, 
        CemailToEdit, setCemailToEdit,
        CnumberToEdit, setCnumberToEdit,
        CaddressToEdit, setCaddressToEdit,
        reloadContacts, setReloadContacts

    } = useContext(ContactToEditContext);

    function resetInputState() {
        setAccountAIDToEdit('')
        setCfnameToEdit('')
        setCLnameToEdit('')
        setCemailToEdit('')
        setCnumberToEdit('')
        setCaddressToEdit('')
    }

    function processForm() {
        // check on this
        // var accountId = contacts.AccountId

        if (editMode === 'create') {

            var newContact = { 'AccountAID':AccountAIDToEdit,'Cfname': CfnameToEdit, 'CLname': CLnameToEdit, 'Cemail': CemailToEdit, 'Caddress':CaddressToEdit,'Cnumber':CnumberToEdit }
            axios.put('http://localhost:3001/contact',newContact).then((response)=>{
                resetInputState();
                setReloadContacts(!reloadContacts)
            })
            
        }
        else if (editMode === 'edit') {

            var contactToEdit = {'AccountAID':AccountAIDToEdit,'Cfname': CfnameToEdit, 'CLname': CLnameToEdit, 'Cemail': CemailToEdit, 'Caddress':CaddressToEdit,'Cnumber':CnumberToEdit}
            axios.put('http://localhost:3001/contact',newContact).then((response)=>{
                resetInputState();
                setReloadContacts(!reloadContacts)
                setEditMode('create')
            })

        }


    }

    return (
        <>
            <h3>Create/Update Contact</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>

                    <tr>
                        <td><b>Account ID</b></td>
                        <td>
                            <InputAccountAID label='Account-ID' value={AccountAIDToEdit} setValue={setAccountAIDToEdit} />
                        </td>
                    </tr>
                    
                    <tr>
                        <td><b>First-Name</b></td>
                        <td>
                            <InputCfname label='First-Name' value={CfnameToEdit} setValue={setCfnameToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Last-Name</b></td>
                        <td>
                            <InputCLname label='Last-Name' value={CLnameToEdit} setValue={setCLnameToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Number</b></td>
                        <td>
                            <InputCnumber label='Number' value={CnumberToEdit} setValue={setCnumberToEdit} />   
                        </td>
                    </tr>
                    <tr>
                        <td><b>Email</b></td>
                        <td>
                            <InputCemail label='Email' value={CemailToEdit} setValue={setCemailToEdit} />   
                        </td>
                    </tr>

                    <tr>
                        <td width={'20%'}><b>Address</b></td>
                        <td>
                            <InputCaddress label='Address' value={CaddressToEdit} setValue={setCaddressToEdit} />
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



function TableRowsContacts() {
    const{
        editMode, setEditMode, 
        contacts, setContacts,
        AccountAIDToEdit, setAccountAIDToEdit,
        CfnameToEdit, setCfnameToEdit, 
        CLnameToEdit, setCLnameToEdit, 
        CemailToEdit, setCemailToEdit,
        CnumberToEdit, setCnumberToEdit,
        CaddressToEdit, setCaddressToEdit,
        reloadContacts, setReloadContacts

    } = useContext(ContactToEditContext);

    useEffect(
        () => {
            axios.get('http://localhost:3001/contact').then((response) => {
                setContacts(response.data);
            })
        }, [reloadContacts]
    )

    function updateContact(event, AccountAID) {
        setEditMode('edit')

        var contact = contacts.find(contact => contact.AccountAID === AccountAID)
        setCfnameToEdit(contact.Cfname)
        setCLnameToEdit(contact.CLname)
        setCemailToEdit(contact.Cemail)
        setCnumberToEdit(contact.Cnumber)
        setCaddressToEdit(contact.Caddress)
    }

    function deleteContact(event, AccountAID) {
        axios.delete('http://localhost:3001/contact', { params: { 'AccountAID': AccountAID } }).then((response) => {
            setReloadContacts(!reloadContacts)
        })
    }

    return (
        <>
            {contacts.map(
                contact =>
                    <tr key={contact.AccountAID}>
                        <td>{contact.AccountAID}</td><td>{contact.Cfname}</td><td>{contact.CLname}</td><td>{contact.Cnumber}</td><td>{contact.Cemail}</td><td>{contact.Caddress}</td>
                        <td>
                            <Link onClick={event => updateContact(event, contact.AccountAID)}>Update</Link> |
                            <Link onClick={event => deleteContact(event, contact.Account)}>Delete</Link>
                        </td>
                    </tr>
            )}
        </>
    )
}


function TableContacts() {

    return (
        <>
            <h3>View All Contacts</h3>

            <table id={'contactsTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsContacts />
                </tbody>
            </table>
        </>
    )
}

export default function Contact() {

    const [editMode, setEditMode] = useState('create')
    const [contacts, setContacts] = useState([]);

    const [AccountAIDToEdit, setAccountAIDToEdit] = useState('')
    const [CfnameToEdit, setCfnameToEdit] = useState('')
    const [CLnameToEdit, setCLnameToEdit] = useState('')
    const [CnumberToEdit, setCnumberToEdit] = useState('')
    const [CemailToEdit, setCemailToEdit] = useState('')
    const [CaddressToEdit, setCaddressToEdit] = useState('')

    const [reloadContacts, setReloadContacts] = useState(true)

    return (
        <>
            <ContactToEditContext.Provider value={{
                editMode, setEditMode,
                contacts, setContacts,
                AccountAIDToEdit, setAccountAIDToEdit,
                CfnameToEdit, setCfnameToEdit,
                CLnameToEdit, setCLnameToEdit,
                CnumberToEdit, setCnumberToEdit,
                CemailToEdit, setCemailToEdit,
                CaddressToEdit, setCaddressToEdit,
                reloadContacts, setReloadContacts
            }}>

                <div className="row" style={{ width: '100%' }}>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h2 style={{ marginTop: '0px' }}>Contact</h2>
                    </div>
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <InputFormContact />
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <TableContacts />
                </div>
            </ContactToEditContext.Provider>
        </>
    )
};