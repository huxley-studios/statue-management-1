import React from 'react';

interface StatusUpdateProps {
  orderId: string;
  currentStatus: string;
  onUpdate: () => void;
}

export default function StatusUpdate({ orderId, currentStatus, onUpdate }: StatusUpdateProps) {
  const statuses = ['new', 'processing', 'modeling', 'printing', 'qc', 'shipped'];

  async function updateStatus(newStatus: string) {
    await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    onUpdate();
  }

  return (
    <select 
      value={currentStatus}
      onChange={(e) => updateStatus(e.target.value)}
      className="mt-2 p-2 border rounded"
    >
      {statuses.map(status => (
        <option key={status} value={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </option>
      ))}
    </select>
  );
}
