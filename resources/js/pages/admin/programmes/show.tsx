import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    create as activityCreate,
    show as activityShow,
} from '@/routes/admin/activities';
import { edit, index } from '@/routes/admin/programmes';

type Programme = {
    id: number;
    name: string;
    description: string | null;
    status: string;
    duration_days: number;
    duration_nights: number;
    school_levels: string[] | null;
    min_group_size: number | null;
    max_group_size: number | null;
    themes: string[] | null;
    indicative_price_min: string | null;
    indicative_price_max: string | null;
    product: { id: number; name: string };
    activities: {
        id: number;
        name: string;
        duration_minutes: number;
        maximum_capacity: number;
        status: string;
    }[];
};

export default function ProgrammeShow({ programme }: { programme: Programme }) {
    return (
        <>
            <Head title={programme.name} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={programme.name}
                    description={`${programme.product.name} · ${programme.duration_days}D${programme.duration_nights}N`}
                    actions={
                        <>
                            <StatusBadge status={programme.status} />
                            <Button asChild>
                                <Link href={edit(programme.id)}>
                                    <Pencil /> Edit programme
                                </Link>
                            </Button>
                        </>
                    }
                />
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rules</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <Detail
                                label="Group size"
                                value={`${programme.min_group_size ?? '—'}–${programme.max_group_size ?? '—'}`}
                            />
                            <Detail
                                label="School levels"
                                value={programme.school_levels?.join(', ')}
                            />
                            <Detail
                                label="Themes"
                                value={programme.themes?.join(', ')}
                            />
                            <Detail
                                label="Indicative price"
                                value={
                                    programme.indicative_price_min ||
                                    programme.indicative_price_max
                                        ? `RM ${programme.indicative_price_min ?? '—'}–${programme.indicative_price_max ?? '—'}`
                                        : null
                                }
                            />
                            <Detail
                                label="Description"
                                value={programme.description}
                            />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle>Base activities</CardTitle>
                            <Button size="sm" variant="outline" asChild>
                                <Link href={activityCreate()}>
                                    <Plus /> Add activity
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {programme.activities.length ? (
                                <div className="divide-y rounded-lg border">
                                    {programme.activities.map((activity) => (
                                        <Link
                                            key={activity.id}
                                            href={activityShow(activity.id)}
                                            className="flex items-center justify-between gap-4 p-4 hover:bg-muted/30"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {activity.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {activity.duration_minutes}{' '}
                                                    min · capacity{' '}
                                                    {activity.maximum_capacity}
                                                </p>
                                            </div>
                                            <StatusBadge
                                                status={activity.status}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                    No base activities assigned yet. Activity
                                    assignment will feed itinerary drafting.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="grid gap-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
            </p>
            <p className="capitalize">{value || '—'}</p>
        </div>
    );
}
ProgrammeShow.layout = {
    breadcrumbs: [
        { title: 'Programmes', href: index() },
        { title: 'Programme', href: '#' },
    ],
};
