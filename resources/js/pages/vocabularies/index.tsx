import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Vocabulary, Term, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Vocabularies',
        href: '/vocabularies',
    },
];

export default function Index({ vocabularies }: { vocabularies: Vocabulary[] }) {
    const deleteCategory= (id: string) => {
        if (confirm('Are you sure?')) {
            router.delete(route('vocabularies.destroy', { id }));
            toast.success('Vocabulary successfully deleted');
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div>
                <Link href={`vocabularies/create`} className='mt-4'>
                    <Button variant="outline">Create New</Button>
                </Link>
                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vocabulary</TableHead>
                            <TableHead>Term Count</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vocabularies.map((vocabulary) => (
                            <TableRow key={vocabulary.id}>
                                <TableCell>
                                    {vocabulary.name}
                                </TableCell>
                                <TableCell>
                                    <Badge>{vocabulary.terms_count}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`terms?vocabulary=${vocabulary.slug}`}>
                                        <Button variant="outline">Show Terms</Button>
                                    </Link>
                                    <Link href="">
                                        <Button className={buttonVariants({variant: 'default'})}>
                                            Edit
                                        </Button>
                                    </Link>
                                    
                                    <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteCategory(vocabulary.slug)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
