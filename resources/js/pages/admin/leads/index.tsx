import { Form, Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { create, index, show } from '@/routes/admin/leads';
import type { Paginated } from '@/types';

type LeadRow = {
    id: number;
    reference: string;
    source: string;
    status: string;
    school_level: string;
    student_count: number;
    next_follow_up_at: string | null;
    created_at: string;
    school: { id: number; name: string } | null;
    assignee: { id: number; name: string } | null;
};

export default function LeadsIndex({
    leads,
    filters,
    statuses,
}: {
    leads: Paginated<LeadRow>;
    filters: { search?: string; status?: string };
    statuses: string[];
}) {
    return (
        <>
            <Head title="Leads" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Leads"
                    description="Track every school enquiry from first contact to confirmation."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus /> New lead
                            </Link>
                        </Button>
                    }
                />

                <Card className="gap-4 py-4">
                    <CardContent className="px-4">
                        <Form
                            {...index.form()}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    name="search"
                                    defaultValue={filters.search}
                                    placeholder="Search reference or school…"
                                    className="pl-9"
                                />
                            </div>
                            <select
                                name="status"
                                defaultValue={filters.status ?? ''}
                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">All statuses</option>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status.replaceAll('_', ' ')}
                                    </option>
                                ))}
                            </select>
                            <Button type="submit" variant="outline">
                                Filter
                            </Button>
                        </Form>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden py-0">
                    {leads.data.length === 0 ? (
                        <CardContent className="grid place-items-center gap-3 py-16 text-center">
                            <p className="font-medium">No leads found</p>
                            <p className="max-w-md text-sm text-muted-foreground">
                                Create a lead to capture a school’s requirements
                                and begin programme matching.
                            </p>
                            <Button asChild size="sm">
                                <Link href={create()}>Create lead</Link>
                            </Button>
                        </CardContent>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            Lead
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            School
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Group
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Owner
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {leads.data.map((lead) => (
                                        <tr
                                            key={lead.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={show(lead.id)}
                                                    className="font-medium hover:underline"
                                                >
                                                    {lead.reference}
                                                </Link>
                                                <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                                                    {lead.source}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                {lead.school?.name ?? '—'}
                                            </td>
                                            <td className="px-5 py-4">
                                                {lead.student_count}{' '}
                                                <span className="text-muted-foreground capitalize">
                                                    · {lead.school_level}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                {lead.assignee?.name ??
                                                    'Unassigned'}
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={lead.status}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
                <Pagination links={leads.links} />
            </div>
        </>
    );
}

LeadsIndex.layout = {
    breadcrumbs: [{ title: 'Leads', href: index() }],
};
