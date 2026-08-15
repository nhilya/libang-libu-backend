import { Form, Head, Link } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { show as leadShow } from '@/routes/admin/leads';
import { store } from '@/routes/admin/leads/recommendation';

type Programme = {
    id: number;
    name: string;
    school_levels: string[] | null;
    min_group_size: number | null;
    max_group_size: number | null;
    indicative_price_min: string | null;
    indicative_price_max: string | null;
};
type Activity = {
    id: number;
    name: string;
    category: string | null;
    school_levels: string[] | null;
    duration_minutes: number;
    maximum_capacity: number;
};
type Lead = {
    id: number;
    reference: string;
    school_level: string;
    student_count: number;
    budget_min: string | null;
    budget_max: string | null;
    school: { id: number; name: string } | null;
    recommendation: {
        programme_id: number | null;
        explanation: string | null;
        activities: { id: number }[];
    } | null;
};

export default function RecommendationForm({
    lead,
    programmes,
    activities,
}: {
    lead: Lead;
    programmes: Programme[];
    activities: Activity[];
}) {
    const selectedActivities =
        lead.recommendation?.activities.map((activity) => activity.id) ?? [];

    return (
        <>
            <Head title={`Recommendation · ${lead.reference}`} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Review recommendation"
                    description={`${lead.reference} · ${lead.school?.name ?? 'School not set'} · ${lead.student_count} students`}
                />
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                    <p className="font-medium">Human approval required</p>
                    <p className="mt-1">
                        The system validates capacity, suitability and budget.
                        Staff remain responsible for programme selection and
                        final approval.
                    </p>
                </div>
                <Form {...store.form(lead.id)}>
                    {({ errors, processing }) => (
                        <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Programme</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <FormField
                                        label="Recommended programme"
                                        htmlFor="programme_id"
                                        error={errors.programme_id}
                                        required
                                    >
                                        <select
                                            id="programme_id"
                                            name="programme_id"
                                            defaultValue={
                                                lead.recommendation
                                                    ?.programme_id ?? ''
                                            }
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="" disabled>
                                                Select programme
                                            </option>
                                            {programmes.map((programme) => (
                                                <option
                                                    key={programme.id}
                                                    value={programme.id}
                                                >
                                                    {programme.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>
                                    <div className="grid gap-2">
                                        {programmes.map((programme) => (
                                            <div
                                                key={programme.id}
                                                className="rounded-lg border p-3 text-sm"
                                            >
                                                <p className="font-medium">
                                                    {programme.name}
                                                </p>
                                                <p className="mt-1 text-muted-foreground">
                                                    Levels:{' '}
                                                    {programme.school_levels?.join(
                                                        ', ',
                                                    ) ?? 'Any'}{' '}
                                                    · Group{' '}
                                                    {programme.min_group_size ??
                                                        '—'}
                                                    –
                                                    {programme.max_group_size ??
                                                        '—'}{' '}
                                                    · RM{' '}
                                                    {programme.indicative_price_min ??
                                                        '—'}
                                                    –
                                                    {programme.indicative_price_max ??
                                                        '—'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <FormField
                                        label="Recommendation explanation"
                                        htmlFor="explanation"
                                        error={errors.explanation}
                                    >
                                        <textarea
                                            id="explanation"
                                            name="explanation"
                                            defaultValue={
                                                lead.recommendation
                                                    ?.explanation ?? ''
                                            }
                                            className={textareaClassName}
                                            placeholder="Explain why this programme suits the school’s objectives."
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Recommended activities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-3">
                                    {activities.map((activity) => {
                                        const capacityConflict =
                                            lead.student_count >
                                            activity.maximum_capacity;
                                        const levelConflict = Boolean(
                                            activity.school_levels &&
                                            !activity.school_levels.includes(
                                                lead.school_level,
                                            ),
                                        );

                                        return (
                                            <label
                                                key={activity.id}
                                                className="flex cursor-pointer gap-3 rounded-lg border p-4"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="activity_ids[]"
                                                    value={activity.id}
                                                    defaultChecked={selectedActivities.includes(
                                                        activity.id,
                                                    )}
                                                    className="mt-1"
                                                />
                                                <span className="grid flex-1 gap-1">
                                                    <span className="flex items-center justify-between gap-3">
                                                        <span className="font-medium">
                                                            {activity.name}
                                                        </span>
                                                        {capacityConflict ||
                                                        levelConflict ? (
                                                            <AlertTriangle className="size-4 text-amber-600" />
                                                        ) : (
                                                            <CheckCircle2 className="size-4 text-emerald-600" />
                                                        )}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {
                                                            activity.duration_minutes
                                                        }{' '}
                                                        min · capacity{' '}
                                                        {
                                                            activity.maximum_capacity
                                                        }{' '}
                                                        ·{' '}
                                                        {activity.category ??
                                                            'Uncategorised'}
                                                    </span>
                                                    {capacityConflict && (
                                                        <span className="text-xs font-medium text-red-600">
                                                            Capacity is below
                                                            the requested group
                                                            size.
                                                        </span>
                                                    )}
                                                    {levelConflict && (
                                                        <span className="text-xs font-medium text-red-600">
                                                            Not suitable for{' '}
                                                            {lead.school_level}{' '}
                                                            level.
                                                        </span>
                                                    )}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                            <div className="flex justify-end gap-3 xl:col-span-2">
                                <Button variant="outline" asChild>
                                    <Link href={leadShow(lead.id)}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Validating…'
                                        : 'Save and validate'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

RecommendationForm.layout = {
    breadcrumbs: [
        { title: 'Leads', href: '#' },
        { title: 'Recommendation', href: '#' },
    ],
};
