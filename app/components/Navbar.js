'use client'

import Link from 'next/link'
import {useRouter} from 'next/navigation' //as useNavigate in react
import {useState, useEffect} from 'react'

export default function Navbar(){
    const [user, setUser] = useState(null)
    const router = useRouter()
    // checks if we have user
    useEffect(() => {
        fetch('api/auth/me')
            .then(res => res.json())
            .then(data => {
              if (data.user) setUser(data.user)
        })
        .catch(() => {})
    }, [])
    //logout with pushing user to home page and refreshing to have the fresh page
    const handleLogout = async () => {
        await fetch('/api/auth/logout', {method: 'POST'})
        setUser(null)
        router.push('/')
        router.refresh()
    }

    return(
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-yellow-400">
            Car Marketplace
            </Link>

            <div className="flex gap-4 items-center">
                <Link href="/cars" className="hover:text-yellow-400">
                Browse Cars
                </Link>
                {user ? (
                    <>
                    <Link href="/cars/new" className="hover:text-yellow-400">
                    Sell a Car
                    </Link>
                    <span className="text-gray-400">Hi {user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </>
                    //if not:
                ) : (
                    <>
                    <Link href="/login" className="hover:text-yellow-400">
                        Login
                    </Link>
                    <Link
                    href="/register"
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                    >
                        Register
                    </Link>
                    </>
                )}
            </div>
        </nav>
        
    )
}