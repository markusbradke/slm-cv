import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contributing',
        href: '/contributing',
    },
];

export default function Contributing() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contributing" />
            <div className="mt-4">
                Information for users how to contribute goes here.
            </div>
        </AppLayout>
    );
}
