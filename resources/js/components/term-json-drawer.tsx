import { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface TermJsonDrawerProps {
    uuid: string;
    format: string;
}

export default function TermJsonDrawer({ uuid, format }: TermJsonDrawerProps) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTermDetails = async () => {
        if (!uuid) return;
        
        setLoading(true);
        try {
            let header = 'application/json';
            if (format == 'ld+json') {
                header = 'application/vnd.ld+json';
            }
            const response = await fetch(`/api/v1/terms/${uuid}`, {
                headers: {
                    Accept: header,
                },
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button onClick={fetchTermDetails} variant="outline">{format.toUpperCase()}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Term Details</DrawerTitle>
                    <DrawerDescription>API response data ({format})</DrawerDescription>
                </DrawerHeader>
                
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : data ? (
                    <div className="p-4">
                        <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-black dark:text-white">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
                )}

                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
