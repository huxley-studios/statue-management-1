'use client';
import { useState } from 'react';

export default function RedeemPage() {
  const [code, setCode] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </form>
  );
}
