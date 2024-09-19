import { cookies } from "next/headers"


export async function GET() {
    const token = cookies().get('token')

    return Response.json({ token: token?.value })
}