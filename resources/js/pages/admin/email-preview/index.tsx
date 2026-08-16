import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    Check,
    Download,
    ExternalLink,
    Mail,
    Users,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { index as operationsIndex } from '@/routes/admin/operations';
import type { OperationsMockProps } from '@/types/operations';

export default function EmailPreview({
    trip,
    commercial,
    email,
    itinerary,
}: OperationsMockProps) {
    return (
        <>
            <Head title="Client Email Preview" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Client email preview"
                    description="Mock email sent after the AI itinerary and quotation are generated."
                    actions={
                        <Button variant="outline" asChild>
                            <Link href={operationsIndex()}>
                                <ArrowLeft /> Trip operations
                            </Link>
                        </Button>
                    }
                />

                <div className="rounded-xl border border-[#eec445]/60 bg-[#eec445]/15 px-4 py-3 text-sm">
                    <strong>Demo preview.</strong> No email is sent from this
                    screen. Connect the final template to the mail queue when
                    SMTP is ready.
                </div>

                <div className="overflow-hidden rounded-2xl border bg-[#f4f2f6] shadow-sm">
                    <div className="border-b bg-white px-5 py-4 md:px-8">
                        <div className="mx-auto grid max-w-3xl gap-2 text-sm">
                            <p>
                                <span className="inline-block w-16 text-muted-foreground">
                                    To
                                </span>
                                {email.recipient_name} &lt;
                                {email.recipient_email}&gt;
                            </p>
                            <p>
                                <span className="inline-block w-16 text-muted-foreground">
                                    Subject
                                </span>
                                <strong>{email.subject}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="px-3 py-8 sm:px-6 md:py-12">
                        <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-lg">
                            <header className="relative overflow-hidden bg-[#572e7e] px-6 py-8 text-white md:px-10 md:py-10">
                                <div className="absolute -top-16 -right-12 size-48 rounded-full bg-[#ce307d] opacity-80" />
                                <div className="absolute -right-2 -bottom-16 size-32 rounded-full bg-[#eec445]" />
                                <div className="relative">
                                    <div className="mb-8 flex items-center gap-3">
                                        <div
                                            aria-label="Libang Libu Travel"
                                            className="rounded-xl bg-white px-3 py-2 text-lg font-black tracking-tight"
                                        >
                                            <span className="text-[#ce307d]">
                                                LIBANG
                                            </span>{' '}
                                            <span className="text-[#4898d1]">
                                                LIBU
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-bold">
                                                Libang Libu Travel
                                            </p>
                                            <p className="text-xs text-white/75">
                                                A classroom without walls
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold tracking-[0.2em] text-[#eec445] uppercase">
                                        Your expedition proposal is ready
                                    </p>
                                    <h1 className="mt-3 max-w-xl text-3xl leading-tight font-bold md:text-4xl">
                                        Let&apos;s bring Ipoh to life for your
                                        students.
                                    </h1>
                                </div>
                            </header>

                            <div className="px-6 py-8 text-[#33283b] md:px-10 md:py-10">
                                <p className="text-lg font-semibold">
                                    Assalamualaikum {email.recipient_name},
                                </p>
                                <p className="mt-3 leading-7 text-[#6b6071]">
                                    Based on your planning quiz, our AI has
                                    prepared an initial itinerary and quotation
                                    for {trip.school}. This is a starting point
                                    for our discussion and can still be refined
                                    with your teachers.
                                </p>

                                <section className="mt-8 overflow-hidden rounded-2xl border border-[#572e7e]/15">
                                    <div className="bg-[#f4ecf7] px-5 py-4">
                                        <p className="text-xs font-bold tracking-wider text-[#ce307d] uppercase">
                                            Proposal {trip.reference}
                                        </p>
                                        <h2 className="mt-1 text-xl font-bold text-[#572e7e]">
                                            {trip.title}
                                        </h2>
                                    </div>
                                    <div className="grid gap-4 p-5 sm:grid-cols-3">
                                        <EmailFact
                                            icon={<CalendarDays />}
                                            label="Travel date"
                                            value={trip.date}
                                        />
                                        <EmailFact
                                            icon={<Users />}
                                            label="Group"
                                            value={`${trip.students} students · ${trip.teachers} teachers`}
                                        />
                                        <EmailFact
                                            icon={<Mail />}
                                            label="Indicative total"
                                            value={money(
                                                commercial.quotation_total,
                                            )}
                                        />
                                    </div>
                                </section>

                                <section className="mt-8">
                                    <h2 className="text-lg font-bold text-[#572e7e]">
                                        Proposed journey
                                    </h2>
                                    <div className="mt-4 grid gap-3">
                                        {itinerary.map((stop, index) => (
                                            <div
                                                key={stop.name}
                                                className="grid grid-cols-[2rem_5rem_1fr] items-center gap-3 rounded-xl bg-[#faf7fb] p-3"
                                            >
                                                <span className="flex size-8 items-center justify-center rounded-full bg-[#4898d1] text-xs font-bold text-white">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm font-semibold text-[#ce307d]">
                                                    {stop.time}
                                                </span>
                                                <span className="text-sm font-medium">
                                                    {stop.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="mt-8 rounded-2xl bg-[#fff8de] p-5">
                                    <p className="text-xs font-bold tracking-wider text-[#8b6b00] uppercase">
                                        First proposal meeting
                                    </p>
                                    <p className="mt-2 text-xl font-bold text-[#572e7e]">
                                        {email.meeting_date} ·{' '}
                                        {email.meeting_time}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-[#6b6071]">
                                        Invite other teachers to review the
                                        itinerary, ask questions and refine the
                                        final quotation together.
                                    </p>
                                </section>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    <a
                                        href="#proposal"
                                        className="flex items-center justify-center gap-2 rounded-xl bg-[#ce307d] px-5 py-4 font-bold text-white no-underline"
                                    >
                                        Review proposal <ExternalLink />
                                    </a>
                                    <a
                                        href="#quotation"
                                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#572e7e] px-5 py-4 font-bold text-[#572e7e] no-underline"
                                    >
                                        <Download /> Download quotation
                                    </a>
                                </div>

                                <div className="mt-8 flex items-start gap-3 border-t pt-6 text-sm text-[#6b6071]">
                                    <Check className="mt-0.5 size-5 shrink-0 text-[#4898d1]" />
                                    <p>
                                        This initial proposal is valid until{' '}
                                        <strong>
                                            {email.proposal_expires}
                                        </strong>
                                        . No payment is required until the
                                        quotation is finalised and accepted.
                                    </p>
                                </div>
                            </div>

                            <footer className="bg-[#572e7e] px-6 py-7 text-center text-xs leading-5 text-white/70 md:px-10">
                                <p className="font-semibold text-white">
                                    Libang Libu Travel
                                </p>
                                <p>Ipoh, Perak · hello@libanglibu.my</p>
                                <p className="mt-3">
                                    You received this email because you
                                    requested an expedition proposal.
                                </p>
                            </footer>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}

function EmailFact({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#4898d1]/12 text-[#4898d1] [&_svg]:size-4">
                {icon}
            </span>
            <div>
                <p className="text-xs text-[#6b6071]">{label}</p>
                <p className="mt-1 text-sm font-bold">{value}</p>
            </div>
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
