import Link from 'next/link'
import {cookies} from 'next/headers'

export default async function Home() {
  let isLoggedIn = false
  try{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if(token) isLoggedIn = true
  } catch {}
  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Car Marketplace</h1>
      <p className="text-gray-600 text-xl mb-8">
        Buy and sell cars easily. Find your perfect car or list yours today.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/cars"
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-yellow-500"
        >
          Browse Cars
        </Link>
        {isLoggedIn ? (
          <Link
            href="/cars/new"
            className="bg-gray-800 text-white font-bold px-6 py-3 rounded hover:bg-gray-900"
          >
            Sell a Car
          </Link>
        ) : (
          <Link
            href="/register"
            className="bg-gray-800 text-white font-bold px-6 py-3 rounded hover:bg-gray-900"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  )
}