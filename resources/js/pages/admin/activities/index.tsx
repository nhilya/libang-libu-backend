import { Form, Head, Link } from '@inertiajs/react';
import { CloudRain, Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { create, index, show } from '@/routes/admin/activities';
import type { Paginated } from '@/types';

type ActivityRow = {
    id: number;
    name: string;
    category: string | null;
    duration_minutes: number;
    maximum_capacity: number;
    environment: string | null;
    weather_sensitive: boolean;
    status: string;
    location: { id: number; name: string } | null;
};

export default function ActivitiesIndex({
    activities,
    filters,
}: {
    activities: Paginated<ActivityRow>;
    filters: { search?: string };
}) {
    return (
        <>
            <Head title="Activities" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Activities"
                    description="Reusable itinerary building blocks with duration, suitability and capacity constraints."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus /> New activity
                            </Link>
                        </Button>
                    }
                />
                <Card className="py-4">
                    <CardContent className="px-4">
                        <Form {...index.form()} className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    name="search"
                                    defaultValue={filters.search}
                                    placeholder="Search activities…"
                                    className="pl-9"
                                />
                            </div>
                            <Button type="submit" variant="outline">
                                Search
                            </Button>
                        </Form>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden py-0">
                    {activities.data.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            Activity
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Location
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Duration
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Capacity
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Environment
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {activities.data.map((activity) => (
                                        <tr
                                            key={activity.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={show(activity.id)}
                                                    className="font-medium hover:underline"
                                                >
                                                    {activity.name}
                                                </Link>
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {activity.category ??
                                                        'Uncategorised'}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                {activity.location?.name ?? '—'}
                                            </td>
                                            <td className="px-5 py-4">
                                                {activity.duration_minutes} min
                                            </td>
                                            <td className="px-5 py-4 tabular-nums">
                                                {activity.maximum_capacity}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center gap-1 capitalize">
                                                    {activity.weather_sensitive && (
                                                        <CloudRain className="size-4 text-amber-600" />
                                                    )}
                                                    {activity.environment ??
                                                        '—'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={activity.status}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <CardContent className="grid place-items-center gap-3 py-16 text-center">
                            <p className="font-medium">No activities yet</p>
                            <p className="text-sm text-muted-foreground">
                                Create structured activities before building
                                programmes or itineraries.
                            </p>
                            <Button size="sm" asChild>
                                <Link href={create()}>Create activity</Link>
                            </Button>
                        </CardContent>
                    )}
                </Card>
                <Pagination links={activities.links} />
            </div>
        </>
    );
}

ActivitiesIndex.layout = {
    breadcrumbs: [{ title: 'Activities', href: index() }],
};
