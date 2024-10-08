import { withAuth } from 'next-auth/middleware'

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
  });

export const config = { matcher: ["/dashboard/:path*"] }
// export const config = { matcher: ["/dashboard/settings"] }