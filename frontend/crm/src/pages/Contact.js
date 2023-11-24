import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { ContactToEditContext } from '../contexts/ContactToEditContext';

import InputAccountAID from "../components/contacts/InputAccountAID"
import Inputid from "../components/contacts/Inputid"
import InputCfname from "../components/contacts/InputCfname"
import InputCLname from "../components/contacts/InputCLname"
import InputCaddress from "../components/contacts/InputCaddress"
import InputCemail from "../components/contacts/InputCemail"
import InputCnumber from "../components/contacts/InputCnumber"


axios.defaults.headers.put['Content-Type'] = 'application/json';



function InputFormContact() {

    const{
        editMode, setEditMode, 
        contacts, setContacts,
        idToEdit,setidToEdit,
        AccountAIDToEdit, setAccountAIDToEdit,
        CfnameToEdit, setCfnameToEdit, 
        CLnameToEdit, setCLnameToEdit, 
        CemailToEdit, setCemailToEdit,
        CnumberToEdit, setCnumberToEdit,
        CaddressToEdit, setCaddressToEdit,
        reloadContacts, setReloadContacts

    } = useContext(ContactToEditContext);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const accountAIDFromURL = queryParams.get('accountAID');
    
    useEffect(() => {
        if (accountAIDFromURL) {
            
            setAccountAIDToEdit(accountAIDFromURL);
        }
    }, [accountAIDFromURL]);




    function resetInputState() {
        setidToEdit('')
        setAccountAIDToEdit('')
        setCfnameToEdit('')
        setCLnameToEdit('')
        setCemailToEdit('')
        setCnumberToEdit('')
        setCaddressToEdit('')
    }

    function processForm() {
    

        if (editMode === 'create') {

            var newContact = { 'id':idToEdit,'AccountAID':AccountAIDToEdit,'Cfname': CfnameToEdit, 'CLname': CLnameToEdit, 'Cemail': CemailToEdit, 'Caddress':CaddressToEdit,'Cnumber':CnumberToEdit }
            axios.put('http://localhost:3001/contact',newContact).then((response)=>{
                resetInputState();
                setReloadContacts(!reloadContacts)
            })
            
        }
        else if (editMode === 'edit') {

            var contactToEdit = {'id':idToEdit,'AccountAID':AccountAIDToEdit,'Cfname': CfnameToEdit, 'CLname': CLnameToEdit, 'Cemail': CemailToEdit, 'Caddress':CaddressToEdit,'Cnumber':CnumberToEdit}
            axios.post('http://localhost:3001/contact',contactToEdit).then((response)=>{
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
                        <td><b>Contact ID</b></td>
                        <td>
                            <Inputid label='Contact-ID' value={idToEdit} setValue={setidToEdit} />
                        </td>
                    </tr>

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
        idToEdit,setidToEdit,
        AccountAIDToEdit, setAccountAIDToEdit,
        CfnameToEdit, setCfnameToEdit, 
        CLnameToEdit, setCLnameToEdit, 
        CemailToEdit, setCemailToEdit,
        CnumberToEdit, setCnumberToEdit,
        CaddressToEdit, setCaddressToEdit,
        reloadContacts, setReloadContacts,
        searchAccountID, setSearchAccountID
        
    } = useContext(ContactToEditContext);

    useEffect(
        () => {
            axios.get('http://localhost:3001/contact').then((response) => {
                setContacts(response.data);
            });
        },[reloadContacts]
    )

    function updateContact(event, id) {
        setEditMode('edit')
        var contact = contacts.find(contact => contact.id === id);
        setidToEdit(contact.id);
        setAccountAIDToEdit(contact.AccountAID);
        setCfnameToEdit(contact.Cfname)
        setCLnameToEdit(contact.CLname)
        setCemailToEdit(contact.Cemail)
        setCnumberToEdit(contact.Cnumber)
        setCaddressToEdit(contact.Caddress)
    }

    function deleteContact(event, id) {
        axios.delete('http://localhost:3001/contact', { params: { 'id': id } }).then((response) => {
            setReloadContacts(!reloadContacts)
        })
    }

    // original code
    // return (

    //     <>
    //         {contacts.map(
    //             contact =>
    //                 <tr key={contact.id}>
    //                     <td>{contact.id}</td><td>{contact.AccountAID}</td><td>{contact.Cfname}</td><td>{contact.CLname}</td><td>{contact.Cnumber}</td><td>{contact.Cemail}</td><td>{contact.Caddress}</td>
    //                     <td>
    //                         <Link onClick={event => updateContact(event, contact.id)}>Update</Link> |
    //                         <Link onClick={event => deleteContact(event, contact.id)}>Delete</Link>
    //                     </td>
    //                 </tr>
    //         )}
    //     </>
    // )

    // new code for filter function
    // return (
    //     <>
    //         {contacts
    //             .filter(contact =>
    //                 searchAccountID === '' || String(contact.AccountAID) === searchAccountID
    //             )
    //             .map(
    //                 contact =>
    //                     <tr key={contact.id}>
    //                         <td>{contact.id}</td><td>{contact.AccountAID}</td><td>{contact.Cfname}</td><td>{contact.CLname}</td><td>{contact.Cnumber}</td><td>{contact.Cemail}</td><td>{contact.Caddress}</td>
    //                         <td>
    //                             <Link onClick={event => updateContact(event, contact.id)}>Update</Link> |
    //                             <Link onClick={event => deleteContact(event, contact.id)}>Delete</Link>
    //                         </td>
    //                     </tr>
    //             )}
    //     </>
    // )

    // new filter code for manual search
    return (
        <>
            {contacts
                .filter(contact =>
                    searchAccountID === '' || String(contact.AccountAID) === searchAccountID
                )
                .map(
                    contact =>
                        <tr key={contact.id}>
                            <td>{contact.id}</td><td>{contact.AccountAID}</td><td>{contact.Cfname}</td><td>{contact.CLname}</td><td>{contact.Cnumber}</td><td>{contact.Cemail}</td><td>{contact.Caddress}</td>
                            <td>
                                <Link onClick={event => updateContact(event, contact.id)}>Update</Link> |
                                <Link onClick={event => deleteContact(event, contact.id)}>Delete</Link>
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
                        <th>Contact ID</th>
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
    const [idToEdit, setidToEdit] = useState('')
    const [AccountAIDToEdit, setAccountAIDToEdit] = useState('')
    const [CfnameToEdit, setCfnameToEdit] = useState('')
    const [CLnameToEdit, setCLnameToEdit] = useState('')
    const [CnumberToEdit, setCnumberToEdit] = useState('')
    const [CemailToEdit, setCemailToEdit] = useState('')
    const [CaddressToEdit, setCaddressToEdit] = useState('')

    const [reloadContacts, setReloadContacts] = useState(true)

    // new edit 2
    const [searchAccountID, setSearchAccountID] = useState('');


    return (
        <>
            <ContactToEditContext.Provider value={{
                editMode, setEditMode,
                contacts, setContacts,
                idToEdit,setidToEdit,
                AccountAIDToEdit, setAccountAIDToEdit,
                CfnameToEdit, setCfnameToEdit,
                CLnameToEdit, setCLnameToEdit,
                CnumberToEdit, setCnumberToEdit,
                CemailToEdit, setCemailToEdit,
                CaddressToEdit, setCaddressToEdit,
                reloadContacts, setReloadContacts,
                // new edit 2
                searchAccountID,setSearchAccountID,
            }}>

                <div className="row" style={{ width: '100%' }}>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h2 style={{ marginTop: '0px' }}>Contact</h2>
                    </div>
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <InputFormContact />
                </div>
                {/* new edit 2 336-345*/}
                <div className="row" style={{ width: '100%' }}>
                    <h3>Search Contacts by Account ID</h3>
                    <label>Enter Account ID:</label>
                    <input
                        type="text"
                        value={searchAccountID}
                        onChange={(e) => setSearchAccountID(e.target.value)}
                    />
                    {/* this for auto search */}
                    <button onClick={() => setReloadContacts(!reloadContacts)}>Search</button>
                    {/* for manual search  */}
                    {/* <button onClick={() => setReloadManualSearch(false)}>Search</button> */}
                </div>

                <div className="row" style={{ width: '100%' }}>
                
                   
                    <TableContacts />
                </div>
            </ContactToEditContext.Provider>
        </>
    )
};

