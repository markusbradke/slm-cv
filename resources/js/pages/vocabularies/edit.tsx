import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Vocabulary, type BreadcrumbItem } from '@/types';
import { Textarea } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

type EditVocabularyForm = {
    name?: string;
    slug?: string;
    description?: string;
};

export default function Edit({ vocabulary } : { vocabulary: Vocabulary}) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    if (!auth) {
        router.visit('/login');
        return null;
    }

    const vocabularyName = useRef<HTMLInputElement>(null);
    const vocabularySlug = useRef<HTMLInputElement>(null);
    const vocabularyDescription = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<Required<EditVocabularyForm>>({
        name: vocabulary.name || '',
        slug: vocabulary.slug || '',
        description: vocabulary.description || '',
    });

    const updateVocabulary: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('vocabularies.update', vocabulary.uuid), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Vocabulary successfully updated.');
                router.visit('vocabularies');
            },
            onError: (errors) => {
                toast.error('There was an error updating the vocabulary.');
            },
        });
    };

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
            href: `/vocabularies/${vocabulary?.slug}`,
        },
        {
            title: 'Update',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Update ${vocabulary.name} - Vocabularies`} />

            <div className="mt-4">
                <form onSubmit={updateVocabulary} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Vocabulary Name *</Label>

                        <Input
                            id="name"
                            ref={vocabularyName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Vocabulary Slug *</Label>

                        <Input
                            id="name"
                            ref={vocabularySlug}
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="mt-1 block w-full"
                            disabled
                        />
                        
                        <InputError message={errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>

                        <Textarea
                            id="description"
                            ref={vocabularyDescription}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.description} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Edit Vocabulary</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
