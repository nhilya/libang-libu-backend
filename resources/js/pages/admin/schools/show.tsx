import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { show as leadShow } from '@/routes/admin/leads';
import { edit, index } from '@/routes/admin/schools';

type School = {
    id: number;
    name: string;
    type: string | null;
    level: string | null;
    location: string | null;
    address: string | null;
    notes: string | null;
    contacts: {
        id: number;
        name: string;
        role: string | null;
        phone: string | null;
        email: string | null;
        is_primary: boolean;
    }[];
    leads: {
        id: number;
        reference: string;
        status: string;
        student_count: number;
        created_at: string;
    }[];
};

export default function SchoolShow({ school }: { school: School }) {
    return (
        <>
            <Head title={school.name} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={school.name}
                    description={[school.type, school.level, school.location]
                        .filter(Boolean)
                        .join(' · ')}
                    actions={
                        <Button asChild>
                            <Link href={edit(school.id)}>
                                <Pencil /> Edit school
                            </Link>
                        </Button>
                    }
                />
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <Detail label="Type" value={school.type} />
                            <Detail label="Level" value={school.level} />
                            <Detail label="Location" value={school.location} />
                            <Detail label="Address" value={school.address} />
                            <Detail label="Notes" value={school.notes} />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {school.contacts.length ? (
                                <div className="divide-y rounded-lg border">
                                    {school.contacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="flex justify-between gap-4 p-4"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {contact.name}{' '}
                                                    {contact.is_primary && (
                                                        <span className="ml-2 text-xs text-emerald-600">
                                                            Primary
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {contact.role ??
                                                        'Role not set'}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm">
                                                <p>{contact.phone ?? '—'}</p>
                                                <p className="text-muted-foreground">
                                                    {contact.email ?? '—'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Empty text="No contacts yet. Contact management is the next action for this school." />
                            )}
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent leads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {school.leads.length ? (
                                <div className="divide-y rounded-lg border">
                                    {school.leads.map((lead) => (
                                        <Link
                                            key={lead.id}
                                            href={leadShow(lead.id)}
                                            className="flex items-center justify-between gap-4 p-4 hover:bg-muted/30"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {lead.reference}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {lead.student_count}{' '}
                                                    students
                                                </p>
                                            </div>
                                            <StatusBadge status={lead.status} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Empty text="No enquiries are linked to this school yet." />
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
function Empty({ text }: { text: string }) {
    return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            {text}
        </div>
    );
}
SchoolShow.layout = {
    breadcrumbs: [
        { title: 'Schools', href: index() },
        { title: 'School', href: '#' },
    ],
};
