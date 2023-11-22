export default function InputQStatus({ label, value, setValue }) {
    const statusOptions = [
        'Active',
        'Inactive',

    ];

    return (
        <select
            required={true}
            value={value}
            onChange={(event) => {
            setValue(event.target.value);
            }}
        >
            <option value="">Select...</option>
            {statusOptions.map((status, index) => (
            <option key={index} value={status}>
                {status}
            </option>
            ))}
        </select>
        );
    }