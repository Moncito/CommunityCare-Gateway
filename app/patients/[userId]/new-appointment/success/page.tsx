import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

//http://localhost:3000/patients/66f26403000a45ede6c0/new-appointment/success?appointmentId=66fcc873000d51248a48
const Success = async ({params:{userId}, searchParams}: SearchParamProps) => {
const appointmentId = searchParams?.appointmentId as string || '';
const appointment = await getAppointment(appointmentId);

const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)

return (
    <div className="flex flex-col items-center justify-center text-center h-screen max-h-screen px-[5%]">
    <div className="success-img">
        <Link href='/'>
        <Image
        src="/assets/icons/care-full.svg"
        height={1000}
        width={1000}
        alt='logo'
        className='h-60 w-fit -mb-32'
        />
        </Link>
        
        <section className='flex flex-col items-center'>
        <Image
        src="/assets/gifs/success.gif"
        height={300}
        width={280}
        alt='success'
        />
        <h2 className='header mb-6 max-w-[600px] text-center'>
            Your <span className='text-green-500'>Appointment Request</span> has been successfully submitted!
        </h2>
        </section>
        <p className='mb-12'>We will be in touch shortly to confirm.</p>
    </div>

    <section className='request-details gap-6'>
        <p>Requested Appointment Details:</p>
        <div className='flex items-center gap-6 '>
            <Image
            src={doctor?.image!}
            alt='doctor'
            height={100}
            width={100}
            className='size-6'
            />

            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
            <div className='flex gap-2'>
                <Image
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt='calendar'
                />
                <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
        </div>

        <Button variant="outline" className="shad-primary-btn" asChild>
        <Link href={`/patients/${userId}/new-appointment`}>
        New Appointment
        </Link>
        </Button>

        <p className='copyright'> © 2024  CommunityCare Gateway</p>
    </section>
    </div>
)
}

export default Success
