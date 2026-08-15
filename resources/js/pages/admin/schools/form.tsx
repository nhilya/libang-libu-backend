import { Form, Head, Link } from '@inertiajs/react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { index, show, store, update } from '@/routes/admin/schools';

type School = {
    id: number;
    name: string;
    type: string | null;
    level: string | null;
    location: string | null;
    address: string | null;
    notes: string | null;
};

export default function SchoolForm({ school }: { school?: School }) {
    const route = school ? update.form(school.id) : store.form();

    return (
        <>
            <Head title={school ? 'Edit school' : 'New school'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={school ? 'Edit school' : 'New school'}
                    description="Keep school details reusable across enquiries and bookings."
                />
                <Form {...route}>
                    {({ errors, processing }) => (
                        <Card className="mx-auto w-full max-w-3xl">
                            <CardHeader>
                                <CardTitle>School profile</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                <FormField
                                    label="School name"
                                    htmlFor="name"
                                    error={errors.name}
                                    required
                                >
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={school?.name ?? ''}
                                        autoFocus
                                    />
                                </FormField>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <FormField
                                        label="School type"
                                        htmlFor="type"
                                        error={errors.type}
                                    >
                                        <Input
                                            id="type"
                                            name="type"
                                            defaultValue={school?.type ?? ''}
                                            placeholder="Government, private…"
                                        />
                                    </FormField>
                                    <FormField
                                        label="Level"
                                        htmlFor="level"
                                        error={errors.level}
                                    >
                                        <select
                                            id="level"
                                            name="level"
                                            defaultValue={school?.level ?? ''}
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="">
                                                Not specified
                                            </option>
                                            <option value="primary">
                                                Primary
                                            </option>
                                            <option value="secondary">
                                                Secondary
                                            </option>
                                            <option value="mixed">Mixed</option>
                                        </select>
                                    </FormField>
                                </div>
                                <FormField
                                    label="Location"
                                    htmlFor="location"
                                    error={errors.location}
                                >
                                    <Input
                                        id="location"
                                        name="location"
                                        defaultValue={school?.location ?? ''}
                                    />
                                </FormField>
                                <FormField
                                    label="Address"
                                    htmlFor="address"
                                    error={errors.address}
                                >
                                    <textarea
                                        id="address"
                                        name="address"
                                        defaultValue={school?.address ?? ''}
                                        className={textareaClassName}
                                    />
                                </FormField>
                                <FormField
                                    label="Notes"
                                    htmlFor="notes"
                                    error={errors.notes}
                                >
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        defaultValue={school?.notes ?? ''}
                                        className={textareaClassName}
                                    />
                                </FormField>
                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" asChild>
                                        <Link
                                            href={
                                                school
                                                    ? show(school.id)
                                                    : index()
                                            }
                                        >
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving…' : 'Save school'}
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

SchoolForm.layout = {
    breadcrumbs: [
        { title: 'Schools', href: index() },
        { title: 'Form', href: '#' },
    ],
};
