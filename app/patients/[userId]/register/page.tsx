import React from 'react'
import Image from 'next/image'  
import RegisterForm from '@/components/forms/RegisterForms'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async ({params:{userId}}: SearchParamProps) => {
    const user = await getUser(userId);

return (
    <div className="flex h-screen max-h-screen ">

    {/* TODO: OTP Verification | Passkey Modal */}
    
    <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
    <Image
        src="/assets/icons/care-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="-ml-6 h-60 w-fit"
        />

        <RegisterForm user={user}/>

        <div className="text-14-regular mt-9  flex justify-between">
        <p className="justify-items-end text-dark-600 xl:text-left mb-5">© 2024  CommunityCare Gateway</p>

        </div>
    </div>
    </section>

    <Image
    src="/assets/images/register-img.png    "
    height={1000}
    width={1000}
    alt="patient"
    className="side-img max-w-[390px] h-auto"
    />

</div>
)
}

export default Register
