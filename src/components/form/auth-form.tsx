"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import CustomFormItem from "./form-item"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import register from "@/app/(user)/register/api"
import login from "@/app/(user)/login/api"

const loginSchema = z.object({
    email: z.string()
        .email("Email invalid.")
        .min(1),

    password: z.string()
        .min(8, "Password must have length of at least 8.")
        .regex(/[A-Za-z]/, "Password must contain at least 1 letter.")
        .regex(/[0-9]/, "Password must contain at least 1 number."),
})

const registerSchema = loginSchema.extend({
    name: z.string()
        .min(1),
    confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            message: "Passwords must match",
            code: z.ZodIssueCode.custom,
        });
    }
});


export function LoginForm() {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {

        const response = await login(values)

        if (!response.ok && response.status == 401) {
            const res = await response.json()
            toast({
                title: "Sign in failed",
                description: res.message,
                className: 'text-red-700'
            })
        }
        if (response.ok) {
            const res = await response.json()
            document.cookie = `token=${res?.token}; path=/`
            router.push('/', { scroll: false })
        }
    }

    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <CustomFormItem
                        name="email"
                        label="Email"
                    />
                    <CustomFormItem
                        name="password"
                        label="Password"
                        type='password'
                    />

                    <Button type="submit" className="bg-primary1 hover:bg-primary1/90">Login</Button>
                </form>
            </FormProvider>
            <span className='mt-4'> Do not have an account? <Link href="/register" className='text-primary1 font-semibold'>Register</Link></span>
        </>
    )
}


export function RegisterForm() {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema)
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        const { confirmPassword, ...data } = values
        const response = await register(data)

        if (!response.ok && response.status == 400) {
            const res = await response.json()
            toast({
                title: "Sign up failed",
                description: res.message,
                className: 'text-red-700'
            })
        }
        if (response.ok) {

            toast({ title: "Sign Up Success", className: 'text-primary1' })
            router.push('/login', { scroll: false })
        }
    }



    return (
        <>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <CustomFormItem
                        name="email"
                        label="Email"
                    />
                    <CustomFormItem
                        name="name"
                        label="Name"
                    />
                    <CustomFormItem
                        name="password"
                        label="Password"
                        type='password'
                    />
                    <CustomFormItem
                        name="confirmPassword"
                        label="Confirm Password"
                        type='password'
                    />
                    <Button type="submit" className="bg-primary1 hover:bg-primary1/90">Register</Button>

                </form>
            </FormProvider>
            <span className='mt-4'> Already have an account. <Link href="/login" className='text-primary1 font-semibold'>Login</Link></span>
        </>

    )
}
