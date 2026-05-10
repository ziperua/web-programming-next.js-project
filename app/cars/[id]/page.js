import prisma from '@/app/lib/prisma'
import Link from 'next/link'
import DeleteButton from '@/app/components/DeleteButton'
import {cookies} from 'next/headers'
import {jwtVerify} from 'jose'
//import {NextReposne} from 'next/server'

export default async function CarPage({params}){
    const {id: idString} = await params
    const id = parseInt(idString)

    const car = await prisma.car.findUnique(
        {where: {id}, include: {user: {select: {name:true}}}})
    
        if(!car){
            return 'Car not found'
        }
        let currentUserId = null
        try{
            const cookieStore = await cookies()
            const token = cookieStore.get('token')?.value

            if(token){
                const secret = new TextEncoder().encode(process.env.JWT_SECRET)
                const{payload} = await jwtVerify(token, secret)
                
                currentUserId = payload.userId
            }
        } catch{}
        const isOwner = currentUserId === car.userId
        return(
            <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6">Browse Cars</h1>

                <div className="flex flex-col gap-4">
                    <p className="text-center">
                        <a href="/cars/new" className="text-yellow-600 hover:underline">
                            Sell a Car
                        </a>
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <h2 className="text-xl font-bold">{car.title}</h2>
                        <p>{car.brand} {car.model} - {car.year}</p>
                        <p className="text-gray-500">{car.kilometers} km</p>
                        <p className="font-bold text-yellow-600">€{car.price}</p>
                        <p className="font-bold text-yellow-600">{car.description}</p>
                        <p className="text-sm text-gray-400">Seller: {car.user.name}</p>
                    </div>

                    {isOwner && (
                        <>
                        <Link href={`/cars/${id}/edit`} className="bg-yellow-400 text-black font-bold py-2 px-4 rounded">
                            Edit
                        </Link>
                        
                        <DeleteButton carId={id}/>
                        </>
                    )}

                    <Link href="/cars" className="bg-gray-200 tetx-black font-bold py-2 px-4 rounded">
                        Back to list
                    </Link>
                </div>
            </div>
        )
}