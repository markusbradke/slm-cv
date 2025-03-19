import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Vocabulary } from '@/types';
import { Label } from '@radix-ui/react-label';
import { ListFilterPlus, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilterProps {
    vocabularies: Vocabulary[];
    statuses: string[];
    onFilterChange: (filters: { status: string | null; vocabulary: string | null }) => void;
    initialFilters: { status: string | null; vocabulary: string | null };
}

export default function Filter({ vocabularies, statuses, onFilterChange, initialFilters }: FilterProps) {
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        setFilters(initialFilters); // Sync when URL changes
    }, [initialFilters]);

    const handleChange = (key: 'status' | 'vocabulary', value: string | null) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        onFilterChange(filters);
    };

    const removeFilters = () => {
        setFilters({ status: null, vocabulary: null });
        onFilterChange({ status: null, vocabulary: null });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><ListFilterPlus /> Open Filters</Button>
            </SheetTrigger>
            <SheetContent className="p-2">
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Select filters to refine terms.</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                    {/* Status Filter */}
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(value) => handleChange('status', value)} value={filters.status || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Vocabulary Filter */}
                    <Label htmlFor="vocabulary">Vocabulary</Label>
                    <Select onValueChange={(value) => handleChange('vocabulary', value)} value={filters.vocabulary || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Vocabulary" />
                        </SelectTrigger>
                        <SelectContent>
                            {vocabularies.map((vocab) => (
                                <SelectItem key={vocab.id} value={vocab.slug}>
                                    {vocab.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="mt-4 flex gap-2">
                        <Button onClick={applyFilters} className="w-full">
                            Apply
                        </Button>
                        <Button onClick={removeFilters} variant="outline" className="flex w-full items-center gap-2">
                            <XCircle className="h-4 w-4" /> Remove Filters
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
