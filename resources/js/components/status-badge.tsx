import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
    status: 'pending' | 'rejected' | 'accepted' | 'deprecated' | 'suggested';
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const statusStyles = {
        pending: 'bg-yellow-600 text-black',
        rejected: 'bg-red-600 text-white',
        accepted: 'bg-green-600 text-white',
        deprecated: 'bg-gray-600 text-white',
        suggested: 'bg-yellow-600 text-white',
    };

    return <Badge className={cn(statusStyles[status])}>{status}</Badge>;
}
