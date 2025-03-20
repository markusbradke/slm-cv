import DeleteVocabularyButton from '@/components/delete-vocabulary-button';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Vocabulary, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const deleteCategory = (id: string) => {
        if (confirm('Are you sure?')) {
            router.delete(route('vocabularies.destroy', { id }));
            toast.success('Vocabulary successfully deleted');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vocabularies" />
            <div className="mt-4">
                {auth?.user && 
                <Link href={`vocabularies/create`}>
                    <Button>Create New</Button>
                </Link>
                }
                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vocabulary</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Term Count</TableHead>
                            {auth?.user && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vocabularies.map((vocabulary) => (
                            <TableRow key={vocabulary.id}>
                                <TableCell>
                                        <a href={`/vocabularies/${vocabulary.uuid}`} className="hover:underline">
                                            {vocabulary.name}
                                        </a>
                                    </TableCell>
                                <TableCell>{vocabulary?.description}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{vocabulary.terms_count}</Badge>
                                </TableCell>
                                {auth?.user && 
                                <TableCell className="flex gap-2">
                                    <Link href={`terms?vocabulary=${vocabulary.slug}`}>
                                        <Button variant="outline">Show Terms</Button>
                                    </Link>
                                    <Link href={`/vocabularies/${vocabulary?.uuid}/edit`}>
                                        <Button className={buttonVariants({ variant: 'default' })}>Edit</Button>
                                    </Link>
                                    <DeleteVocabularyButton id={vocabulary.uuid} />
                                </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
