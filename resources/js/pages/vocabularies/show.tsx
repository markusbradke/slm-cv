import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Vocabulary, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Show({ vocabulary }: { vocabulary: Vocabulary }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Vocabularies',
            href: '/vocabularies',
        },
        {
            title: vocabulary.name,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${vocabulary.name} - Vocabularies`} />

            <div className="mt-4">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Vocabulary Name</TableCell>
                            <TableCell>{vocabulary.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Vocabulary ID</TableCell>
                            <TableCell>{vocabulary.uuid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Vocabulary Slug</TableCell>
                            <TableCell>{vocabulary.slug}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Description</TableCell>
                            <TableCell>{vocabulary?.description}</TableCell>
                        </TableRow>
                            <TableCell className="font-medium">Number of Terms</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Badge variant="outline" className='border-green-700'>{vocabulary?.terms_count}</Badge>
                                <Link href={`/terms?vocabulary=${vocabulary?.slug}`}>
                                    <Button variant="outline" className="cursor-pointer" size="sm">View Terms</Button>
                                </Link>
                            </TableCell>
                        <TableRow>
                            <TableCell className="font-medium">Updated At</TableCell>
                            <TableCell>{vocabulary.updated_at}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div>
                {auth?.user && (
                    <Link href={`/vocabularies/${vocabulary.uuid}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                )}
            </div>
        </AppLayout>
    );
}
