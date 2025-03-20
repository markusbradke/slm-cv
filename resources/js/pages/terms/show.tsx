import StatusBadge from '@/components/status-badge';
import TermJsonDrawer from '@/components/term-json-drawer';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Term, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

export default function Show({ term }: { term: Term }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Terms',
            href: '/terms',
        },
        {
            title: term?.vocabulary?.name,
            href: `/terms?vocabulary=${term?.vocabulary?.slug}`,
        },
        {
            title: term.name,
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${term.name} - Terms`} />

            <div className="mt-4">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Term Name</TableCell>
                            <TableCell>{term.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Term ID</TableCell>
                            <TableCell>{term.uuid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Vocabulary</TableCell>
                            <TableCell>
                                <Link href={`/vocabularies/${term.vocabulary?.slug}`}>{term.vocabulary?.name}</Link>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Definition</TableCell>
                            <TableCell>{term.definition}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Provenance</TableCell>
                            <TableCell>{term.provenance}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Provenance URI</TableCell>
                            <TableCell>
                                {term?.provenance_uri &&
                                    <a
                                        href={term.provenance_uri}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 hover:underline"
                                    >
                                        {term.provenance_uri}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Discussion URL</TableCell>
                            <TableCell>
                                {term?.discussion_url &&
                                    <a
                                        href={term.discussion_url}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="flex items-center gap-2 hover:underline"
                                    >
                                        {term.discussion_url}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Status</TableCell>
                            <TableCell>
                                <StatusBadge status={term.status} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Notes</TableCell>
                            <TableCell>
                                {term?.notes}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Updated At</TableCell>
                            <TableCell>{term.updated_at}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Formats</TableCell>
                            <TableCell>
                                <TermJsonDrawer uuid={term.uuid} format='json'/>
                                <TermJsonDrawer uuid={term.uuid} format='ld+json'/>
                                {/* <Link href={`/api/v1/terms/${term.uuid}`}>
                                    JSON-LD
                                </Link> */}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-end">
                {auth?.user && (
                    <Link href={`/terms/${term.uuid}/edit`}>
                        <Button>Edit</Button>
                    </Link>
                )}
            </div>
        </AppLayout>
    );
}
