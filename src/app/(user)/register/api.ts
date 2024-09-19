import { IUserRegister } from "../../../interface/user";

export default async function register(data: IUserRegister) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    return await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            name: data.name,
            password: data.password,
        }),
    });

}