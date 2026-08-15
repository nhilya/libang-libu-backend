import { Head, Link } from '@inertiajs/react';
import { CloudRain, Pencil } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { edit, index } from '@/routes/admin/activities';

type Activity = {
    id: number;
    name: string;
    category: string | null;
    learning_themes: string[] | null;
    school_levels: string[] | null;
    min_age: number | null;
    max_age: number | null;
    duration_minutes: number;
    maximum_capacity: number;
    minimum_capacity: number | null;
    environment: string | null;
    suggested_time: string | null;
    weather_sensitive: boolean;
    base_cost: string | null;
    status: string;
    notes: string | null;
    location: { id: number; name: string; address: string | null } | null;
    learning_outcomes: { id: number; code: string; description: string }[];
};

export default function ActivityShow({ activity }: { activity: Activity }) {
    return (
        <>
            <Head title={activity.name} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={activity.name}
                    description={`${activity.category ?? 'Uncategorised'} · ${activity.location?.name ?? 'Location not set'}`}
                    actions={
                        <>
                            <StatusBadge status={activity.status} />
                            <Button asChild>
                                <Link href={edit(activity.id)}>
                                    <Pencil /> Edit activity
                                </Link>
                            </Button>
                        </>
                    }
                />
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Operational facts</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <Detail
                                label="Duration"
                                value={`${activity.duration_minutes} minutes`}
                            />
                            <Detail
                                label="Capacity"
                                value={`${activity.minimum_capacity ?? 1}–${activity.maximum_capacity}`}
                            />
                            <Detail
                                label="Environment"
                                value={activity.environment}
                            />
                            <Detail
                                label="Suggested time"
                                value={activity.suggested_time}
                            />
                            <Detail
                                label="Base cost"
                                value={
                                    activity.base_cost
                                        ? `RM ${activity.base_cost}`
                                        : null
                                }
                            />
                            {activity.weather_sensitive && (
                                <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                                    <CloudRain className="size-4" />{' '}
                                    Weather-sensitive activity
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Learning and suitability</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-5">
                            <Detail
                                label="School levels"
                                value={activity.school_levels?.join(', ')}
                            />
                            <Detail
                                label="Learning themes"
                                value={activity.learning_themes?.join(', ')}
                            />
                            <Detail
                                label="Age range"
                                value={
                                    activity.min_age || activity.max_age
                                        ? `${activity.min_age ?? '—'}–${activity.max_age ?? '—'}`
                                        : null
                                }
                            />
                            <Detail
                                label="Operational notes"
                                value={activity.notes}
                            />
                            <div className="grid gap-2">
                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    Learning outcomes
                                </p>
                                {activity.learning_outcomes.length ? (
                                    <div className="divide-y rounded-lg border">
                                        {activity.learning_outcomes.map(
                                            (outcome) => (
                                                <div
                                                    key={outcome.id}
                                                    className="p-4"
                                                >
                                                    <p className="text-xs font-medium text-muted-foreground">
                                                        {outcome.code}
                                                    </p>
                                                    <p className="mt-1">
                                                        {outcome.description}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                                        No learning outcomes linked yet.
                                    </div>
                                )}
                            </div>
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
ActivityShow.layout = {
    breadcrumbs: [
        { title: 'Activities', href: index() },
        { title: 'Activity', href: '#' },
    ],
};
