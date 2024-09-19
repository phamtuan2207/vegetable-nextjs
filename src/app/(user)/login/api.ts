import { IUserLogin } from "../../../interface/user";

export default async function login(data: IUserLogin) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    return await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    });
}