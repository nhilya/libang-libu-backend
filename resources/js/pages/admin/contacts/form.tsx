import { Form, Head, Link } from '@inertiajs/react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { index, store, update } from '@/routes/admin/contacts';

type Contact = {
    id: number;
    school_id: number;
    name: string;
    role: string | null;
    phone: string | null;
    email: string | null;
    notes: string | null;
    is_primary: boolean;
};

export default function ContactForm({
    contact,
    schools,
}: {
    contact?: Contact;
    schools: { id: number; name: string }[];
}) {
    const route = contact ? update.form(contact.id) : store.form();

    return (
        <>
            <Head title={contact ? 'Edit contact' : 'New contact'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={contact ? 'Edit contact' : 'New contact'}
                    description="Link each person to a school and identify the main trip contact."
                />
                <Form {...route}>
                    {({ errors, processing }) => (
                        <Card className="mx-auto w-full max-w-2xl">
                            <CardHeader>
                                <CardTitle>Contact details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                <FormField
                                    label="School"
                                    htmlFor="school_id"
                                    error={errors.school_id}
                                    required
                                >
                                    <select
                                        id="school_id"
                                        name="school_id"
                                        defaultValue={contact?.school_id ?? ''}
                                        className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="" disabled>
                                            Select school
                                        </option>
                                        {schools.map((school) => (
                                            <option
                                                key={school.id}
                                                value={school.id}
                                            >
                                                {school.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormField
                                    label="Name"
                                    htmlFor="name"
                                    error={errors.name}
                                    required
                                >
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={contact?.name ?? ''}
                                    />
                                </FormField>
                                <FormField
                                    label="Role"
                                    htmlFor="role"
                                    error={errors.role}
                                >
                                    <Input
                                        id="role"
                                        name="role"
                                        defaultValue={contact?.role ?? ''}
                                        placeholder="Trip Coordinator"
                                    />
                                </FormField>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <FormField
                                        label="Phone"
                                        htmlFor="phone"
                                        error={errors.phone}
                                    >
                                        <Input
                                            id="phone"
                                            name="phone"
                                            defaultValue={contact?.phone ?? ''}
                                        />
                                    </FormField>
                                    <FormField
                                        label="Email"
                                        htmlFor="email"
                                        error={errors.email}
                                    >
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={contact?.email ?? ''}
                                        />
                                    </FormField>
                                </div>
                                <FormField
                                    label="Notes"
                                    htmlFor="notes"
                                    error={errors.notes}
                                >
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        defaultValue={contact?.notes ?? ''}
                                        className={textareaClassName}
                                    />
                                </FormField>
                                <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
                                    <input
                                        type="hidden"
                                        name="is_primary"
                                        value="0"
                                    />
                                    <input
                                        type="checkbox"
                                        name="is_primary"
                                        value="1"
                                        defaultChecked={
                                            contact?.is_primary ?? false
                                        }
                                    />{' '}
                                    Set as primary contact for this school
                                </label>
                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" asChild>
                                        <Link href={index()}>Cancel</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving…'
                                            : 'Save contact'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            </div>
        </>
    );
}

ContactForm.layout = {
    breadcrumbs: [
        { title: 'Contacts', href: index() },
        { title: 'Form', href: '#' },
    ],
};
