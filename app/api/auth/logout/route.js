import {NextResponse} from 'next/server'

export async function POST(request){
    const response = NextResponse.json(
        {message: 'you were loged out succesfully'},
        {status: 200}   
    )
    response.cookies.delete('token')
    return response
}