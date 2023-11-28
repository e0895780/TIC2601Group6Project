import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { AccountToEditContext } from '../contexts/AccountToEditContext';

import InputAID from "../components/account/InputAID"
import InputAname from "../components/account/InputAname"
import InputAtype from "../components/account/InputAtype"

axios.defaults.headers.put['Content-Type'] = 'application/json';



function InputFormAccount() {

    const{
        editMode, setEditMode, 
        accounts, setAccounts,
        AIDToEdit, setAIDToEdit, 
        AnameToEdit, setAnameToEdit, 
        AtypeToEdit, setAtypeToEdit,
        reloadAccounts, setReloadAccounts
    } = useContext(AccountToEditContext);

    function resetInputState() {
        setAIDToEdit('')
        setAnameToEdit('')
        setAtypeToEdit('')
    }

    function processForm() {


        if (editMode === 'create') {

            var newAccount = { 'AID': AIDToEdit, 'Aname': AnameToEdit, 'Atype': AtypeToEdit }
            axios.put('http://localhost:3001/account',newAccount).then((response)=>{
                resetInputState();
                setReloadAccounts(!reloadAccounts)
            })
            
        }
        else if (editMode === 'edit') {

            var accountToEdit = {'AID':AIDToEdit,'Aname':AnameToEdit,'Atype':AtypeToEdit}
            axios.post('http://localhost:3001/account',accountToEdit).then((response)=>{
                resetInputState();
                setReloadAccounts(!reloadAccounts)
                setEditMode('create')
            })

        }


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

function TableRowsAccounts() {
    const{
        editMode, setEditMode, 
        accounts, setAccounts,
        AIDToEdit, setAIDToEdit, 
        AnameToEdit, setAnameToEdit, 
        AtypeToEdit, setAtypeToEdit,
        reloadAccounts, setReloadAccounts
    } = useContext(AccountToEditContext);

    useEffect(
        () => {
            axios.get('http://localhost:3001/account').then((response) => {
                setAccounts(response.data);
            })
        }, [reloadAccounts]
    )

    function updateAccount(event, AID) {
        setEditMode('edit')

        var account = accounts.find(account => account.AID === AID)
        setAIDToEdit(account.AID)
        setAnameToEdit(account.Aname)
        setAtypeToEdit(account.Atype)
    }

    function deleteAccount(event, AID) {
        axios.delete('http://localhost:3001/account', { params: { 'AID': AID } }).then((response) => {
            setReloadAccounts(!reloadAccounts)
        })
    }

    return (
        <>
            {accounts.map(
                account =>
                    <tr key={account.AID}>
                        <td>{account.AID}</td><td>{account.Aname}</td><td>{account.Atype}</td>
                        <td>
                            <Link onClick={event => updateAccount(event, account.AID)}>Update</Link> |
                            <Link onClick={event => deleteAccount(event, account.AID)}>Delete</Link> |
                            <Link to={`/Contact?accountAID=${account.AID}`}>Update Contact</Link>
                        </td>
                    </tr>
            )}
        </>
    )
}


function TableAccounts() {

    return (
        <>
            <h3>View All Accounts</h3>

            <table id={'accountsTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>Account ID</th>
                        <th>Account Name</th>
                        <th>Account Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsAccounts />
                </tbody>
            </table>
        </>
    )
}

export default function Account() {

    const [editMode, setEditMode] = useState('create')
    const [accounts, setAccounts] = useState([]);

    const [AIDToEdit, setAIDToEdit] = useState('')
    const [AnameToEdit, setAnameToEdit] = useState('')
    const [AtypeToEdit, setAtypeToEdit] = useState('')

    const [reloadAccounts, setReloadAccounts] = useState(true)

    return (
        <>
            <AccountToEditContext.Provider value={{
                editMode, setEditMode,
                accounts, setAccounts,
                AIDToEdit, setAIDToEdit,
                AnameToEdit, setAnameToEdit,
                AtypeToEdit, setAtypeToEdit,
                reloadAccounts, setReloadAccounts
            }}>

                <div className="row" style={{ width: '100%' }}>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h2 style={{ marginTop: '0px' }}>Account</h2>
                    </div>
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <InputFormAccount />
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <TableAccounts />
                </div>
            </AccountToEditContext.Provider>
        </>
    )
};