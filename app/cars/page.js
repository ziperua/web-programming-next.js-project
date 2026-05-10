import prisma from '@/app/lib/prisma' 
import Link from 'next/link'

export default async function CarsPage(){
    const cars = await prisma.car.findMany({ include: { user: { select: { name: true } } } })
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
                    {cars.map((car) => (
                    <div key={car.id} className="border rounded p-4 shadow">
                        <h2 className="text-xl font-bold">{car.title}</h2>
                        <p>{car.brand} {car.model} - {car.year}</p>
                        <p className="text-gray-500">{car.kilometers} km</p>
                        <p className="font-bold text-yellow-600">€{car.price}</p>
                        <p className="text-sm text-gray-400">Seller: {car.user.name}</p>
                        <Link
                            href={`/cars/${car.id}`}
                            className="text-yellow-600 hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}