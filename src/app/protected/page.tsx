import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProtectedPage() {
    const session = await auth(); // the auth function will return the session if the user is logged in, or null if not logged in
    
    if(!session?.user) { // redirect user to home page if not logged in
        redirect('/');
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify p-24 gap-y-5">
            <h1 className="underline text-xl">Protected Page</h1>
            <Link href="api/auth/signout" className="bg-blue-500 p-5">Sign Out</Link>
            <p>Hi {session?.user?.name}!</p>
            <p>Your email is: {session?.user?.email}.</p>
            <p>(For developers: your prisma user id is: {session?.user?.id})</p>
            <Image src={session?.user?.image} width={300} height={300} alt="Picture of the github user" />
        </main>
    )
}