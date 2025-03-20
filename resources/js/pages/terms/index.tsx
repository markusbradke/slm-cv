import StatusBadge from '@/components/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedTerms, SharedData, Vocabulary, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Filter from './filter';
import DeleteTermButton from '@/components/delete-term-button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Index({ terms, vocabularies }: { terms: PaginatedTerms; vocabularies: Vocabulary[] }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    // Extract URL parameters
    const urlParams = new URLSearchParams(page.url.split('?')[1]);
    const vocabularySlug = urlParams.get('vocabulary');
    const statusParam = urlParams.get('status');
    const currentPage = parseInt(urlParams.get('page') || '1');
    const vocabulary = vocabularies.find((vocab) => vocab.slug === vocabularySlug);

    const [filters, setFilters] = useState<{ status: string | null; vocabulary: string | null }>({
        status: statusParam || null,
        vocabulary: vocabularySlug || null,
    });

    const statuses = ['accepted', 'pending', 'rejected', 'deprecated', 'suggested'];

    // Sync filters when the URL changes
    useEffect(() => {
        setFilters({
            status: statusParam || null,
            vocabulary: vocabularySlug || null,
        });
    }, [page.url]);

    // Handle filter changes and update URL
    const handleFilterChange = (newFilters: { status: string | null; vocabulary: string | null }) => {
        setFilters(newFilters);

        // Construct new URL parameters
        const params = new URLSearchParams();
        if (newFilters.status) params.set('status', newFilters.status);
        if (newFilters.vocabulary) params.set('vocabulary', newFilters.vocabulary);

        // Reset page to 1 when filters change
        params.set('page', '1');

        // Update the URL
        router.get(`${page.url.split('?')[0]}?${params.toString()}`);
    };

    // Handle pagination updates
    const handlePageChange = (pageNumber: number) => {
        const params = new URLSearchParams(page.url.split('?')[1]);
        params.set('page', pageNumber.toString());

        if (filters.vocabulary) params.set('vocabulary', filters.vocabulary);
        if (filters.status) params.set('status', filters.status);

        router.get(`${page.url.split('?')[0]}?${params.toString()}`);
    };

    // Delete Term
    const deleteTerm = (id: string) => {
        if (confirm('Are you sure?')) {
            router.delete(route('terms.destroy', { id }));
            toast.success('Term successfully deleted');
        }
    };

    // Filtered terms based on current filters
    const filteredTerms = terms.data.filter((term) => {
        return (!filters.status || term.status === filters.status) && (!filters.vocabulary || term.vocabulary?.slug === filters.vocabulary);
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Terms', href: '/terms' },
        { title: vocabulary?.name || 'All', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Terms" />
            <div className="mt-4">
                {auth?.user && (
                    <Button className="mr-2" asChild>
                        <a href={`/terms/create?vocabulary=${filters.vocabulary || ''}`}>Create New</a>
                    </Button>
                )}

                {/* Filter Component */}
                <Filter vocabularies={vocabularies} statuses={statuses} onFilterChange={handleFilterChange} initialFilters={filters} />
                <div className="mt-4 flex gap-2">
                    {filters.status && (
                        <Badge variant="outline" className="px-3 py-1">
                            Status: {filters.status}
                        </Badge>
                    )}
                    {filters.vocabulary && (
                        <Badge variant="outline" className="px-3 py-1">
                            Vocabulary: {filters.vocabulary}
                        </Badge>
                    )}
                </div>
                {/* Terms Table */}
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Term Name</TableHead>
                            <TableHead>Definition</TableHead>
                            <TableHead>Vocabulary</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Updated At</TableHead>
                            {auth?.user && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTerms.length > 0 ? (
                            filteredTerms.map((term) => (
                                <TableRow key={term.id}>
                                    <TableCell>
                                        <a href={`/terms/${term.uuid}`} className="hover:underline">
                                            {term.name}
                                        </a>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        <span title={term.definition}>
                                            {term?.definition && term?.definition?.length > 100
                                                ? `${term.definition.slice(0, 100)}...`
                                                : term.definition}
                                        </span>
                                    </TableCell>
                                    <TableCell>{term?.vocabulary?.name}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={term.status} />
                                    </TableCell>
                                    <TableCell>
                                        {term?.updated_at ? dayjs(term.updated_at).fromNow() : ''}
                                    </TableCell>
                                    {auth?.user && (
                                        <TableCell className="flex gap-2">
                                            <Link href={`/terms/${term.uuid}/edit`}>
                                                <Button className={buttonVariants({ variant: 'default' })}>Edit</Button>
                                            </Link>
                                            <DeleteTermButton id={term.uuid} />
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                                    No entries found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Entries: {terms.total}</span>
                    <nav>
                        <ul className="flex space-x-2">
                            {/* Previous Button */}
                            {terms.prev_page_url && (
                                <li>
                                    <Button variant="outline" className="text-gray-500" onClick={() => handlePageChange(currentPage - 1)}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                </li>
                            )}

                            {/* Pagination Links */}
                            {terms.links.map((link) => {
                                if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                                    return null;
                                }

                                return (
                                    <li key={link.label}>
                                        <Button
                                            variant="outline"
                                            className={`${link.active ? 'bg-primary-500 text-white' : 'text-gray-500'}`}
                                            onClick={() => handlePageChange(parseInt(link.label))}
                                        >
                                            {link.label}
                                        </Button>
                                    </li>
                                );
                            })}

                            {/* Next Button */}
                            {terms.next_page_url && (
                                <li>
                                    <Button variant="outline" className="text-black" onClick={() => handlePageChange(currentPage + 1)}>
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
