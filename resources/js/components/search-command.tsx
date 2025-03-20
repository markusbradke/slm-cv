import { useState } from "react";
import { CommandDialog, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search } from "lucide-react";
import { Term } from "@/types";
import { Badge } from "@/components/ui/badge";
import { router } from "@inertiajs/react";

const SearchCommand = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Term[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);

        if (query.length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            // Send request to the Laravel search endpoint
            const response = await fetch(`/search?query=${query}`);
            const data = await response.json();

            // Update the results state with the data from the server
            setResults(data.terms);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    const openLink = (uuid: string) => {
        console.log(uuid)
        router.visit(`/terms/${uuid}`)
    };

    return (
        <div>
            <button
                onClick={() => setOpen(true)} // Open the dialog when the button is clicked
                className="group h-9 w-9 cursor-pointer"
            >
                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <input
                    type="text"
                    value={query} // Controlled input, tied to the query state
                    onChange={handleSearch} // Handle input changes
                    placeholder="Search..."
                    className="w-full px-3 py-2 border rounded-md"
                />
                {/* {loading && <div>Loading...</div>} */}

                <CommandList>
                    {results.length === 0 && !loading && query.length > 0 && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}

                    <CommandGroup heading="Search Results">
                        {results.map((result: any, index: number) => (
                        <CommandItem
                            key={index}
                        >
                            <a href={`/terms/${result.uuid}`} 
                                className="block w-full flex justify-between items-center"
                            >
                                <span>{result.name}</span>
                                <span className="ml-2"><Badge>{result?.vocabulary?.name}</Badge></span>
                            </a>
                        </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    );
};

export default SearchCommand;


// import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

// interface SearchCommandProps {
//     open: boolean;
//     setOpen: (open: boolean) => void;
// }

// export default function SearchCommand({ open, setOpen }: SearchCommandProps) {
//     console.log(open)
//     return (
//         <>
//             <CommandDialog open={open} onOpenChange={setOpen}>
//                 <CommandInput placeholder="Type to search through vocabularies..." />
//                 <CommandList>
//                     <CommandEmpty>No results found.</CommandEmpty>
//                     <CommandGroup heading="Pages">
//                         <CommandItem>Vocabularies</CommandItem>
//                         <CommandItem>Terms</CommandItem>
//                     </CommandGroup>
//                 </CommandList>
//             </CommandDialog>
//         </>
//     );
// }
