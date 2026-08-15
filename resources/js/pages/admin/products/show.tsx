import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { edit, index } from '@/routes/admin/products';
import {
    create as programmeCreate,
    show as programmeShow,
} from '@/routes/admin/programmes';

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    status: string;
    product_type: string | null;
    customer_segment: string | null;
    company: { id: number; name: string };
    programmes: {
        id: number;
        name: string;
        status: string;
        duration_days: number;
        duration_nights: number;
    }[];
};

export default function ProductShow({ product }: { product: Product }) {
    return (
        <>
            <Head title={product.name} />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
                <PageHeader
                    title={product.name}
                    description={`${product.company.name} · ${product.product_type?.replaceAll('_', ' ') ?? 'Product'}`}
                    actions={
                        <>
                            <StatusBadge status={product.status} />
                            <Button asChild>
                                <Link href={edit(product.id)}>
                                    <Pencil /> Edit product
                                </Link>
                            </Button>
                        </>
                    }
                />
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product profile</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 text-sm">
                            <Detail label="Slug" value={product.slug} />
                            <Detail
                                label="Customer segment"
                                value={product.customer_segment}
                            />
                            <Detail
                                label="Description"
                                value={product.description}
                            />
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex-row items-center justify-between">
                            <CardTitle>Programmes</CardTitle>
                            <Button size="sm" variant="outline" asChild>
                                <Link href={programmeCreate()}>
                                    <Plus /> Add programme
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {product.programmes.length ? (
                                <div className="divide-y rounded-lg border">
                                    {product.programmes.map((programme) => (
                                        <Link
                                            key={programme.id}
                                            href={programmeShow(programme.id)}
                                            className="flex items-center justify-between gap-4 p-4 hover:bg-muted/30"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {programme.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {programme.duration_days}D
                                                    {programme.duration_nights}N
                                                </p>
                                            </div>
                                            <StatusBadge
                                                status={programme.status}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                    No programmes yet. Add the first sellable
                                    itinerary framework.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="grid gap-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label}
            </p>
            <p className="capitalize">{value || '—'}</p>
        </div>
    );
}
ProductShow.layout = {
    breadcrumbs: [
        { title: 'Products', href: index() },
        { title: 'Product', href: '#' },
    ],
};
