import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { edit, index, show } from '@/routes/admin/leads';
import { edit as recommendationEdit } from '@/routes/admin/leads/recommendation';

type Lead = {
    id: number;
    reference: string;
    source: string;
    status: string;
    school_level: string;
    student_count: number;
    duration_days: number;
    duration_nights: number;
    learning_interests: string[] | null;
    experience_preferences: string[] | null;
    budget_min: string | null;
    budget_max: string | null;
    learning_objective: string | null;
    next_follow_up_at: string | null;
    notes: string | null;
    school: {
        id: number;
        name: string;
        type: string | null;
        level: string | null;
        location: string | null;
    } | null;
    contact: {
        id: number;
        name: string;
        role: string | null;
        phone: string | null;
        email: string | null;
    } | null;
    assignee: { id: number; name: string } | null;
    recommendation: {
        id: number;
        status: string;
        explanation: string | null;
        warnings: { severity: string; message: string }[] | null;
        programme: { id: number; name: string } | null;
        activities: { id: number; name: string }[];
    } | null;
};

export default function LeadShow({ lead }: { lead: Lead }) {
    return (
        <>
            <Head title={lead.reference} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={lead.reference}
                    description={`${lead.school?.name ?? 'School not set'} · ${lead.student_count} students · ${lead.duration_days}D${lead.duration_nights}N`}
                    actions={
                        <>
                            <StatusBadge status={lead.status} />
                            <Button asChild>
                                <Link href={edit(lead.id)}>
                                    <Pencil /> Edit lead
                                </Link>
                            </Button>
                        </>
                    }
                />

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <Detail label="School" value={lead.school?.name} />
                            <Detail
                                label="Contact"
                                value={
                                    lead.contact
                                        ? `${lead.contact.name}${lead.contact.role ? ` · ${lead.contact.role}` : ''}`
                                        : null
                                }
                            />
                            <Detail
                                label="Assigned to"
                                value={lead.assignee?.name}
                            />
                            <Detail
                                label="Source"
                                value={lead.source}
                                capitalize
                            />
                            <Detail
                                label="Follow-up"
                                value={
                                    lead.next_follow_up_at
                                        ? new Date(
                                              lead.next_follow_up_at,
                                          ).toLocaleString()
                                        : null
                                }
                            />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Customer requirements</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-5">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Detail
                                    label="School level"
                                    value={lead.school_level}
                                    capitalize
                                />
                                <Detail
                                    label="Group size"
                                    value={`${lead.student_count} students`}
                                />
                                <Detail
                                    label="Duration"
                                    value={`${lead.duration_days} day(s), ${lead.duration_nights} night(s)`}
                                />
                            </div>
                            <TagList
                                label="Learning interests"
                                values={lead.learning_interests ?? []}
                            />
                            <TagList
                                label="Experience preferences"
                                values={lead.experience_preferences ?? []}
                            />
                            <Detail
                                label="Customer objective"
                                value={lead.learning_objective}
                            />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle>Recommendation</CardTitle>
                            <Button size="sm" variant="outline" asChild>
                                <Link href={recommendationEdit(lead.id)}>
                                    {lead.recommendation
                                        ? 'Review'
                                        : 'Create recommendation'}
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {lead.recommendation ? (
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div>
                                            <p className="font-medium">
                                                {lead.recommendation.programme
                                                    ?.name ??
                                                    'Custom recommendation'}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {
                                                    lead.recommendation
                                                        .activities.length
                                                }{' '}
                                                activities selected
                                            </p>
                                        </div>
                                        <StatusBadge
                                            status={lead.recommendation.status}
                                        />
                                    </div>
                                    {lead.recommendation.warnings?.map(
                                        (warning, index) => (
                                            <div
                                                key={`${warning.message}-${index}`}
                                                className={
                                                    warning.severity ===
                                                    'critical'
                                                        ? 'rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300'
                                                        : 'rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300'
                                                }
                                            >
                                                <span className="font-medium capitalize">
                                                    {warning.severity}:
                                                </span>{' '}
                                                {warning.message}
                                            </div>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-6 text-center">
                                    <p className="font-medium">
                                        No recommendation yet
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Qualify the lead, then review a suitable
                                        active programme.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Commercial</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <Detail
                                label="Budget range"
                                value={
                                    lead.budget_min || lead.budget_max
                                        ? `RM ${lead.budget_min ?? '—'} – RM ${lead.budget_max ?? '—'}`
                                        : null
                                }
                            />
                            <Detail label="Notes" value={lead.notes} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

function Detail({
    label,
    value,
    capitalize = false,
}: {
    label: string;
    value?: string | null;
    capitalize?: boolean;
}) {
    return (
        <div className="grid gap-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
            </p>
            <p className={capitalize ? 'capitalize' : ''}>{value || '—'}</p>
        </div>
    );
}

function TagList({ label, values }: { label: string; values: string[] }) {
    return (
        <div className="grid gap-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
            </p>
            <div className="flex flex-wrap gap-2">
                {values.length ? (
                    values.map((value) => (
                        <span
                            key={value}
                            className="rounded-full bg-muted px-3 py-1 text-xs capitalize"
                        >
                            {value.replaceAll('_', ' ')}
                        </span>
                    ))
                ) : (
                    <span>—</span>
                )}
            </div>
        </div>
    );
}

LeadShow.layout = {
    breadcrumbs: [
        { title: 'Leads', href: index() },
        { title: 'Lead', href: show(0) },
    ],
};
