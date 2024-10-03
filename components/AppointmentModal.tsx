import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Appointment } from '@/types/appwrite.types';
import AppointmentForm from './forms/AppointmentForm';
const AppointmentModal = ({
    type,
    patientId,
    userId,
    appointment,
}: {
    type: 'schedule' | 'cancel',
    patientId:string,
    userId:string,
    appointment?: Appointment

}) => {
    const [open, setOpen] = useState(false);

return (
    <div>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
                {type}
            </Button>
        </DialogTrigger>
        <DialogContent className='shad-dialog sm:max-w-md p-4 '>
            <DialogHeader className='mb-7 space-y-3'>
                <DialogTitle className='capitalize text-lg font-semibold leading-snug'>{type} Appointment</DialogTitle>
                <DialogDescription className='text-sm text-gray-500 leading-relaxed'>
                    Please follow the instructions below to {type} an appointment.
                </DialogDescription>
            </DialogHeader>

            <AppointmentForm
            userId={userId}
            patientId={patientId}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
            />
        </DialogContent>
    </Dialog>
</div>

)
}

export default AppointmentModal
