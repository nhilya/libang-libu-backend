import type { PaginationLink } from '@/components/admin/pagination';

export type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

export type NamedRecord = {
    id: number;
    name: string;
};
