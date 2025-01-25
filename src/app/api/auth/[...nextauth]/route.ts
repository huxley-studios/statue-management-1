import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null
          
          await connectDB()
          const user = await User.findOne({ email: credentials.email })
          if (!user) return null
          
          const isValid = await compare(credentials.password, user.password)
          if (!isValid) return null
          
          return { id: user._id, email: user.email, isAdmin: user.isAdmin }
        } catch (error) {
          return null
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }
