export default function InputStage({ label, value, setValue }) {
  const stageOptions = [
    'Qualification',
    'Needs Analysis',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost',
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
      {stageOptions.map((stage, index) => (
        <option key={index} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
}
