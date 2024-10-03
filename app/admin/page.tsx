import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StatCard from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';

const Admin = async () => {
    try {
        const appointments = await getRecentAppointmentList();
        
        if (!appointments || !appointments.documents) {
        return <p>Error fetching data.</p>; // Handle the case where data isn't fetched correctly
        }

        return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
            <Link href='/' className='cursor-pointer'>
                <Image
                src='/assets/icons/care-full.svg'
                height={164}
                width={162}
                alt='logo'
                className='h-40 w-fit -mb-12 -mt-12'
                />
            </Link>

            <p className='text-16-semibold'> Admin Dashboard</p>
            </header>
            <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome!</h1>
                <p className='text-dark-700'>Start the day with Managing new Appointments.</p>
            </section>
            {/* Graph Table for Scheduling, Pending and Cancelled Appointments */}
            <section className='admin-stat'>
                <StatCard
                type='appointments'
                count={appointments.scheduledCount}
                label='Scheduled Appointments'
                icon='/assets/icons/appointments.svg'
                />
                <StatCard
                type='pending'
                count={appointments.pendingCount}
                label='Pending Appointments'
                icon='/assets/icons/pending.svg'
                />
                <StatCard
                type='cancelled'
                count={appointments.cancelledCount}
                label='Cancelled Appointments'
                icon='/assets/icons/cancelled.svg'
                />
            </section>
            {/* Data Table */}
            <DataTable columns={columns} data={appointments.documents} />
            </main>
        </div>
        );
    } catch (error) {
        console.error('Error loading Admin Dashboard:', error);
        return <p>Error loading data.</p>;
    }
};

export default Admin;
