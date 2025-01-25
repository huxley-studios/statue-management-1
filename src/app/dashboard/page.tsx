'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import OrderList from './components/OrderList'
import GiftCardList from './components/GiftCardList'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) return <div>Loading...</div>

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Statue Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Direct Orders</h2>
          <OrderList />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Gift Cards</h2>
          <GiftCardList />
        </div>
      </div>
    </main>
  )
}
