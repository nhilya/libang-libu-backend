import { Form, Head, Link } from '@inertiajs/react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { index, show, store, update } from '@/routes/admin/leads';

type Lead = {
    id: number;
    school_id: number;
    contact_id: number | null;
    assigned_to: number | null;
    source: string;
    status: string;
    school_level: string;
    student_count: number;
    duration_days: number;
    duration_nights: number;
    learning_interests: string[] | null;
    experience_preferences: string[] | null;
    budget_min: string | null;
    budget_max: string | null;
    learning_objective: string | null;
    indicative_price: string | null;
    next_follow_up_at: string | null;
    notes: string | null;
};

type SchoolOption = {
    id: number;
    name: string;
    contacts: { id: number; name: string }[];
};

const interests = ['science', 'history', 'geography', 'culture'];
const experiences = ['hands_on', 'outdoor', 'teamwork', 'academic'];

export default function LeadForm({
    lead,
    schools,
    staff,
    statuses,
}: {
    lead?: Lead;
    schools: SchoolOption[];
    staff: { id: number; name: string }[];
    statuses: string[];
}) {
    const isEditing = Boolean(lead);
    const route = lead ? update.form(lead.id) : store.form();

    return (
        <>
            <Head title={isEditing ? 'Edit lead' : 'New lead'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={isEditing ? 'Edit lead' : 'New lead'}
                    description="Capture the school, group and learning requirements once."
                />

                <Form {...route}>
                    {({ errors, processing }) => (
                        <div className="grid gap-6 xl:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer</CardTitle>
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
                                            defaultValue={lead?.school_id ?? ''}
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a school
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
                                        label="Contact"
                                        htmlFor="contact_id"
                                        error={errors.contact_id}
                                    >
                                        <select
                                            id="contact_id"
                                            name="contact_id"
                                            defaultValue={
                                                lead?.contact_id ?? ''
                                            }
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="">
                                                No contact selected
                                            </option>
                                            {schools.map((school) => (
                                                <optgroup
                                                    key={school.id}
                                                    label={school.name}
                                                >
                                                    {school.contacts.map(
                                                        (contact) => (
                                                            <option
                                                                key={contact.id}
                                                                value={
                                                                    contact.id
                                                                }
                                                            >
                                                                {contact.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </FormField>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Source"
                                            htmlFor="source"
                                            error={errors.source}
                                            required
                                        >
                                            <select
                                                id="source"
                                                name="source"
                                                defaultValue={
                                                    lead?.source ?? 'admin'
                                                }
                                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            >
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="website">
                                                    Website
                                                </option>
                                                <option value="referral">
                                                    Referral
                                                </option>
                                                <option value="phone">
                                                    Phone
                                                </option>
                                            </select>
                                        </FormField>
                                        <FormField
                                            label="Assigned staff"
                                            htmlFor="assigned_to"
                                            error={errors.assigned_to}
                                        >
                                            <select
                                                id="assigned_to"
                                                name="assigned_to"
                                                defaultValue={
                                                    lead?.assigned_to ?? ''
                                                }
                                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            >
                                                <option value="">
                                                    Unassigned
                                                </option>
                                                {staff.map((user) => (
                                                    <option
                                                        key={user.id}
                                                        value={user.id}
                                                    >
                                                        {user.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>
                                    </div>
                                    <FormField
                                        label="Pipeline status"
                                        htmlFor="status"
                                        error={errors.status}
                                        required
                                    >
                                        <select
                                            id="status"
                                            name="status"
                                            defaultValue={lead?.status ?? 'new'}
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status.replaceAll(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Trip requirements</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="School level"
                                            htmlFor="school_level"
                                            error={errors.school_level}
                                            required
                                        >
                                            <select
                                                id="school_level"
                                                name="school_level"
                                                defaultValue={
                                                    lead?.school_level ??
                                                    'secondary'
                                                }
                                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            >
                                                <option value="primary">
                                                    Primary
                                                </option>
                                                <option value="secondary">
                                                    Secondary
                                                </option>
                                                <option value="mixed">
                                                    Mixed
                                                </option>
                                            </select>
                                        </FormField>
                                        <FormField
                                            label="Students"
                                            htmlFor="student_count"
                                            error={errors.student_count}
                                            required
                                        >
                                            <Input
                                                id="student_count"
                                                name="student_count"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    lead?.student_count ?? 30
                                                }
                                            />
                                        </FormField>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Days"
                                            htmlFor="duration_days"
                                            error={errors.duration_days}
                                            required
                                        >
                                            <Input
                                                id="duration_days"
                                                name="duration_days"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    lead?.duration_days ?? 1
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Nights"
                                            htmlFor="duration_nights"
                                            error={errors.duration_nights}
                                            required
                                        >
                                            <Input
                                                id="duration_nights"
                                                name="duration_nights"
                                                type="number"
                                                min="0"
                                                defaultValue={
                                                    lead?.duration_nights ?? 0
                                                }
                                            />
                                        </FormField>
                                    </div>
                                    <CheckboxGroup
                                        name="learning_interests"
                                        label="Learning interests"
                                        values={interests}
                                        selected={
                                            lead?.learning_interests ?? []
                                        }
                                    />
                                    <CheckboxGroup
                                        name="experience_preferences"
                                        label="Experience preferences"
                                        values={experiences}
                                        selected={
                                            lead?.experience_preferences ?? []
                                        }
                                    />
                                </CardContent>
                            </Card>

                            <Card className="xl:col-span-2">
                                <CardHeader>
                                    <CardTitle>
                                        Commercial and follow-up
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <div className="grid gap-5 md:grid-cols-3">
                                        <FormField
                                            label="Budget min (RM)"
                                            htmlFor="budget_min"
                                            error={errors.budget_min}
                                        >
                                            <Input
                                                id="budget_min"
                                                name="budget_min"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue={
                                                    lead?.budget_min ?? ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Budget max (RM)"
                                            htmlFor="budget_max"
                                            error={errors.budget_max}
                                        >
                                            <Input
                                                id="budget_max"
                                                name="budget_max"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue={
                                                    lead?.budget_max ?? ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Indicative price (RM)"
                                            htmlFor="indicative_price"
                                            error={errors.indicative_price}
                                        >
                                            <Input
                                                id="indicative_price"
                                                name="indicative_price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue={
                                                    lead?.indicative_price ?? ''
                                                }
                                            />
                                        </FormField>
                                    </div>
                                    <FormField
                                        label="Customer objective"
                                        htmlFor="learning_objective"
                                        error={errors.learning_objective}
                                    >
                                        <textarea
                                            id="learning_objective"
                                            name="learning_objective"
                                            defaultValue={
                                                lead?.learning_objective ?? ''
                                            }
                                            className={textareaClassName}
                                        />
                                    </FormField>
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <FormField
                                            label="Next follow-up"
                                            htmlFor="next_follow_up_at"
                                            error={errors.next_follow_up_at}
                                        >
                                            <Input
                                                id="next_follow_up_at"
                                                name="next_follow_up_at"
                                                type="datetime-local"
                                                defaultValue={
                                                    lead?.next_follow_up_at?.slice(
                                                        0,
                                                        16,
                                                    ) ?? ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Internal notes"
                                            htmlFor="notes"
                                            error={errors.notes}
                                        >
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                defaultValue={lead?.notes ?? ''}
                                                className={textareaClassName}
                                            />
                                        </FormField>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3 xl:col-span-2">
                                <Button variant="outline" asChild>
                                    <Link href={lead ? show(lead.id) : index()}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Save lead'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

function CheckboxGroup({
    name,
    label,
    values,
    selected,
}: {
    name: string;
    label: string;
    values: string[];
    selected: string[];
}) {
    return (
        <fieldset className="grid gap-2">
            <legend className="text-sm font-medium">{label}</legend>
            <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                    <label
                        key={value}
                        className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm"
                    >
                        <input
                            type="checkbox"
                            name={`${name}[]`}
                            value={value}
                            defaultChecked={selected.includes(value)}
                        />
                        <span className="capitalize">
                            {value.replaceAll('_', ' ')}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

LeadForm.layout = {
    breadcrumbs: [
        { title: 'Leads', href: index() },
        { title: 'Form', href: '#' },
    ],
};
