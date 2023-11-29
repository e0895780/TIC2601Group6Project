export default function InputPDate({ label, minDate, maxDate, value, setValue }) {
    return (
        <input
            type={"date"}
            required={true}
            min={minDate}
            max={maxDate}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
        />
    )
};