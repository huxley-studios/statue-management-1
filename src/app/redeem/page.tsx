'use client';
import { useState } from 'react';

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [plinth, setPlinth] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/gift-cards/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        address,
        plinthChoice: plinth
      })
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <input
        type="text"
        placeholder="Gift Card Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      {/* Address fields */}
    </form>
  );
}
