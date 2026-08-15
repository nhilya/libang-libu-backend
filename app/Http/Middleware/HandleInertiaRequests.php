<?php

namespace App\Http\Middleware;

use App\Models\Activity;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Programme;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user,
                'permissions' => $user ? [
                    'view_sales' => $user->can('viewAny', Lead::class),
                    'view_schools' => $user->can('viewAny', School::class),
                    'view_contacts' => $user->can('viewAny', Contact::class),
                    'view_products' => $user->can('viewAny', Product::class),
                    'view_programmes' => $user->can('viewAny', Programme::class),
                    'view_activities' => $user->can('viewAny', Activity::class),
                ] : [],
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
