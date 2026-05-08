import {NextResponse} from 'next/server'
import {jwtVerify} from 'jose'
import prisma from '@/app/lib/prisma'

export async function GET(request){
    const token = request.cookies.get('token')?.value

    if(!token){
        return NextResponse.json(
            {message: 'Not authenticated'},
            {status:401}
        )
    }
    try{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} = await jwtVerify(token, secret)

        const user = await prisma.user.findUnique({
            where: {id: payload.userId}
        })
        if(!user){
            return NextResponse.json(
                {status: 401}
            )
        }
        return NextResponse.json({
        user: {id: user.id, name: user.name, email: user.email}
        })
    } catch {
        return NextResponse.json(
            {message: 'Something went wrong'},
            {status: 401}
        )
    }
}