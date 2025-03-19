import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
    status: 'pending' | 'rejected' | 'accepted' | 'deprecated';
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const statusStyles = {
        pending: 'bg-yellow-500 text-black',
        rejected: 'bg-red-500 text-white',
        accepted: 'bg-green-500 text-white',
        deprecated: 'bg-gray-500 text-white',
    };

    return <Badge className={cn(statusStyles[status])}>{status}</Badge>;
}
