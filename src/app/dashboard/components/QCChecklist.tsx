export default function QCChecklist({ orderId }) {
  const [checks, setChecks] = useState({
    modelQuality: false,
    printing: false,
    finishing: false,
    packaging: false
  });

  async function updateQC(field: keyof typeof checks) {
    setChecks(prev => ({...prev, [field]: !prev[field]}));
    await fetch(`/api/orders/${orderId}/qc`, {
      method: 'PUT',
      body: JSON.stringify({ checks })
    });
  }

  return (
    <div className="mt-4">
      {Object.entries(checks).map(([key, value]) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value}
            onChange={() => updateQC(key as keyof typeof checks)}
          />
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
      ))}
    </div>
  );
}
