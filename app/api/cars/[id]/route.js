import {NextResponse} from 'next/server'
import prisma from '@/app/lib/prisma'
import {jwtVerify} from 'jose'

export async function GET(request, {params}){
    try{
        const id = parseInt(params.id)
        const car = await prisma.car.findUnique({where: {id}, include: {user: {select:{name:true}}}})
        if(!car){
            return NextResponse.json(
                {message: 'We found nothing'},
                {status: 404}
            )
        }
        return NextResponse.json({car})
    } catch(error){
        return NextResponse.json(
            {message: 'Something went wrong'},
            {status: 500}
        )
    }
}

export async function PUT(request, {params}){
    try{
        const id = parseInt(params.id)
        const token = await request.cookies.get('token')?.value

        if(!token){
            return NextResponse.json(
                {message: 'You need to be loged in'},
                {status: 401}
            )
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} = await jwtVerify(token, secret)
        const userId = payload.userId

        const car = await prisma.car.findUnique({where: {id}})

        if(car.userId != userId){
            return NextResponse.json(
                {message: 'You need to be the owner of car'},
                {status: 401}
            )
        }

        const {title, description, brand, model, year, kilometers, price} = await request.json()
        await prisma.car.update({where: {id}, data: {title, description, brand, model, year, kilometers, price}})

        return NextResponse.json(
            {message: 'Car was updated successfully'},
            {status: 200}
        )
    } catch(error){
        return NextResponse.json(
            {message: 'Something went wrong'},
            {status: 501}
        )
    }
}

export async function DELETE(request, {params}){
    try{
        const id = parseInt(params.id)
        const token = await request.cookies.get('token')?.value

        if(!token){
            return NextResponse.json(
                {message: 'You need to be loged in'},
                {status: 401}
            )
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} = await jwtVerify(token, secret)
        const userId = payload.userId

        const car = await prisma.car.findUnique({where: {id}})

        if(car.userId != userId){
            return NextResponse.json(
                {message: 'You need to be the owner of car'},
                {status: 401}
            )
        }

        await prisma.car.delete({where: {id}})

        return NextResponse.json(
        {message: 'Car was deleted successfully'},
        {status: 200}
        )
    } catch(error){
        return NextResponse.json(
            {message: 'Something went wrong'},
            {status: 501}
        )
    }

}