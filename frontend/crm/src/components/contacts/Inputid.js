import { useState } from "react"

export default function Inputid({ label, value, setValue }) {    

    return (
        <input
            type={"text"}
            placeholder={`Enter ${label}`}
            required={true}
            style={{ width: '300px' }}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            // readOnly
        />
    )
};