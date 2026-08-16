import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowRight,
    BusFront,
    CircleDollarSign,
    ClipboardCheck,
    FileBarChart,
    Mail,
    MapPin,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { index as emailPreviewIndex } from '@/routes/admin/email-preview';
import { index as operationsIndex } from '@/routes/admin/operations';
import { index as reportsIndex } from '@/routes/admin/reports';
import type { OperationsMockProps } from '@/types/operations';

export default function Operations({
    trip,
    commercial,
    checklist,
    metrics,
    itinerary,
}: OperationsMockProps) {
    const actionItems = checklist.filter((item) =>
        ['Pending', 'Awaiting review', 'Submitted'].includes(item.status),
    );

    return (
        <>
            <Head title="Trip Operations" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Trip operations"
                    description="Commercial readiness, supplier checks and live trip delivery in one place."
                    actions={
                        <Button
                            asChild
                            className="bg-[#572e7e] hover:bg-[#572e7e]/90"
                        >
                            <Link href={reportsIndex()}>
                                <FileBarChart /> Pull report
                            </Link>
                        </Button>
                    }
                />

                <div className="flex items-center justify-between gap-4 rounded-xl border border-[#eec445]/60 bg-[#eec445]/15 px-4 py-3 text-sm">
                    <span>
                        <strong>Mock operations data.</strong> This page can be
                        connected to booking, payment and PWA APIs later.
                    </span>
                    <StatusBadge status={trip.status} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {[
                        ['Readiness', `${metrics.readiness}%`],
                        ['Approved', metrics.approved],
                        ['Awaiting review', metrics.awaiting_review],
                        ['Pending', metrics.pending],
                        ['Exceptions', metrics.exceptions],
                    ].map(([label, value], index) => (
                        <Card
                            key={label}
                            className={`gap-2 border-t-4 py-5 ${index === 0 ? 'border-t-[#572e7e]' : index === 4 ? 'border-t-[#ce307d]' : 'border-t-[#4898d1]'}`}
                        >
                            <CardContent className="px-5">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {label}
                                </p>
                                <p className="mt-2 text-3xl font-semibold tabular-nums">
                                    {value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                    <Card>
                        <CardHeader className="flex-row items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-[#ce307d] uppercase">
                                    {trip.reference}
                                </p>
                                <CardTitle className="mt-2 text-xl">
                                    {trip.title}
                                </CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {trip.school} · {trip.date} ·{' '}
                                    {trip.students} students
                                </p>
                            </div>
                            <StatusBadge status={trip.status} />
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-3 sm:grid-cols-3">
                                <Fact label="Tour guide" value={trip.guide} />
                                <Fact
                                    label="Lead teacher"
                                    value={trip.lead_teacher}
                                />
                                <Fact
                                    label="Checkpoints"
                                    value={`${trip.completed_checkpoints}/${trip.total_checkpoints} completed`}
                                />
                            </div>
                            <div className="rounded-xl border border-[#4898d1]/30 bg-[#4898d1]/10 p-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 flex size-9 items-center justify-center rounded-full bg-[#4898d1] text-white">
                                        <MapPin className="size-4" />
                                    </span>
                                    <div>
                                        <p className="font-medium text-[#572e7e] dark:text-[#eec445]">
                                            Guide GPS active
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {trip.latest_gps} · updated{' '}
                                            {trip.gps_updated}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-[#eec445]">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CircleDollarSign className="size-5 text-[#ce307d]" />
                                <CardTitle>Client & payment</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Fact
                                label="Quotation"
                                value={`${money(commercial.quotation_total)} · ${commercial.quotation_status}`}
                            />
                            <Fact
                                label="Agreement"
                                value={commercial.agreement_status}
                            />
                            <Fact
                                label="Deposit"
                                value={`${money(commercial.deposit_amount)} · ${commercial.payment_status}`}
                            />
                            <p className="text-xs text-muted-foreground">
                                Reference: {commercial.payment_reference}
                            </p>
                            <Button variant="outline" asChild>
                                <Link href={emailPreviewIndex()}>
                                    <Mail /> Preview client email
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1fr_0.7fr]">
                    <Card>
                        <CardHeader className="flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="size-5 text-[#ce307d]" />
                                <CardTitle>Action required</CardTitle>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {actionItems.length} open
                            </span>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {actionItems.slice(0, 5).map((item) => (
                                <div
                                    key={`${item.stage}-${item.item}`}
                                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                                >
                                    <div className="min-w-0">
                                        <p className="font-medium">
                                            {item.item}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {item.stage} · {item.category} ·{' '}
                                            {item.owner}
                                        </p>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BusFront className="size-5 text-[#4898d1]" />
                                <CardTitle>Live itinerary</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {itinerary.map((stop, index) => (
                                <div
                                    key={stop.name}
                                    className="grid grid-cols-[2.25rem_1fr_auto] items-start gap-3"
                                >
                                    <span className="flex size-9 items-center justify-center rounded-full bg-[#572e7e] text-sm font-semibold text-white">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <p className="font-medium">
                                            {stop.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {stop.time} · {stop.teacher_status}
                                        </p>
                                    </div>
                                    <StatusBadge status={stop.status} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <ClipboardCheck className="size-5 text-[#572e7e]" />
                            <CardTitle>Monitoring checklist</CardTitle>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={reportsIndex()}>
                                Full report <ArrowRight />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full min-w-3xl text-sm">
                            <thead>
                                <tr className="border-b text-left text-xs text-muted-foreground uppercase">
                                    <th className="pb-3 font-medium">Stage</th>
                                    <th className="pb-3 font-medium">
                                        Category
                                    </th>
                                    <th className="pb-3 font-medium">Check</th>
                                    <th className="pb-3 font-medium">Owner</th>
                                    <th className="pb-3 font-medium">
                                        Evidence
                                    </th>
                                    <th className="pb-3 text-right font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {checklist.map((item) => (
                                    <tr key={`${item.stage}-${item.item}`}>
                                        <td className="py-3">{item.stage}</td>
                                        <td className="py-3">
                                            {item.category}
                                        </td>
                                        <td className="py-3 font-medium">
                                            {item.item}
                                        </td>
                                        <td className="py-3">{item.owner}</td>
                                        <td className="py-3 text-muted-foreground">
                                            {item.evidence ?? '—'}
                                        </td>
                                        <td className="py-3 text-right">
                                            <StatusBadge status={item.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function Fact({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg bg-muted/60 p-3">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 font-medium">{value}</p>
        </div>
    );
}

function money(value: number) {
    return new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        maximumFractionDigits: 0,
    }).format(value);
}

Operations.layout = {
    breadcrumbs: [{ title: 'Trip operations', href: operationsIndex() }],
};
