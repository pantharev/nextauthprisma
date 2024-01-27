
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-y-5">
      Nextjs 14, Prisma, auth js template app

      <p>To begin, please use the Login button to access the protected (profile) page or the Posts page below. If you try to access the protected page before login in, it should redirect you to this home page</p>
      <Link href="/api/auth/signin?callbackUrl=/posts" className="bg-green-500 p-5 hover:bg-green-400">
        Login
      </Link>
      <div className="flex space-x-5">
        <Link href="/protected" className="bg-blue-500 p-5 hover:bg-blue-400">
          Protected Page
        </Link>
        <Link href="/posts" className="bg-blue-500 p-5 hover:bg-blue-400">
          Posts Page
        </Link>
      </div>
    </main>
  )
}

