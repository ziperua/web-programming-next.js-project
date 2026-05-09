'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'

export default function Login(){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] =useState('')

    const router = useRouter()

    const handleSubmit = async () => {
        //validation
        if(!email || !password){
            setError('All fields are required')
            return
        }
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()

        if(response.ok){
            router.push('/')
            router.refresh()

        }else{
            setError(data.message)
        }
    }
    return(
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {error &&(
                <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>
            )}

            <div className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500">
                        Login
                </button>

                <p className="text-center">
                    Don't have an account?{' '}
                    <a href="/register" className="text-yellow-600 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    )
}