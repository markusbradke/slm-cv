import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedTerms, Term, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Index({ terms }: { terms: PaginatedTerms }) {
    const page = usePage();
    const urlParams = new URLSearchParams(page.url.split('?')[1]); // Get query params
    const vocabulary = urlParams.get('vocabulary');

    const deleteTerm = (id: number) => {
        if (confirm('Are you sure?')) {
            router.delete(route('terms.destroy', { id }));
            toast.success('Term successfully deleted');
        }
    }

    const updateUrlWithPage = (url: string, page: number) => {
        const params = new URLSearchParams(url.split('?')[1]);
        params.set('page', page.toString()); // Replace the "page" query parameter
        if (vocabulary) {
            params.set('vocabulary', vocabulary); // Ensure the "vocabulary" filter is preserved
        }
        return `${url.split('?')[0]}?${params.toString()}`;
    };

    const handlePageChange = (url: string) => {
        router.get(url); // This triggers a page change when a pagination link is clicked
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Terms',
            href: '/terms',
        },
        { title: vocabulary || 'all', href: '#' },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Terms" />
            <div className='mt-4'>
                <Link href={`/terms/create?vocabulary=${vocabulary}`}>
                    <Button variant="outline">Create New</Button>
                </Link>
                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Term Name</TableHead>
                            <TableHead>Definition</TableHead>
                            <TableHead>Vocabulary</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {terms.data?.length > 0 ? (
                            terms.data?.map((term) => (
                                <TableRow key={term.id}>
                                    <TableCell>{term.name}</TableCell>
                                    <TableCell>{term?.definition}</TableCell>
                                    <TableCell>{term?.vocabulary?.name}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                term.status === "pending" && "bg-yellow-500 text-black",
                                                term.status === "rejected" && "bg-red-500 text-white",
                                                term.status === "accepted" && "bg-green-500 text-white",
                                                term.status === "deprecated" && "bg-gray-500 text-white"
                                            )}
                                        >
                                            {term.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href="">
                                            <Button className={buttonVariants({ variant: 'default' })}>
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTerm(term.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                    No entries found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>


                <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
                Total Entries: {terms.total}
            </span>
            <nav>
                <ul className="flex space-x-2">
                    {/* Previous Button */}
                    {terms.prev_page_url && (
                        <li>
                            <Button
                                variant="outline"
                                className="text-gray-500"
                                onClick={() => handlePageChange(updateUrlWithPage(terms.prev_page_url, parseInt(terms.label)))}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </li>
                    )}

                    {/* Pagination Links */}
                    {terms.links.map((link) => {
                        // Skip rendering previous/next buttons which are already handled
                        if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                            return null;
                        }

                        return (
                            <li key={link.label}>
                                <Button
                                    variant="outline"
                                    className={`${
                                        link.active
                                            ? 'bg-primary-500 text-white'
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() =>
                                        handlePageChange(updateUrlWithPage(link.url, parseInt(link.label)))
                                    }
                                >
                                    {link.label}
                                </Button>
                            </li>
                        );
                    })}

                    {/* Next Button */}
                    {terms.next_page_url && (
                        <li>
                            <Button
                                variant="outline"
                                className="text-black"
                                onClick={() => handlePageChange(updateUrlWithPage(terms.next_page_url, parseInt(terms.label)))}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>

            </div>
        </AppLayout>
    );
}
