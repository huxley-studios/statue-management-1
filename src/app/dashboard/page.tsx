import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Statue Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Direct Orders</h2>
          {/* Order list will go here */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Gift Cards</h2>
          {/* Gift card list will go here */}
        </div>
      </div>
    </main>
  )
}
