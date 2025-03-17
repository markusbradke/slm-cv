import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from '@headlessui/react';

type CreateVocabularyForm = {
    name?: string;
    slug?: string;
    description?: string;
}

export default function Create() {
    const vocabularyName = useRef<HTMLInputElement>(null);
    const vocabularySlug = useRef<HTMLInputElement>(null);
    const vocabularyDescription = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm<Required<CreateVocabularyForm>>({
        name: '',
        slug: '',
        description: '',
    });

    const createVocabulary: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('vocabularies.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {

            }
        })
    }

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
            title: 'Create',
            href: '#',
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Vocabulary" />

            <div>
                <form onSubmit={createVocabulary} className="space-y-6">
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
                    
                    {/* <div className="grid gap-2">
                        <Label htmlFor="slug">Vocabulary Slug *</Label>

                        <Input
                            id="name"
                            ref={vocabularySlug}
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        
                        <InputError message={errors.slug} />
                    </div> */}

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
                        <Button disabled={processing}>
                            Create Term
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
