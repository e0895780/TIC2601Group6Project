import { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useLocation } from 'react-router-dom';


import { OpportunityToEditContext } from '../contexts/OpportunityToEditContext';

import InputAccountAID from "../components/opportunity/InputAccountAID"
import InputId from "../components/opportunity/InputId"
import InputName from "../components/opportunity/InputName"
import InputDate from "../components/opportunity/InputDate"
import InputAmount from "../components/opportunity/InputAmount"
import InputStage from "../components/opportunity/InputStage"

axios.defaults.headers.put['Content-Type'] = 'application/json';

function InputFormOpportunity() {

    const {
        editMode, setEditMode,
        opportunities, setOpportunities,
        AccountAIDToEdit, setAccountAIDToEdit,
        OidToEdit, setOidToEdit,
        OnameToEdit, setOnameToEdit,
        OpartnerToEdit, setOpartnerToEdit,
        OdistributorToEdit, setOdistributorToEdit,
        OstageToEdit, setOstageToEdit,
        OclosedateToEdit, setOclosedateToEdit,
        OamountToEdit, setOamountToEdit,
        reloadOpportunities, setReloadOpportunities
    } = useContext(OpportunityToEditContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const accountAIDFromURL = queryParams.get('accountAID');

    useEffect(() => {
        if (accountAIDFromURL) {
            setAccountAIDToEdit(accountAIDFromURL);
        }
    }, [accountAIDFromURL]);

    function resetInputState() {
        setAccountAIDToEdit('')
        setOidToEdit('')
        setOnameToEdit('')
        setOpartnerToEdit('')
        setOdistributorToEdit('')
        setOstageToEdit('')
        setOclosedateToEdit('')
        setOamountToEdit('')
    }

    function processForm() {

        if (editMode === 'create') {

            var newOpportunity = {
                'AccountAID':AccountAIDToEdit,
                'Oid': OidToEdit, 
                'Oname': OnameToEdit, 
                'Opartner': OpartnerToEdit, 
                'Odistributor': OdistributorToEdit, 
                'Ostage': OstageToEdit,
                'Oclosedate': OclosedateToEdit,
                'Oamount': OamountToEdit
             }
            axios.put('http://localhost:3001/opportunity', newOpportunity).then((response) => {
                resetInputState();
                setReloadOpportunities(!reloadOpportunities)
            })
        }
        else if (editMode === 'edit') {

            var opportunityToEdit = {
                'AccountAID':AccountAIDToEdit,
                'Oid': OidToEdit, 
                'Oname': OnameToEdit, 
                'Opartner': OpartnerToEdit, 
                'Odistributor': OdistributorToEdit, 
                'Ostage': OstageToEdit,
                'Oclosedate': OclosedateToEdit,
                'Oamount': OamountToEdit}
            axios.post('http://localhost:3001/opportunity', opportunityToEdit).then((response) => {
                resetInputState();
                setReloadOpportunities(!reloadOpportunities)
                setEditMode('create')
            })
        }
    }

    return (
        <>
            <h3>Create/Update Opportunity</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                <tr>
                        <td><b>Account ID</b></td>
                        <td>
                            <InputAccountAID label='Account-ID' value={AccountAIDToEdit} setValue={setAccountAIDToEdit} />
                        </td>
                    </tr>

                    <tr>
                        <td><b>Oid</b></td>
                        <td>
                            <InputId label='Opportunity' value={OidToEdit} setValue={setOidToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Oname</b></td>
                        <td>
                            <InputName label='Opportunity' value={OnameToEdit} setValue={setOnameToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Opartner</b></td>
                        <td>
                            <InputName label='Opportunity' value={OpartnerToEdit} setValue={setOpartnerToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Odistributor</b></td>
                        <td>
                            <InputName label='Opportunity' value={OdistributorToEdit} setValue={setOdistributorToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Ostage</b></td>
                        <td>
                            <InputStage value={OstageToEdit} setValue={setOstageToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Oclosedate</b></td>
                        <td>
                            <InputDate minDate='1990-01-01' maxDate='2050-12-31' value={OclosedateToEdit} setValue={setOclosedateToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Oamount</b></td>
                        <td>
                            <InputAmount value={OamountToEdit} setValue={setOamountToEdit} />
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

function TableRowsOpportunities() {

    const {
        editMode, setEditMode,
        opportunities, setOpportunities,
        AccountAIDToEdit, setAccountAIDToEdit,
        OidToEdit, setOidToEdit,
        OnameToEdit, setOnameToEdit,
        OpartnerToEdit, setOpartnerToEdit,
        OdistributorToEdit, setOdistributorToEdit,
        OstageToEdit, setOstageToEdit,
        OclosedateToEdit, setOclosedateToEdit,
        OamountToEdit, setOamountToEdit,
        reloadOpportunities, setReloadOpportunities
    } = useContext(OpportunityToEditContext);

    useEffect(
        () => {
            axios.get('http://localhost:3001/opportunity').then((response) => {
                setOpportunities(response.data);
            })
        }, [reloadOpportunities]
    )

    function updateOpportunity(event, Oid) {
        setEditMode('edit')

        var opportunity = opportunities.find(opportunity => opportunity.Oid === Oid)
        setAccountAIDToEdit(opportunity.AccountAID);
        setOidToEdit(opportunity.Oid)
        setOnameToEdit(opportunity.Oname)
        setOpartnerToEdit(opportunity.Opartner)
        setOdistributorToEdit(opportunity.Odistributor)
        setOstageToEdit(opportunity.Ostage)
        setOclosedateToEdit(opportunity.Oclosedate.slice(0, 10))
        setOamountToEdit(opportunity.Oamount)
    }

    function deleteOpportunity(event, Oid) {
        axios.delete('http://localhost:3001/opportunity', { params: { 'Oid': Oid } }).then((response) => {
            setReloadOpportunities(!reloadOpportunities)
        })
    }

    return (
        <>
            {opportunities.map(
                opportunity =>
                    <tr key={opportunity.Oid}>
                        <td>{opportunity.AccountAID}</td>
                        <td>{opportunity.Oid}</td>
                        <td>{opportunity.Oname}</td>
                        <td>{opportunity.Opartner}</td>
                        <td>{opportunity.Odistributor}</td>
                        <td>{opportunity.Ostage}</td>
                        <td>{opportunity.Oclosedate.slice(0, 10)}</td>
                        <td>{opportunity.Oamount}</td>
                        <td>
                            <Link onClick={event => updateOpportunity(event, opportunity.Oid)}>Update</Link> |
                            <Link onClick={event => deleteOpportunity(event, opportunity.Oid)}>Delete</Link>
                        </td>
                    </tr>
            )}
        </>
    )
}


function TableOpportunities() {

    return (
        <>
            <h3>View All Opportunities</h3>

            <table id={'opportunitiesTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
                        <th>AccountAID</th>
                        <th>Oid</th>
                        <th>Oname</th>
                        <th>Opartner</th>
                        <th>Odistributor</th>
                        <th>Ostage</th>
                        <th>Oclosedate</th>
                        <th>Oamount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowsOpportunities />
                </tbody>
            </table>
        </>
    )
}

export default function Opportunity() {

    const [editMode, setEditMode] = useState('create')
    const [opportunities, setOpportunities] = useState([]);
    const [AccountAIDToEdit, setAccountAIDToEdit] = useState('')
    const [OidToEdit, setOidToEdit] = useState('')
    const [OnameToEdit, setOnameToEdit] = useState('')
    const [OpartnerToEdit, setOpartnerToEdit] = useState('')
    const [OdistributorToEdit, setOdistributorToEdit] = useState('')
    const [OstageToEdit, setOstageToEdit] = useState('')
    const [OclosedateToEdit, setOclosedateToEdit] = useState('')
    const [OamountToEdit, setOamountToEdit] = useState('')

    const [reloadOpportunities, setReloadOpportunities] = useState(true)

    return (
        <>
            <OpportunityToEditContext.Provider value={{
                editMode, setEditMode,
                opportunities, setOpportunities,
                AccountAIDToEdit, setAccountAIDToEdit,
                OidToEdit, setOidToEdit,
                OnameToEdit, setOnameToEdit,
                OpartnerToEdit, setOpartnerToEdit,
                OdistributorToEdit, setOdistributorToEdit,
                OstageToEdit, setOstageToEdit,
                OclosedateToEdit, setOclosedateToEdit,
                OamountToEdit, setOamountToEdit,
                reloadOpportunities, setReloadOpportunities
                
            }}>

                <div className="row" style={{ width: '100%' }}>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h2 style={{ marginTop: '0px' }}>Opportunity</h2>
                    </div>
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <InputFormOpportunity />
                </div>
                <div className="row" style={{ width: '100%' }}>
                    <TableOpportunities />
                </div>
            </OpportunityToEditContext.Provider>
        </>
    )
};