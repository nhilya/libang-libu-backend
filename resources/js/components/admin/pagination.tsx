import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export function Pagination({ links }: { links: PaginationLink[] }) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav
            className="flex flex-wrap items-center justify-end gap-1"
            aria-label="Pagination"
        >
            {links.map((link, index) => (
                <Button
                    key={`${link.label}-${index}`}
                    variant={link.active ? 'default' : 'outline'}
                    size="sm"
                    asChild={Boolean(link.url)}
                    disabled={!link.url}
                >
                    {link.url ? (
                        <Link href={link.url} preserveScroll>
                            {decodeLabel(link.label)}
                        </Link>
                    ) : (
                        <span>{decodeLabel(link.label)}</span>
                    )}
                </Button>
            ))}
        </nav>
    );
}

function decodeLabel(label: string): string {
    return label.replace('&laquo;', '«').replace('&raquo;', '»');
}
