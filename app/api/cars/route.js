import prisma from '@/app/lib/prisma'
import {NextResponse} from 'next/server'
import {jwtVerify} from 'jose'

export async function GET(){
    const cars = await prisma.car.findMany({include: {user: {select: {name: true}}}})
    return NextResponse.json({cars})
}

export async function POST(request){
    const token = request.cookies.get('token')?.value

    if(!token){
        return NextResponse.json(
            {message: 'You need to be logged in'},
            {status: 401}
        )
    }
    
    try{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} = await jwtVerify(token, secret)
        const userId = payload.userId

        //writing data from request and validation on the next line
        const {title, description, brand, model, year, kilometers, price} = await request.json()

        if(!title|| !description|| !brand|| !model|| !year|| !kilometers|| !price){
            return NextResponse.json(
                {message:'All fields are required'},
                {status: 400})
        }

        const car = await prisma.car.create({data: {title, description, brand, model, year, kilometers, price, userId}})

        return NextResponse.json(
            {car},
            {status: 201}
        )
    } catch(error){
        return NextResponse.json(
            {message: 'Something went wrong'},
            {status: 500}
        )
    }
}   