import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Vocabulary, type BreadcrumbItem } from '@/types';
import { Textarea } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

type CreateTermForm = {
    name?: string;
    definition?: string;
    provenance?: string;
    provenance_uri?: string;
    discussion_url?: string;
    notes?: string;
    status?: string;
    vocabulary_id?: string;
};

export default function Create({ vocabularies }: { vocabularies: Vocabulary[] }) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    if (!auth) {
        router.visit('/login');
        return null;
    }

    // Extract URL parameters
    const urlParams = new URLSearchParams(page.url.split('?')[1]);
    const vocabularySlug = urlParams.get('vocabulary');

    const termName = useRef<HTMLInputElement>(null);
    const termDefinition = useRef<HTMLInputElement>(null);
    const termProvenance = useRef<HTMLInputElement>(null);
    const termProvenanceUri = useRef<HTMLInputElement>(null);
    const termDiscussionUrl = useRef<HTMLInputElement>(null);
    const termNotes = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm<Required<CreateTermForm>>({
        name: '',
        definition: '',
        provenance: '',
        provenance_uri: '',
        discussion_url: '',
        notes: '',
        vocabulary_id: '',
        status: 'pending',
    });

    const createTask: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('terms.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Term successfully created.');
                router.visit('terms');
            },
            onError: (errors) => {
                toast.error('There was an error creating the term.');
            },
        });
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
        {
            title: 'Create',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Term" />

            <div className="mt-4">
                <form onSubmit={createTask} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Term Name *</Label>

                        <Input
                            id="name"
                            ref={termName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Vocabulary</Label>
                        <Select value={data.vocabulary_id} onValueChange={(value) => setData('vocabulary_id', value)}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select Vocabulary" />
                            </SelectTrigger>
                            <SelectContent>
                                {vocabularies.map((vocabulary) => (
                                    <SelectItem key={vocabulary.id} value={String(vocabulary.id)}>
                                        {vocabulary.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.vocabulary_id} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="definition">Definition *</Label>

                        <Textarea
                            id="definition"
                            ref={termDefinition}
                            value={data.definition}
                            onChange={(e) => setData('definition', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.definition} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="provenance">Provenance</Label>

                        <Input
                            id="provenance"
                            ref={termProvenance}
                            value={data.provenance}
                            onChange={(e) => setData('provenance', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.provenance} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="provenance_uri">Provenance URI</Label>

                        <Input
                            id="provenance_uri"
                            ref={termProvenanceUri}
                            value={data.provenance_uri}
                            onChange={(e) => setData('provenance_uri', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.provenance_uri} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="provenance_uri">Discussion URL</Label>

                        <Input
                            id="discussion_url"
                            ref={termDiscussionUrl}
                            value={data.discussion_url}
                            onChange={(e) => setData('discussion_url', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.discussion_url} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>

                        <Textarea
                            id="notes"
                            ref={termNotes}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.notes} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>

                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="deprecated">Deprecated</SelectItem>
                                <SelectItem value="suggested">Suggested</SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.status} />
                    </div>

                    <div className="flex justify-end">
                        <Button disabled={processing}>Create Term</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
