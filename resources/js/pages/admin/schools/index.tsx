import { Form, Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { create, index, show } from '@/routes/admin/schools';
import type { Paginated } from '@/types';

type SchoolRow = {
    id: number;
    name: string;
    type: string | null;
    level: string | null;
    location: string | null;
    contacts_count: number;
    leads_count: number;
};

export default function SchoolsIndex({
    schools,
    filters,
}: {
    schools: Paginated<SchoolRow>;
    filters: { search?: string };
}) {
    return (
        <>
            <Head title="Schools" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Schools"
                    description="A reusable customer record for every enquiry and repeat trip."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus /> New school
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
                                    placeholder="Search schools…"
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
                    {schools.data.length === 0 ? (
                        <CardContent className="grid place-items-center gap-3 py-16 text-center">
                            <p className="font-medium">No schools found</p>
                            <p className="text-sm text-muted-foreground">
                                Create a school once, then link future leads and
                                contacts to it.
                            </p>
                            <Button size="sm" asChild>
                                <Link href={create()}>Create school</Link>
                            </Button>
                        </CardContent>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            School
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Type
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Level
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Contacts
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Leads
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {schools.data.map((school) => (
                                        <tr
                                            key={school.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={show(school.id)}
                                                    className="font-medium hover:underline"
                                                >
                                                    {school.name}
                                                </Link>
                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                    {school.location ??
                                                        'Location not set'}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4 capitalize">
                                                {school.type ?? '—'}
                                            </td>
                                            <td className="px-5 py-4 capitalize">
                                                {school.level ?? '—'}
                                            </td>
                                            <td className="px-5 py-4 tabular-nums">
                                                {school.contacts_count}
                                            </td>
                                            <td className="px-5 py-4 tabular-nums">
                                                {school.leads_count}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
                <Pagination links={schools.links} />
            </div>
        </>
    );
}

SchoolsIndex.layout = { breadcrumbs: [{ title: 'Schools', href: index() }] };
