import { useState } from 'react';
import { Link } from "react-router-dom";

import InputId from "../components/InputId"
import InputName from "../components/InputName"
import InputDate from "../components/InputDate"
import InputAmount from "../components/InputAmount"
import InputStage from "../components/InputStage"


function InputFormOpportunity({ editMode, setEditMode, opportunities, setOpportunities,
    OidToEdit, setOidToEdit, OnameToEdit, setOnameToEdit, OpartnerToEdit, setOpartnerToEdit, OdistributorToEdit, setOdistributorToEdit, OstageToEdit, setOstageToEdit, OclosedateToEdit, setOclosedateToEdit, OamountToEdit, setOamountToEdit }) {

    function processForm() {

        console.log('InputFormOpportunity: processForm')

        if (editMode === 'create') {

            var newOpportunity = { 'Oid': OidToEdit, 'Oname': OnameToEdit, 'Opartner': OpartnerToEdit, 'Odistributor': OdistributorToEdit, 'Ostage': OstageToEdit, 'Oclosedate': OclosedateToEdit, 'Oamount': OamountToEdit}
            setOpportunities(opportunities.concat([newOpportunity]));
        }
        else if (editMode === 'edit') {

            var opportunity = opportunities.find(opportunity => opportunity.Oid === OidToEdit)
            opportunity.Oid = OidToEdit
            opportunity.Oname = OnameToEdit
            opportunity.Opartner = OpartnerToEdit
            opportunity.Odistributor = OdistributorToEdit
            opportunity.Ostage = OstageToEdit
            opportunity.Oclosedate = OclosedateToEdit
            opportunity.Oamount = OamountToEdit

            setEditMode('create')
        }

        setOidToEdit('')
        setOnameToEdit('')
        setOpartnerToEdit('')
        setOdistributorToEdit('')
        setOstageToEdit('')
        setOclosedateToEdit('')
        setOamountToEdit('')
    }

    return (
        <>
            <h3>Create/Update Opportunity</h3>

            <table border={'1'} style={{ width: '100%', position: "relative" }} >
                <tbody>
                    <tr>
                        <td width={'20%'}><b>Oid</b></td>
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
                            <InputName label='Partner' value={OpartnerToEdit} setValue={setOpartnerToEdit} />
                        </td>
                    </tr>
                    <tr>
                        <td><b>Odistributor</b></td>
                        <td>
                            <InputName label='Distributor' value={OdistributorToEdit} setValue={setOdistributorToEdit} />
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

function TableRowsOpportunities({ editMode, setEditMode, opportunities, setOpportunities,
    OidToEdit, setOidToEdit, OnameToEdit, setOnameToEdit, OpartnerToEdit, setOpartnerToEdit, OdistributorToEdit, setOdistributorToEdit, OstageToEdit, setOstageToEdit, OclosedateToEdit, setOclosedateToEdit, OamountToEdit, setOamountToEdit  }) {

    function updateOpportunity(event, Oid) {
        setEditMode('edit')
        console.log('Editing ' + Oid)

        var opportunity = opportunities.find(opportunity => opportunity.Oid === Oid)
        setOidToEdit(opportunity.Oid)
        setOnameToEdit(opportunity.Oname)
        setOpartnerToEdit(opportunity.Opartner)
        setOdistributorToEdit(opportunity.Odistributor)
        setOstageToEdit(opportunity.Ostage)
        setOclosedateToEdit(opportunity.Oclosedate)
        setOamountToEdit(opportunity.Oamount)
    }

    function deleteOpportunity(event, Oid) {
        setOpportunities(opportunities.filter(opportunity =>
            opportunity.Oid !== Oid
        ))
    }

    return (
        <>
            {opportunities.map(
                opportunity =>
                    <tr key={opportunity.Oid}>
                        <td>{opportunity.Oid}</td><td>{opportunity.Oname}</td><td>{opportunity.Opartner}</td><td>{opportunity.Odistributor}</td><td>{opportunity.Ostage}</td><td>{opportunity.Oclosedate}</td><td>{opportunity.Oamount}</td>
                        <td>
                            <Link onClick={event => updateOpportunity(event, opportunity.Oid)}>Update</Link> |
                            <Link onClick={event => deleteOpportunity(event, opportunity.Oid)}>Delete</Link>
                        </td>
                    </tr>
            )}
        </>
    )
}


function TableOpportunities({ editMode, setEditMode, opportunities, setOpportunities,
    OidToEdit, setOidToEdit, OnameToEdit, setOnameToEdit, OpartnerToEdit, setOpartnerToEdit, OdistributorToEdit, setOdistributorToEdit, OstageToEdit, setOstageToEdit, OclosedateToEdit, setOclosedateToEdit, OamountToEdit, setOamountToEdit }) {

    return (
        <>
            <h3>View All Opportunities</h3>

            <table id={'opportunitiesTable'} border={'1'} width={'100%'}>
                <thead>
                    <tr>
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
                    <TableRowsOpportunities editMode={editMode} setEditMode={setEditMode} opportunities={opportunities} setOpportunities={setOpportunities}
                        OidToEdit={OidToEdit} setOidToEdit={setOidToEdit}
                        OnameToEdit={OnameToEdit} setOnameToEdit={setOnameToEdit}
                        OpartnerToEdit={OpartnerToEdit} setOpartnerToEdit={setOpartnerToEdit}
                        OdistributorToEdit={OdistributorToEdit} setOdistributorToEdit={setOdistributorToEdit}
                        OstageToEdit={OstageToEdit} setOstageToEdit={setOstageToEdit}
                        OclosedateToEdit={OclosedateToEdit} setOclosedateToEdit={setOclosedateToEdit}
                        OamountToEdit={OamountToEdit} setOamountToEdit={setOamountToEdit} />
                </tbody>
            </table>
        </>
    )
}

export default function Opportunity() {

    const [editMode, setEditMode] = useState('create')
    const [opportunities, setOpportunities] = useState([]);

    const [OidToEdit, setOidToEdit] = useState('')
    const [OnameToEdit, setOnameToEdit] = useState('')
    const [OpartnerToEdit, setOpartnerToEdit] = useState('')
    const [OdistributorToEdit, setOdistributorToEdit] = useState('')
    const [OstageToEdit, setOstageToEdit] = useState('')
    const [OclosedateToEdit, setOclosedateToEdit] = useState('')
    const [OamountToEdit, setOamountToEdit] = useState('')

    return (
        <>
            <div className="row" style={{ width: '100%' }}>
                <div style={{ width: '100%', float: 'left' }}>
                    <h2 style={{ marginTop: '0px' }}>Opportunity</h2>
                </div>
            </div>
            <div className="row" style={{ width: '100%' }}>
                <InputFormOpportunity editMode={editMode} setEditMode={setEditMode} opportunities={opportunities} setOpportunities={setOpportunities}
                    OidToEdit={OidToEdit} setOidToEdit={setOidToEdit}
                    OnameToEdit={OnameToEdit} setOnameToEdit={setOnameToEdit}
                    OpartnerToEdit={OpartnerToEdit} setOpartnerToEdit={setOpartnerToEdit}
                    OdistributorToEdit={OdistributorToEdit} setOdistributorToEdit={setOdistributorToEdit}
                    OstageToEdit={OstageToEdit} setOstageToEdit={setOstageToEdit}
                    OclosedateToEdit={OclosedateToEdit} setOclosedateToEdit={setOclosedateToEdit}
                    OamountToEdit={OamountToEdit} setOamountToEdit={setOamountToEdit} />
            </div>
            <div className="row" style={{ width: '100%' }}>
                <TableOpportunities editMode={editMode} setEditMode={setEditMode} opportunities={opportunities} setOpportunities={setOpportunities}
                    OidToEdit={OidToEdit} setOidToEdit={setOidToEdit}
                    OnameToEdit={OnameToEdit} setOnameToEdit={setOnameToEdit}
                    OpartnerToEdit={OpartnerToEdit} setOpartnerToEdit={setOpartnerToEdit}
                    OdistributorToEdit={OdistributorToEdit} setOdistributorToEdit={setOdistributorToEdit}
                    OstageToEdit={OstageToEdit} setOstageToEdit={setOstageToEdit}
                    OclosedateToEdit={OclosedateToEdit} setOclosedateToEdit={setOclosedateToEdit}
                    OamountToEdit={OamountToEdit} setOamountToEdit={setOamountToEdit} />
            </div>
        </>
    )
};