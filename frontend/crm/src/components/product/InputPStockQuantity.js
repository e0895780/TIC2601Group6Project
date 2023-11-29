export default function InputPStockQuantity({ label, value, setValue }) {
    return (
        <input
            type={"number"}
            required={true}
            min={0}
            step={'1'}
            style={{ width: '100px' }}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
        />
    )
    };
