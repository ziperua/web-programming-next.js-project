'use client'

import {useRouter} from 'next/navigation'

export default function DeleteButton({carId}){
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this car?')) return

        const response = await fetch(`/api/cars/${carId}`, {
            method: 'DELETE'
        })

        if(response.ok){
            router.push('/cars')
            router.refresh()
        }
    }
    return(
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white fonr-bold py-2 px-4 rounded hover:bg-red-600"
            >
                Delete
            </button>
    )
}