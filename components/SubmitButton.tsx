import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image';
// import { ButtonProps } from './ui/button'

interface ButtonProps{
    isLoading:boolean,
    className?:string,
    children: React.ReactNode
}

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
        {isLoading?(
            <div>
            <Image
            src="/assets/icons/loader.svg"
            alt="loader"
              width={24}   // Corrected syntax
              height={24}  // Corrected syntax
            className="animate-spin"
            />
            Loading....
        </div>
        ):children}

    </Button>
)
}

export default SubmitButton
