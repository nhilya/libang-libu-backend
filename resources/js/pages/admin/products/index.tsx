import { Form, Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { create, index, show } from '@/routes/admin/products';
import type { Paginated } from '@/types';

type ProductRow = {
    id: number;
    name: string;
    slug: string;
    status: string;
    product_type: string | null;
    customer_segment: string | null;
    programmes_count: number;
    company: { id: number; name: string };
};

export default function ProductsIndex({
    products,
    filters,
}: {
    products: Paginated<ProductRow>;
    filters: { search?: string };
}) {
    return (
        <>
            <Head title="Products" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title="Products"
                    description="Company-level travel products that can contain multiple programmes."
                    actions={
                        <Button asChild>
                            <Link href={create()}>
                                <Plus /> New product
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
                                    placeholder="Search products…"
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
                    {products.data.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">
                                            Product
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Company
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Type
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Programmes
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={show(product.id)}
                                                    className="font-medium hover:underline"
                                                >
                                                    {product.name}
                                                </Link>
                                                <p className="text-xs text-muted-foreground">
                                                    /{product.slug}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                {product.company.name}
                                            </td>
                                            <td className="px-5 py-4 capitalize">
                                                {product.product_type?.replaceAll(
                                                    '_',
                                                    ' ',
                                                ) ?? '—'}
                                            </td>
                                            <td className="px-5 py-4 tabular-nums">
                                                {product.programmes_count}
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={product.status}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <CardContent className="grid place-items-center gap-3 py-16 text-center">
                            <p className="font-medium">No products yet</p>
                            <p className="text-sm text-muted-foreground">
                                Create Ipoh School Outing as the first reusable
                                product.
                            </p>
                            <Button size="sm" asChild>
                                <Link href={create()}>Create product</Link>
                            </Button>
                        </CardContent>
                    )}
                </Card>
                <Pagination links={products.links} />
            </div>
        </>
    );
}

ProductsIndex.layout = { breadcrumbs: [{ title: 'Products', href: index() }] };
