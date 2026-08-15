import { Form, Head, Link } from '@inertiajs/react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { index, show, store, update } from '@/routes/admin/programmes';

type Programme = {
    id: number;
    product_id: number;
    name: string;
    slug: string;
    description: string | null;
    duration_days: number;
    duration_nights: number;
    school_levels: string[] | null;
    min_group_size: number | null;
    max_group_size: number | null;
    themes: string[] | null;
    indicative_price_min: string | null;
    indicative_price_max: string | null;
    status: string;
};
const themes = ['science', 'history', 'geography', 'culture', 'teamwork'];

export default function ProgrammeForm({
    programme,
    products,
    statuses,
}: {
    programme?: Programme;
    products: { id: number; name: string }[];
    statuses: string[];
}) {
    const route = programme ? update.form(programme.id) : store.form();

    return (
        <>
            <Head title={programme ? 'Edit programme' : 'New programme'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={programme ? 'Edit programme' : 'New programme'}
                    description="Define suitability, duration and commercial guardrails before matching leads."
                />
                <Form {...route}>
                    {({ errors, processing }) => (
                        <div className="mx-auto grid w-full max-w-4xl gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Programme details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <FormField
                                        label="Product"
                                        htmlFor="product_id"
                                        error={errors.product_id}
                                        required
                                    >
                                        <select
                                            id="product_id"
                                            name="product_id"
                                            defaultValue={
                                                programme?.product_id ?? ''
                                            }
                                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="" disabled>
                                                Select product
                                            </option>
                                            {products.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.id}
                                                >
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>
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
                                                    programme?.name ?? ''
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
                                                    programme?.slug ?? ''
                                                }
                                                placeholder="Generated from name"
                                            />
                                        </FormField>
                                    </div>
                                    <FormField
                                        label="Description"
                                        htmlFor="description"
                                        error={errors.description}
                                    >
                                        <textarea
                                            id="description"
                                            name="description"
                                            defaultValue={
                                                programme?.description ?? ''
                                            }
                                            className={textareaClassName}
                                        />
                                    </FormField>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Suitability and capacity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-5">
                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                                                    programme?.duration_days ??
                                                    1
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
                                                    programme?.duration_nights ??
                                                    0
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Minimum group"
                                            htmlFor="min_group_size"
                                            error={errors.min_group_size}
                                        >
                                            <Input
                                                id="min_group_size"
                                                name="min_group_size"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    programme?.min_group_size ??
                                                    ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Maximum group"
                                            htmlFor="max_group_size"
                                            error={errors.max_group_size}
                                        >
                                            <Input
                                                id="max_group_size"
                                                name="max_group_size"
                                                type="number"
                                                min="1"
                                                defaultValue={
                                                    programme?.max_group_size ??
                                                    ''
                                                }
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
                                        selected={
                                            programme?.school_levels ?? []
                                        }
                                    />
                                    <Checkboxes
                                        label="Learning themes"
                                        name="themes"
                                        values={themes}
                                        selected={programme?.themes ?? []}
                                    />
                                    <div className="grid gap-5 sm:grid-cols-3">
                                        <FormField
                                            label="Price min (RM)"
                                            htmlFor="indicative_price_min"
                                            error={errors.indicative_price_min}
                                        >
                                            <Input
                                                id="indicative_price_min"
                                                name="indicative_price_min"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue={
                                                    programme?.indicative_price_min ??
                                                    ''
                                                }
                                            />
                                        </FormField>
                                        <FormField
                                            label="Price max (RM)"
                                            htmlFor="indicative_price_max"
                                            error={errors.indicative_price_max}
                                        >
                                            <Input
                                                id="indicative_price_max"
                                                name="indicative_price_max"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                defaultValue={
                                                    programme?.indicative_price_max ??
                                                    ''
                                                }
                                            />
                                        </FormField>
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
                                                    programme?.status ?? 'draft'
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
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" asChild>
                                    <Link
                                        href={
                                            programme
                                                ? show(programme.id)
                                                : index()
                                        }
                                    >
                                        Cancel
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving…' : 'Save programme'}
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
                        <span className="capitalize">{value}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
ProgrammeForm.layout = {
    breadcrumbs: [
        { title: 'Programmes', href: index() },
        { title: 'Form', href: '#' },
    ],
};
