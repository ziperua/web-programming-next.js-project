import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/app/lib/prisma'

export async function POST(request){
    try{
        const {name, email, password} = await request.json()

        //validation
        if(!name || !email || !password){
            return NextResponse.json(
                { message: 'All fields are required'},
                { status: 400}
            )
        }

        if (password.length < 6){
            return NextResponse.json(
                { message: 'Password must be at list 6 chracters'},
                {status: 400}
            )
        }

        //check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser){
            return NextResponse.json(
                { message: 'Email already in use'},
                {status: 400}
            )
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json(
            { message: 'Account created successfully!'},
            {status: 201}
        )
    } catch (error){
        return NextResponse.json(
            { message: 'Something went wrong'},
            { status: 500}
        )
    } 
}