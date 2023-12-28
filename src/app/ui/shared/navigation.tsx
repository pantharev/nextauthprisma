import Link from 'next/link'

export default function Navigation() {

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/posts", label: "Posts" },
        { href: "/protected", label: "Protected Page" },
    ]

    return (
        <div className="flex flex-col space-x-0 m-3 space-y-2 sm:flex-row items-center sm:space-x-5 sm:space-y-0 justify-start sm:justify-between">
            <div className="flex flex-col space-x-0 m-3 space-y-2 sm:flex-row items-center sm:space-x-5 sm:space-y-0 justify-start sm:justify-between">
            {navLinks.map((link) => (
                <Link href={link.href} key={link.href} className="nav-link">
                    {link.label}
                </Link>
            ))}
            </div>
            <div className="flex flex-col space-x-0 m-3 space-y-2 sm:flex-row items-center sm:space-x-5 sm:space-y-0 justify-start sm:justify-between">
                <Link href="/api/auth/signin?callbackUrl=/protected" className="nav-link">Sign In</Link>
                <Link href="/api/auth/signout" className="nav-link">Sign Out</Link>
            </div>
        </div>
    )
}