import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/app/lib/prisma'

export async function POST(request){
    try{
        const {email, password} = await request.json()

        //validation
        if(!email || !password){
            return NextPesponse.json(
                {message: 'All field are required'},
                {status: 400}
            )
        }

        //check if user exists
        const user = await prisma.user.findUnique({
            where: {email}
        })

        //if user not found
        if(!user){
            return NextResponse.json(
                {message: 'Invalid credentials'},
                {status: 401}
            )
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            return NextResponse.json(
                {message: 'Invalid credentials'},
                {status: 401}
            )
        }
        
        //generate JWT
        const token = jwt.sign(
            {userId: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        //answer
        const response = NextResponse.json({
            message: 'Login successful',
            user: {id: user.id, name: user.name, email: user.email},

        })

        //saving token in cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 *60 * 24 * 7, //7 days in seconds
        })
        
        return response

    } catch (error){
        return NextResponse.json(
            {message: 'Something went wrong'},
            {status: 500}
        )
    }
}