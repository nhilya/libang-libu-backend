import { Form, Head, Link } from '@inertiajs/react';
import { FormField, textareaClassName } from '@/components/admin/form-field';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { index, show, store, update } from '@/routes/admin/products';

type Product = {
    id: number;
    company_id: number;
    name: string;
    slug: string;
    description: string | null;
    status: string;
    product_type: string | null;
    customer_segment: string | null;
};

export default function ProductForm({
    product,
    companies,
    statuses,
}: {
    product?: Product;
    companies: { id: number; name: string }[];
    statuses: string[];
}) {
    const route = product ? update.form(product.id) : store.form();

    return (
        <>
            <Head title={product ? 'Edit product' : 'New product'} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={product ? 'Edit product' : 'New product'}
                    description="Keep products generic so future Libang Libu Travel offerings fit the same platform."
                />
                <Form {...route}>
                    {({ errors, processing }) => (
                        <Card className="mx-auto w-full max-w-3xl">
                            <CardHeader>
                                <CardTitle>Product details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-5">
                                <FormField
                                    label="Company"
                                    htmlFor="company_id"
                                    error={errors.company_id}
                                    required
                                >
                                    <select
                                        id="company_id"
                                        name="company_id"
                                        defaultValue={product?.company_id ?? ''}
                                        className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="" disabled>
                                            Select company
                                        </option>
                                        {companies.map((company) => (
                                            <option
                                                key={company.id}
                                                value={company.id}
                                            >
                                                {company.name}
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
                                            defaultValue={product?.name ?? ''}
                                            autoFocus
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
                                            defaultValue={product?.slug ?? ''}
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
                                            product?.description ?? ''
                                        }
                                        className={textareaClassName}
                                    />
                                </FormField>
                                <div className="grid gap-5 sm:grid-cols-3">
                                    <FormField
                                        label="Product type"
                                        htmlFor="product_type"
                                        error={errors.product_type}
                                    >
                                        <Input
                                            id="product_type"
                                            name="product_type"
                                            defaultValue={
                                                product?.product_type ??
                                                'educational_tour'
                                            }
                                        />
                                    </FormField>
                                    <FormField
                                        label="Customer segment"
                                        htmlFor="customer_segment"
                                        error={errors.customer_segment}
                                    >
                                        <Input
                                            id="customer_segment"
                                            name="customer_segment"
                                            defaultValue={
                                                product?.customer_segment ??
                                                'schools'
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
                                                product?.status ?? 'draft'
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
                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" asChild>
                                        <Link
                                            href={
                                                product
                                                    ? show(product.id)
                                                    : index()
                                            }
                                        >
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving…'
                                            : 'Save product'}
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

ProductForm.layout = {
    breadcrumbs: [
        { title: 'Products', href: index() },
        { title: 'Form', href: '#' },
    ],
};
