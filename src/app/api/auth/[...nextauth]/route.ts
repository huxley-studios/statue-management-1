import { Auth } from "@auth/core"
import Google from "@auth/core/providers/google"

export const { GET, POST } = Auth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })]
})
