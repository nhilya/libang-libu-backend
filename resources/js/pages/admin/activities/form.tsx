import { Form, Head, Link } from '@inertiajs/react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { index, show, store, update } from '@/routes/admin/activities';

type Activity = {
    id: number;
    location_id: number | null;
    name: string;
    slug: string;
    category: string | null;
    learning_themes: string[] | null;
    school_levels: string[] | null;
    min_age: number | null;
    max_age: number | null;
    duration_minutes: number;
    maximum_capacity: number;
    minimum_capacity: number | null;
    environment: string | null;
    suggested_time: string | null;
    weather_sensitive: boolean;
    base_cost: string | null;
    status: string;
    notes: string | null;
};

export default function ActivityForm({
    activity,
    locations,
    statuses,
}: {
    activity?: Activity;
    locations: { id: number; name: string }[];
    statuses: string[];
}) {
    const route = activity ? update.form(activity.id) : store.form();

    return (
        <>
            <Head title={activity ? 'Edit activity' : 'New activity'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={activity ? 'Edit activity' : 'New activity'}
                    description="Store operational facts here; recommendation and itinerary rules will reuse them."
                />
                <Form {...route}>
                    {({ errors, processing }) => (
                        <div className="mx-auto grid w-full max-w-4xl gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Activity details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Name"
                                            htmlFor="name"
                                            error={errors.name}
                                            required
                                        >
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={
                                                    activity?.name ?? ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Slug"
                                            htmlFor="slug"
                                            error={errors.slug}
                                        >
                                            <Input
                                                id="slug"
                                                name="slug"
                                                defaultValue={
                                                    activity?.slug ?? ''
                                                }
                                                placeholder="Generated from name"
                                            />
                                        </FormField>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Location"
                                            htmlFor="location_id"
                                            error={errors.location_id}
                                        >
                                            <select
                                                id="location_id"
                                                name="location_id"
                                                defaultValue={
                                                    activity?.location_id ?? ''
                                                }
                                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            >
                                                <option value="">
                                                    No location selected
                                                </option>
                                                {locations.map((location) => (
                                                    <option
                                                        key={location.id}
                                                        value={location.id}
                                                    >
                                                        {location.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>
                                        <FormField
                                            label="Category"
                                            htmlFor="category"
                                            error={errors.category}
                                        >
                                            <Input
                                                id="category"
                                                name="category"
                                                defaultValue={
                                                    activity?.category ?? ''
                                                }
                                                placeholder="Science, history…"
                                            />
                                        </FormField>
                                    </div>
                                    <Checkboxes
                                        label="School levels"
                                        name="school_levels"
                                        values={[
                                            'primary',
                                            'secondary',
                                            'mixed',
                                        ]}
                                        selected={activity?.school_levels ?? []}
                                    />
                                    <Checkboxes
                                        label="Learning themes"
                                        name="learning_themes"
                                        values={[
                                            'science',
                                            'history',
                                            'geography',
                                            'culture',
                                            'hands_on',
                                        ]}
                                        selected={
                                            activity?.learning_themes ?? []
                                        }
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Operational constraints
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                        <FormField
                                            label="Duration (minutes)"
                                            htmlFor="duration_minutes"
                                            error={errors.duration_minutes}
                                            required
                                        >
                                            <Input
                                                id="duration_minutes"
                                                name="duration_minutes"
                                                type="number"
                                                min="15"
                                                defaultValue={
                                                    activity?.duration_minutes ??
                                                    60
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Maximum capacity"
                                            htmlFor="maximum_capacity"
                                            error={errors.maximum_capacity}
                                            required
                                        >
                                            <Input
                                                id="maximum_capacity"
                                                name="maximum_capacity"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    activity?.maximum_capacity ??
                                                    30
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Minimum capacity"
                                            htmlFor="minimum_capacity"
                                            error={errors.minimum_capacity}
                                        >
                                            <Input
                                                id="minimum_capacity"
                                                name="minimum_capacity"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    activity?.minimum_capacity ??
                                                    ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Base cost (RM)"
                                            htmlFor="base_cost"
                                            error={errors.base_cost}
                                        >
                                            <Input
                                                id="base_cost"
                                                name="base_cost"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue={
                                                    activity?.base_cost ?? ''
                                                }
                                            />
                                        </FormField>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                        <FormField
                                            label="Minimum age"
                                            htmlFor="min_age"
                                            error={errors.min_age}
                                        >
                                            <Input
                                                id="min_age"
                                                name="min_age"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    activity?.min_age ?? ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Maximum age"
                                            htmlFor="max_age"
                                            error={errors.max_age}
                                        >
                                            <Input
                                                id="max_age"
                                                name="max_age"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    activity?.max_age ?? ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Environment"
                                            htmlFor="environment"
                                            error={errors.environment}
                                        >
                                            <select
                                                id="environment"
                                                name="environment"
                                                defaultValue={
                                                    activity?.environment ?? ''
                                                }
                                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            >
                                                <option value="">
                                                    Not specified
                                                </option>
                                                <option value="indoor">
                                                    Indoor
                                                </option>
                                                <option value="outdoor">
                                                    Outdoor
                                                </option>
                                                <option value="mixed">
                                                    Mixed
                                                </option>
                                            </select>
                                        </FormField>
                                        <FormField
                                            label="Suggested time"
                                            htmlFor="suggested_time"
                                            error={errors.suggested_time}
                                        >
                                            <Input
                                                id="suggested_time"
                                                name="suggested_time"
                                                defaultValue={
                                                    activity?.suggested_time ??
                                                    ''
                                                }
                                                placeholder="Morning"
                                            />
                                        </FormField>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FormField
                                            label="Status"
                                            htmlFor="status"
                                            error={errors.status}
                                            required
                                        >
                                            <select
                                                id="status"
                                                name="status"
                                                defaultValue={
                                                    activity?.status ?? 'draft'
                                                }
                                                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                            >
                                                {statuses.map((status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>
                                        <label className="flex items-center gap-3 self-end rounded-md border px-3 py-2 text-sm">
                                            <input
                                                type="hidden"
                                                name="weather_sensitive"
                                                value="0"
                                            />
                                            <input
                                                type="checkbox"
                                                name="weather_sensitive"
                                                value="1"
                                                defaultChecked={
                                                    activity?.weather_sensitive ??
                                                    false
                                                }
                                            />{' '}
                                            Weather sensitive
                                        </label>
                                    </div>
                                    <FormField
                                        label="Operational notes"
                                        htmlFor="notes"
                                        error={errors.notes}
                                    >
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            defaultValue={activity?.notes ?? ''}
                                            className={textareaClassName}
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" asChild>
                                    <Link
                                        href={
                                            activity
                                                ? show(activity.id)
                                                : index()
                                        }
                                    >
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Save activity'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

function Checkboxes({
    label,
    name,
    values,
    selected,
}: {
    label: string;
    name: string;
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
                        className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
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
ActivityForm.layout = {
    breadcrumbs: [
        { title: 'Activities', href: index() },
        { title: 'Form', href: '#' },
    ],
};
