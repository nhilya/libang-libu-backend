import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowRight, ClipboardCheck, Users } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes/admin';
import { index as leadsIndex, show as leadShow } from '@/routes/admin/leads';

type RecentLead = {
    id: number;
    reference: string;
    status: string;
    student_count: number;
    created_at: string;
    school: { id: number; name: string } | null;
};

export default function Dashboard({
    metrics,
    actions,
    recentLeads,
}: {
    metrics: Record<string, number>;
    actions: Record<string, number>;
    recentLeads: RecentLead[];
}) {
    const kpis = [
        ['New enquiries', metrics.new_enquiries],
        ['Pending quotations', metrics.pending_quotations],
        ['Confirmed trips', metrics.confirmed_trips],
        ['Students this month', metrics.students_this_month],
    ];

    const requiredActions = [
        {
            label: 'Follow-ups are due',
            count: actions.follow_ups_due,
            detail: 'Contact these schools and record the outcome.',
        },
        {
            label: 'Leads need an owner',
            count: actions.unassigned_leads,
            detail: 'Assign a salesperson so each enquiry has a next step.',
        },
        {
            label: 'Recommendations are pending',
            count: actions.recommendations_pending,
            detail: 'Qualified leads are waiting for programme review.',
        },
    ].filter((item) => item.count > 0);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Operations dashboard"
                    description="What needs attention across sales and trip planning today."
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {kpis.map(([label, value]) => (
                        <Card key={label} className="gap-3 py-5">
                            <CardHeader className="px-5">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-5">
                                <p className="text-3xl font-semibold tabular-nums">
                                    {Number(value).toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="size-5 text-amber-600" />
                                <CardTitle>Action required</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {requiredActions.length === 0 ? (
                                <div className="rounded-lg border border-dashed p-6 text-center">
                                    <ClipboardCheck className="mx-auto mb-3 size-8 text-emerald-600" />
                                    <p className="font-medium">
                                        Nothing urgent right now
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        New exceptions will appear here
                                        automatically.
                                    </p>
                                </div>
                            ) : (
                                requiredActions.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={leadsIndex()}
                                        className="flex gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                    >
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                            {item.count}
                                        </span>
                                        <span className="grid gap-1">
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {item.detail}
                                            </span>
                                        </span>
                                    </Link>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="size-5" />
                                <CardTitle>Recent enquiries</CardTitle>
                            </div>
                            <Link
                                href={leadsIndex()}
                                className="flex items-center gap-1 text-sm font-medium"
                            >
                                View all <ArrowRight className="size-4" />
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {recentLeads.length === 0 ? (
                                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                    No enquiries yet. Create the first lead to
                                    start the sales pipeline.
                                </div>
                            ) : (
                                <div className="divide-y rounded-lg border">
                                    {recentLeads.map((lead) => (
                                        <Link
                                            key={lead.id}
                                            href={leadShow(lead.id)}
                                            className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">
                                                    {lead.school?.name ??
                                                        'School not set'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {lead.reference} ·{' '}
                                                    {lead.student_count}{' '}
                                                    students
                                                </p>
                                            </div>
                                            <StatusBadge status={lead.status} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
