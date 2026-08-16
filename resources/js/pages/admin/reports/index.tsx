import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { index as operationsIndex } from '@/routes/admin/operations';
import { index as reportsIndex } from '@/routes/admin/reports';
import type { OperationsMockProps } from '@/types/operations';

export default function Reports({
    trip,
    commercial,
    checklist,
    metrics,
    itinerary,
}: OperationsMockProps) {
    function downloadCsv() {
        const rows: Array<Array<string | number | null>> = [
            ['Section', 'Category', 'Item', 'Owner', 'Status', 'Evidence'],
            [
                'Trip',
                trip.school,
                trip.title,
                trip.guide,
                trip.status,
                trip.reference,
            ],
            [
                'Commercial',
                'Payment',
                `Quotation ${money(commercial.quotation_total)}; deposit ${money(commercial.deposit_amount)}`,
                trip.lead_teacher,
                commercial.payment_status,
                commercial.payment_reference,
            ],
            ...itinerary.map((stop) => [
                'Itinerary',
                stop.time,
                stop.name,
                trip.guide,
                stop.status,
                stop.teacher_status,
            ]),
            ...checklist.map((item) => [
                item.stage,
                item.category,
                item.item,
                item.owner,
                item.status,
                item.evidence,
            ]),
        ];
        const csv = rows.map((row) => row.map(csvCell).join(',')).join('\r\n');
        const url = URL.createObjectURL(
            new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }),
        );
        const link = document.createElement('a');
        link.href = url;
        link.download = `${trip.reference}-operational-report.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    return (
        <>
            <Head title="Operational Report" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 print:p-0">
                <div className="print:hidden">
                    <PageHeader
                        title="Operational report"
                        description="Export the current trip, payment, GPS, itinerary and compliance record."
                        actions={
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={operationsIndex()}>
                                        <ArrowLeft /> Operations
                                    </Link>
                                </Button>
                                <Button variant="outline" onClick={downloadCsv}>
                                    <Download /> Download CSV
                                </Button>
                                <Button
                                    onClick={() => window.print()}
                                    className="bg-[#572e7e] hover:bg-[#572e7e]/90"
                                >
                                    <Printer /> Print / Save PDF
                                </Button>
                            </>
                        }
                    />
                </div>

                <Card className="border-t-8 border-t-[#eec445] print:border-0 print:shadow-none">
                    <CardContent className="grid gap-8 px-5 md:px-8 print:px-0">
                        <header className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row">
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-[#ce307d] uppercase">
                                    Libang Libu Travel · {trip.reference}
                                </p>
                                <h1 className="mt-2 text-2xl font-semibold text-[#572e7e] md:text-3xl">
                                    {trip.title}
                                </h1>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {trip.school} · {trip.date} ·{' '}
                                    {trip.students} students · {trip.teachers}{' '}
                                    teachers
                                </p>
                            </div>
                            <div className="grid content-start justify-items-start gap-2 sm:justify-items-end">
                                <StatusBadge status={trip.status} />
                                <p className="text-xs text-muted-foreground">
                                    Generated{' '}
                                    {new Date().toLocaleString('en-MY')}
                                </p>
                            </div>
                        </header>

                        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <ReportFact
                                label="Readiness"
                                value={`${metrics.readiness}%`}
                            />
                            <ReportFact
                                label="Commercial"
                                value={`${commercial.quotation_status} · ${commercial.agreement_status}`}
                            />
                            <ReportFact
                                label="Deposit"
                                value={`${money(commercial.deposit_amount)} · ${commercial.payment_status}`}
                            />
                            <ReportFact
                                label="Guide GPS"
                                value={`${trip.latest_gps} · ${trip.gps_updated}`}
                            />
                        </section>

                        <ReportSection title="Trip and commercial summary">
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                <ReportFact
                                    label="Tour guide"
                                    value={trip.guide}
                                />
                                <ReportFact
                                    label="Lead teacher"
                                    value={trip.lead_teacher}
                                />
                                <ReportFact
                                    label="Quotation total"
                                    value={money(commercial.quotation_total)}
                                />
                                <ReportFact
                                    label="Payment reference"
                                    value={commercial.payment_reference}
                                />
                            </div>
                        </ReportSection>

                        <ReportSection title="Itinerary delivery">
                            <ReportTable
                                headings={[
                                    'Time',
                                    'Checkpoint',
                                    'Guide status',
                                    'Teacher status',
                                ]}
                                rows={itinerary.map((stop) => [
                                    stop.time,
                                    stop.name,
                                    stop.status,
                                    stop.teacher_status,
                                ])}
                            />
                        </ReportSection>

                        <ReportSection
                            title="Compliance and service monitoring"
                            summary={`${metrics.approved} approved · ${metrics.awaiting_review} awaiting review · ${metrics.pending} pending`}
                        >
                            <ReportTable
                                headings={[
                                    'Stage',
                                    'Category',
                                    'Check',
                                    'Owner',
                                    'Status',
                                    'Evidence',
                                ]}
                                rows={checklist.map((item) => [
                                    item.stage,
                                    item.category,
                                    item.item,
                                    item.owner,
                                    item.status,
                                    item.evidence ?? '—',
                                ])}
                            />
                        </ReportSection>

                        <footer className="border-t pt-4 text-center text-xs text-muted-foreground">
                            Mock report for presentation · Replace fixture data
                            with booking, payment and PWA records during backend
                            integration.
                        </footer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function ReportSection({
    title,
    summary,
    children,
}: {
    title: string;
    summary?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="grid break-inside-avoid gap-3">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
                <h2 className="text-lg font-semibold text-[#572e7e] dark:text-[#eec445]">
                    {title}
                </h2>
                {summary && (
                    <p className="text-xs text-muted-foreground">{summary}</p>
                )}
            </div>
            {children}
        </section>
    );
}

function ReportFact({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border bg-muted/40 p-4">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 font-semibold">{value}</p>
        </div>
    );
}

function ReportTable({
    headings,
    rows,
}: {
    headings: string[];
    rows: string[][];
}) {
    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-3xl text-sm">
                <thead>
                    <tr className="bg-[#572e7e]/8 text-left text-xs text-[#572e7e] uppercase dark:text-[#eec445]">
                        {headings.map((heading) => (
                            <th
                                key={heading}
                                className="px-3 py-3 font-semibold"
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {rows.map((row, rowIndex) => (
                        <tr key={`${row[0]}-${row[1]}-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={`${cell}-${cellIndex}`}
                                    className="px-3 py-3 align-top"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function csvCell(value: string | number | null) {
    return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function money(value: number) {
    return new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
        maximumFractionDigits: 0,
    }).format(value);
}

Reports.layout = {
    breadcrumbs: [{ title: 'Reports', href: reportsIndex() }],
};
