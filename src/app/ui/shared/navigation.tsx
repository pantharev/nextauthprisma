
'use client'
import Link from 'next/link'

import { Sidebar } from 'flowbite-react';
import { HiUser, HiHome, HiBookOpen } from 'react-icons/hi';

export default function Navigation() {

    const navLinks = [
        { href: "/", label: "Home", icon: HiHome },
        { href: "/posts", label: "Posts", icon: HiBookOpen },
        { href: "/protected", label: "Profile Page", icon: HiUser },
    ]

    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className="bg-gray-800 text-white">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                {navLinks.map((link) => {
                    return (
                        <Link href={link.href} key={link.href}>
                            <Sidebar.Item href={link.href} icon={link.icon} className="p-3">
                                {link.label}
                            </Sidebar.Item>
                        </Link>
                    )
                })}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
      </Sidebar>
    )

    // return (
    //     <div className="flex flex-col space-x-0 m-3 space-y-2 sm:flex-row items-center sm:space-x-5 sm:space-y-0 justify-start sm:justify-between">
    //         <div className="flex flex-col space-x-0 m-3 space-y-2 sm:flex-row items-center sm:space-x-5 sm:space-y-0 justify-start sm:justify-between">
    //         {navLinks.map((link) => (
    //             <Link href={link.href} key={link.href} className="nav-link">
    //                 {link.label}
    //             </Link>
    //         ))}
    //         </div>
    //         <div className="flex flex-col space-x-0 m-3 space-y-2 sm:flex-row items-center sm:space-x-5 sm:space-y-0 justify-start sm:justify-between">
    //             <Link href="/api/auth/signin?callbackUrl=/protected" className="nav-link">Sign In</Link>
    //             <Link href="/api/auth/signout" className="nav-link">Sign Out</Link>
    //         </div>
    //     </div>
    // )
}