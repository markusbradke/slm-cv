import { Link } from "@inertiajs/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type DashboardCardProps = {
    title: string;
    count: number;
    link: string;
};

export default function DashboardCard({ title, count, link }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {count}
            </CardContent>
            <CardFooter>
                <Link href={link}>
                    <Button>
                        View all
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
