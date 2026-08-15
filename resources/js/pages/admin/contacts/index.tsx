import { Form, Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { create, edit, index } from '@/routes/admin/contacts';
import { show as schoolShow } from '@/routes/admin/schools';
import type { Paginated } from '@/types';

type Contact = {
    id: number;
    name: string;
    role: string | null;
    phone: string | null;
    email: string | null;
    is_primary: boolean;
    school: { id: number; name: string };
};

export default function ContactsIndex({
    contacts,
    filters,
}: {
    contacts: Paginated<Contact>;
    filters: { search?: string };
}) {
    return (
        <>
            <Head title="Contacts" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Contacts"
                    description="Teachers, coordinators and finance contacts linked to reusable school records."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus /> New contact
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
                                    placeholder="Search contacts…"
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
                    {contacts.data.length ? (
                        <div className="divide-y">
                            {contacts.data.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                                >
                                    <div>
                                        <Link
                                            href={edit(contact.id)}
                                            className="font-medium hover:underline"
                                        >
                                            {contact.name}
                                        </Link>
                                        {contact.is_primary && (
                                            <span className="ml-2 text-xs font-medium text-emerald-600">
                                                Primary
                                            </span>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            {contact.role ?? 'Role not set'} ·{' '}
                                            <Link
                                                href={schoolShow(
                                                    contact.school.id,
                                                )}
                                                className="hover:underline"
                                            >
                                                {contact.school.name}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="text-sm sm:text-right">
                                        <p>{contact.phone ?? '—'}</p>
                                        <p className="text-muted-foreground">
                                            {contact.email ?? '—'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <CardContent className="py-16 text-center text-sm text-muted-foreground">
                            No contacts yet. Add the teacher or coordinator
                            responsible for an enquiry.
                        </CardContent>
                    )}
                </Card>
                <Pagination links={contacts.links} />
            </div>
        </>
    );
}

ContactsIndex.layout = { breadcrumbs: [{ title: 'Contacts', href: index() }] };
