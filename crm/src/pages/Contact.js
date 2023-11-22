import { useState } from 'react';
import { Link } from "react-router-dom";

import InputCaddress from "../components/InputCaddress"
import InputCemail from "../components/InputCemail"
import InputCfname from "../components/InputCfname"
import InputCLname from "../components/InputCLname"
import InputCnumber from "../components/InputCnumber"


function InputFormContact({ editMode, setEditMode, contacts, setContacts,
    AIDToUpdate, setAIDToUpdate, CfnameToEdit, setCfnameToEdit,CLnameToEdit, setCLnameToEdit, CaddressToEdit, setCaddressToEdit,CemailToEdit, setCemailToEdit,CnumberToEdit,setCnumberToEdit }) {

    function processForm() {

        console.log('InputFormContact: processForm')

        if (editMode === 'create') {

            var newContact = { 'AID': AIDToUpdate, 'Cfname': CfnameToEdit, 'CLname': CLnameToEdit,'Cemail': CemailToEdit,'Caddress': CaddressToEdit,'Cnumber': CnumberToEdit, }
            setContacts(contacts.concat([newContact]));
        }
        else if (editMode === 'edit') {

            var contact = contacts.find(contact => contact.AID === AIDToUpdate)
            contact.AID = AIDToUpdate;
            contact.Cfname = CfnameToEdit;
            contact.CLname = CLnameToEdit;
            contact.Caddress = CaddressToEdit;
            contact.Cemail = CemailToEdit;
            contact.Cnumber = CnumberToEdit;
            setEditMode('create');
        }

        setAIDToUpdate('');
        setCfnameToEdit('');
        setCLnameToEdit('');
        setCaddressToEdit('');
        setCemailToEdit('');
        setCnumberToEdit('');
    }

    return (
        <>
            <h3>Create/Update Contact</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Account-ID</b></td>
                        <td>{AIDToUpdate}</td>
                    </tr>

                    <tr>
                        <td><b>First Name</b></td>
                        <td>
                            <InputCfname label='First Name' value={CfnameToEdit} setValue={setCfnameToEdit} />
                        </td>
                    </tr>
                    
                    <tr>
                        <td><b>Last Name</b></td>
                        <td>
                            <InputCLname label='Last Name' value={CLnameToEdit} setValue={setCLnameToEdit} />   
                        </td>
                    </tr>

                    <tr>
                        <td><b>Email</b></td>
                        <td>
                            <InputCemail label='Email Address' value={CemailToEdit} setValue={setCemailToEdit} />   
                        </td>
                    </tr>

                    <tr>
                        <td><b>Address</b></td>
                        <td>
                            <InputCaddress label='Address' value={CaddressToEdit} setValue={setCaddressToEdit} />   
                        </td>
                    </tr>

                    <tr>
                        <td><b>Phone Number</b></td>
                        <td>
                            <InputCnumber label='Phone Number' value={CnumberToEdit} setValue={setCnumberToEdit} />   
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

function TableRowsContacts({ editMode, setEditMode, contacts, setContacts,
    AIDToUpdate, setAIDToUpdate, CfnameToEdit, setCfnameToEdit,CLnameToEdit, setCLnameToEdit, CaddressToEdit, setCaddressToEdit,CemailToEdit, setCemailToEdit,CnumberToEdit,setCnumberToEdit }) {

    function updateContact(event, AID) {
        setEditMode('edit')
        console.log('Editing Contact for Account ID' + AID)

        var contact = contacts.find((contact) => contact.AID === AID)
        setAIDToUpdate(contact.AID)
        setCLnameToEdit(contact.CLname)
        setCfnameToEdit(contact.Cfname)
        setCaddressToEdit(contact.Caddress);
        setCemailToEdit(contact.Cemail);
        setCnumberToEdit(contact.Cnumber);
    }

    function deleteContact(event, AID) {
        setContacts(contacts.filter((contact) => contact.AID !== AID));
    }

    return (
        <>
            {contacts.map(
                contact => 
                    <tr key={contact.AID}>
                        <td>{contact.AID}</td><td>{contact.Cfname}</td><td>{contact.CLname}</td><td>{contact.Caddress}</td><td>{contact.Cemail}</td><td>{contact.Cnumber}</td>
                        <td>
                            <Link onClick={(event) => updateContact(event, contact.AID)}>Update</Link> |
                            <Link onClick={(event) => deleteContact(event, contact.AID)}>Delete</Link>
                        </td>
                    </tr>
            )}
        </>
      );
}


function TableContacts({editMode, setEditMode, contacts, setContacts,
    AIDToUpdate, setAIDToUpdate, CfnameToEdit, setCfnameToEdit,CLnameToEdit, setCLnameToEdit, CaddressToEdit, setCaddressToEdit,CemailToEdit, setCemailToEdit,CnumberToEdit,setCnumberToEdit}) {

    return (
        <>
            <h3>View All Contacts</h3>

            <table id={'contactsTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsContacts editMode={editMode} setEditMode={setEditMode} contacts={contacts} setContacts={setContacts}
                        AIDToUpdate={AIDToUpdate} setAIDToUpdate={setAIDToUpdate}
                        CfnameToEdit={CfnameToEdit} setCfnameToEdit={setCfnameToEdit}
                        CLnameToEdit={CLnameToEdit} setCLnameToEdit={setCLnameToEdit}
                        CaddressToEdit={CaddressToEdit} setCaddressToEdit={setCaddressToEdit}
                        CemailToEdit={CemailToEdit} setCemailToEdit={setCemailToEdit}
                        CnumberToEdit={CnumberToEdit} setCnumberToEdit={setCnumberToEdit} />
                </tbody>
            </table>
        </>
    )
}

export default function Contact() {

    const [editMode, setEditMode] = useState('create');
    const [contacts, setContacts] = useState([]);
    const [AIDToUpdate, setAIDToUpdate] = useState('');
    const [CfnameToEdit, setCfnameToEdit] = useState('');
    const [CLnameToEdit, setCLnameToEdit] = useState('');
    const [CaddressToEdit, setCaddressToEdit] = useState('');
    const [CemailToEdit, setCemailToEdit] = useState('');
    const [CnumberToEdit, setCnumberToEdit] = useState('');


    return (
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Contact</h2>
                </div>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <InputFormContact editMode={editMode} setEditMode={setEditMode} contacts={contacts} setContacts={setContacts}
                    AIDToUpdate={AIDToUpdate} setAIDToUpdate={setAIDToUpdate}
                    CLnameToEdit={CLnameToEdit} setCLnameToEdit={setCLnameToEdit}
                    CfnameToEdit={CfnameToEdit} setCfnameToEdit={setCfnameToEdit}
                    CaddressToEdit={CaddressToEdit} setCaddressToEdit={setCaddressToEdit}
                    CemailToEdit={CemailToEdit} setCemailToEdit={setCemailToEdit}
                    CnumberToEdit={CnumberToEdit} setCnumberToEdit={setCnumberToEdit}
                    />
            </div>
            <div className="row" style={{ width: '100%' }}>
                <TableContacts editMode={editMode} setEditMode={setEditMode} contacts={contacts} setContacts={setContacts}
                    AIDToUpdate={AIDToUpdate} setAIDToUpdate={setAIDToUpdate}
                    CLnameToEdit={CLnameToEdit} setCLnameToEdit={setCLnameToEdit}
                    CfnameToEdit={CfnameToEdit} setCfnameToEdit={setCfnameToEdit}
                    CaddressToEdit={CaddressToEdit} setCaddressToEdit={setCaddressToEdit}
                    CemailToEdit={CemailToEdit} setCemailToEdit={setCemailToEdit}
                    CnumberToEdit={CnumberToEdit} setCnumberToEdit={setCnumberToEdit}
                    />
            </div>
        </>
    )
};