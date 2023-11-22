export default function InputQPrice({value, setValue}) {
    return (
        <input
            type={"number"}
            required={true}
            min={0}
            step={'0.01'}
            style={{ width: '100px' }}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
        />
    )
};