'use client'

import {useState, useEffect} from 'react'
import {useRouter, useParams} from 'next/navigation'

export default function EditCar(){
    const params = useParams()
    const id = params.id
    const router = useRouter()
    const [error, setError] = useState('')
    //const [loading, setLoading] = useState('false')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [kilometers, setKilometers] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        fetch(`/api/cars/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTitle(data.car.title)
            setDescription(data.car.description)
            setBrand(data.car.brand)
            setModel(data.car.model)
            setYear(data.car.year)
            setKilometers(data.car.kilometers)
            setPrice(data.car.price)
        })
    }, [])
    
     const handleSubmit = async () => {
        //validation
        if(!title||!description||!brand||!model||!year||!kilometers||!price){
            setError('All fields are required')
            return
        }
        const response = await fetch(`/api/cars/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, description, brand, model, year: parseInt(year), kilometers: parseInt(kilometers), price: parseFloat(price)})
        })

        const data = await response.json()

        if(response.ok){
            router.push(`/cars/${id}`)
        }
        else{
            setError('Something went wrong')
            return
        }
    }
    return(
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit a Car</h1>

            {error &&(
                <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>
            )}

            <div className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Model</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Kilometers</label>
                    <input
                        type="number"
                        value={kilometers}
                        onChange={(e) => setKilometers(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <div>
                    <label className="block mb-1 font-medium">€Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500">
                        Submit
                </button>
            </div>
        </div>
    )
}