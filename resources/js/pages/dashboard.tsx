import DashboardCard from '@/components/dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Contributing({ terms_count, vocabularies_count } : {terms_count: number, vocabularies_count: number}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='mt-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <DashboardCard title="Number of Vocabularies" count={vocabularies_count} link={'/vocabularies'} />
                    <DashboardCard title="Number of Terms" count={terms_count} link={'/terms'} />
                </div>
            </div>
        </AppLayout>
    );
}
