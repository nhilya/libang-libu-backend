import { Link, usePage } from '@inertiajs/react';
import {
    Boxes,
    ClipboardList,
    ContactRound,
    FileBarChart,
    LayoutDashboard,
    Mail,
    MapPinned,
    Package,
    School,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/admin';
import { index as activitiesIndex } from '@/routes/admin/activities';
import { index as contactsIndex } from '@/routes/admin/contacts';
import { index as emailPreviewIndex } from '@/routes/admin/email-preview';
import { index as leadsIndex } from '@/routes/admin/leads';
import { index as operationsIndex } from '@/routes/admin/operations';
import { index as productsIndex } from '@/routes/admin/products';
import { index as programmesIndex } from '@/routes/admin/programmes';
import { index as reportsIndex } from '@/routes/admin/reports';
import { index as schoolsIndex } from '@/routes/admin/schools';
import type { NavItem } from '@/types';

const dashboardItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Trip Operations',
        href: operationsIndex(),
        icon: MapPinned,
    },
    {
        title: 'Reports',
        href: reportsIndex(),
        icon: FileBarChart,
    },
    {
        title: 'Email Preview',
        href: emailPreviewIndex(),
        icon: Mail,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;

    const salesItems: NavItem[] = [
        auth.permissions.view_sales && {
            title: 'Leads',
            href: leadsIndex(),
            icon: ClipboardList,
        },
        auth.permissions.view_schools && {
            title: 'Schools',
            href: schoolsIndex(),
            icon: School,
        },
        auth.permissions.view_contacts && {
            title: 'Contacts',
            href: contactsIndex(),
            icon: ContactRound,
        },
    ].filter(Boolean) as NavItem[];

    const productItems: NavItem[] = [
        auth.permissions.view_products && {
            title: 'Products',
            href: productsIndex(),
            icon: Package,
        },
        auth.permissions.view_programmes && {
            title: 'Programmes',
            href: programmesIndex(),
            icon: Boxes,
        },
        auth.permissions.view_activities && {
            title: 'Activities',
            href: activitiesIndex(),
            icon: ClipboardList,
        },
    ].filter(Boolean) as NavItem[];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={dashboardItems} label="Overview" />
                {salesItems.length > 0 && (
                    <NavMain items={salesItems} label="Sales" />
                )}
                {productItems.length > 0 && (
                    <NavMain items={productItems} label="Products" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
