'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (result?.ok) router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  )
}
