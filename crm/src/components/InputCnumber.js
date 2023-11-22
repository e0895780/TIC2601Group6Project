export default function InputCnumber({ label, value, setValue }) {
    return (
        <input
            type={"text"}
            placeholder={`Enter ${label} Name`}
            required={true}
            style={{ width: '300px' }}
            value={value}
            onChange={(event) => {                
                setValue(event.target.value);
            }}
        />
    )
};