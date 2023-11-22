import { useState } from 'react';
import { Link } from "react-router-dom";

import InputAID from "../components/InputAID"
import InputAname from "../components/InputAname"
import InputAtype from "../components/InputAtype"


function InputFormAccount({ editMode, setEditMode, accounts, setAccounts,
    AIDToEdit, setAIDToEdit, AnameToEdit, setAnameToEdit, AtypeToEdit, setAtypeToEdit }) {

    function processForm() {

        console.log('InputFormAccount: processForm')

        if (editMode === 'create') {

            var newAccount = { 'AID': AIDToEdit, 'Aname': AnameToEdit, 'Atype': AtypeToEdit }
            setAccounts(accounts.concat([newAccount]));
        }
        else if (editMode === 'edit') {

            var account = accounts.find(account => account.AID === AIDToEdit)
            account.AID = AIDToEdit
            account.Aname = AnameToEdit
            account.Atype = AtypeToEdit
            setEditMode('create')
        }

        setAIDToEdit('')
        setAnameToEdit('')
        setAtypeToEdit('')
    }

    return (
        <>
            <h3>Create/Update Account</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Account-ID</b></td>
                        <td>
                            <InputAID label='Account' value={AIDToEdit} setValue={setAIDToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Account-name</b></td>
                        <td>
                            <InputAname label='Account' value={AnameToEdit} setValue={setAnameToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Account-type</b></td>
                        <td>
                            <InputAtype label='Account Type' value={AtypeToEdit} setValue={setAtypeToEdit} />   
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

function TableRowsAccounts({ editMode, setEditMode, accounts, setAccounts,
    AIDToEdit, setAIDToEdit, AnameToEdit, setAnameToEdit, AtypeToEdit, setAtypeToEdit }) {

    function updateAccount(event, AID) {
        setEditMode('edit')
        console.log('Editing ' + AID)

        var account = accounts.find(account => account.AID === AID)
        setAIDToEdit(account.AID)
        setAnameToEdit(account.Aname)
        setAtypeToEdit(account.Atype)
    }

    function deleteAccount(event, AID) {
        setAccounts(accounts.filter(account =>
            account.AID !== AID
        ))
    }

    return (
        <>
            {accounts.map(
                account =>
                    <tr key={account.AID}>
                        <td>{account.AID}</td><td>{account.Aname}</td><td>{account.Atype}</td>
                        <td>
                            <Link onClick={event => updateAccount(event, account.AID)}>Update</Link> |
                            <Link onClick={event => deleteAccount(event, account.AID)}>Delete</Link>
                        </td>
                    </tr>
            )}
        </>
    )
}


function TableAccounts({ editMode, setEditMode, accounts, setAccounts,
    AIDToEdit, setAIDToEdit, AnameToEdit, setAnameToEdit, AtypeToEdit, setAtypeToEdit }) {

    return (
        <>
            <h3>View All Accounts</h3>

            <table id={'accountsTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>AID</th>
                        <th>Aname</th>
                        <th>Atype</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsAccounts editMode={editMode} setEditMode={setEditMode} accounts={accounts} setAccounts={setAccounts}
                        AIDToEdit={AIDToEdit} setAIDToEdit={setAIDToEdit}
                        AnameToEdit={AnameToEdit} setAnameToEdit={setAnameToEdit}
                        AtypeToEdit={AtypeToEdit} setAtypeToEdit={setAtypeToEdit} />
                </tbody>
            </table>
        </>
    )
}

export default function Book() {

    const [editMode, setEditMode] = useState('create')
    const [accounts, setAccounts] = useState([]);

    const [AIDToEdit, setAIDToEdit] = useState('')
    const [AnameToEdit, setAnameToEdit] = useState('')
    const [AtypeToEdit, setAtypeToEdit] = useState('')


    return (
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Account</h2>
                </div>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <InputFormAccount editMode={editMode} setEditMode={setEditMode} accounts={accounts} setAccounts={setAccounts}
                    AIDToEdit={AIDToEdit} setAIDToEdit={setAIDToEdit}
                    AnameToEdit={AnameToEdit} setAnameToEdit={setAnameToEdit}
                    AtypeToEdit={AtypeToEdit} setAtypeToEdit={setAtypeToEdit}/>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <TableAccounts editMode={editMode} setEditMode={setEditMode} accounts={accounts} setAccounts={setAccounts}
                    AIDToEdit={AIDToEdit} setAIDToEdit={setAIDToEdit}
                    AnameToEdit={AnameToEdit} setAnameToEdit={setAnameToEdit}
                    AtypeToEdit={AtypeToEdit} setAtypeToEdit={setAtypeToEdit}/>
            </div>
        </>
    )
};