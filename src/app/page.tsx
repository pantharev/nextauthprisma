import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-y-5">
      Nextjs 14, Prisma, auth js template app

      <p>To begin, please use the Login button to access the protected page below. If you try to access the protected page before login in, it should redirect you to this home page</p>
      <Link href="/api/auth/signin?callbackUrl=/protected" className="bg-blue-500 p-5">
        Login
      </Link>
      <Link href="/protected" className="bg-blue-500 p-5">
        Protected Page
      </Link>
    </main>
  )
}
