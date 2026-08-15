import { Form, Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { create, index, show } from '@/routes/admin/programmes';
import type { Paginated } from '@/types';

type ProgrammeRow = {
    id: number;
    name: string;
    status: string;
    duration_days: number;
    duration_nights: number;
    min_group_size: number | null;
    max_group_size: number | null;
    activities_count: number;
    product: { id: number; name: string };
};

export default function ProgrammesIndex({
    programmes,
    filters,
}: {
    programmes: Paginated<ProgrammeRow>;
    filters: { search?: string };
}) {
    return (
        <>
            <Head title="Programmes" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Programmes"
                    description="Reusable educational tour packages with capacity and suitability rules."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus /> New programme
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
                                    placeholder="Search programmes…"
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
                    {programmes.data.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            Programme
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Product
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Duration
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Group capacity
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Activities
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {programmes.data.map((programme) => (
                                        <tr
                                            key={programme.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={show(programme.id)}
                                                    className="font-medium hover:underline"
                                                >
                                                    {programme.name}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-4">
                                                {programme.product.name}
                                            </td>
                                            <td className="px-5 py-4">
                                                {programme.duration_days}D
                                                {programme.duration_nights}N
                                            </td>
                                            <td className="px-5 py-4">
                                                {programme.min_group_size ??
                                                    '—'}
                                                –
                                                {programme.max_group_size ??
                                                    '—'}
                                            </td>
                                            <td className="px-5 py-4 tabular-nums">
                                                {programme.activities_count}
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={programme.status}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <CardContent className="grid place-items-center gap-3 py-16 text-center">
                            <p className="font-medium">No programmes yet</p>
                            <p className="text-sm text-muted-foreground">
                                Add a programme before recommendations can match
                                school requirements.
                            </p>
                            <Button size="sm" asChild>
                                <Link href={create()}>Create programme</Link>
                            </Button>
                        </CardContent>
                    )}
                </Card>
                <Pagination links={programmes.links} />
            </div>
        </>
    );
}

ProgrammesIndex.layout = {
    breadcrumbs: [{ title: 'Programmes', href: index() }],
};
