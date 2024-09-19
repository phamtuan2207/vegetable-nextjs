import { RegisterForm } from "@/components/form/auth-form"

const RegisterPage = () => {

    return (
        <div>
            <div className='max-w-3xl md:mx-auto mx-4 my-10 md:px-10 px-2 py-10 border-[1px] border-primary1 rounded-md'>
                <div className='flex'>
                    <div className='w-1/2 sm:flex items-center hidden'>
                        <img src='/login.png' alt='login' className='w-full' />
                    </div>
                    <div className='sm:w-1/2 w-full flex items-center flex-wrap'>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage