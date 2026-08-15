<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Models\Activity;
use App\Models\Location;
use App\RecordStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Activity::class);

        return Inertia::render('admin/activities/index', [
            'activities' => Activity::query()
                ->select(['id', 'location_id', 'name', 'category', 'duration_minutes', 'maximum_capacity', 'environment', 'weather_sensitive', 'status', 'created_at'])
                ->with('location:id,name')
                ->when($request->string('search')->isNotEmpty(), fn ($query) => $query->where('name', 'like', '%'.$request->string('search')->value().'%'))
                ->latest()
                ->paginate(15)
                ->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Activity::class);

        return Inertia::render('admin/activities/form', $this->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityRequest $request): RedirectResponse
    {
        $activity = Activity::create($request->validated());

        return to_route('admin.activities.show', $activity)->with('success', 'Activity created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity): Response
    {
        Gate::authorize('view', $activity);

        return Inertia::render('admin/activities/show', ['activity' => $activity->load(['location:id,name,address', 'learningOutcomes:id,code,description'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity): Response
    {
        Gate::authorize('update', $activity);

        return Inertia::render('admin/activities/form', [...$this->formOptions(), 'activity' => $activity]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityRequest $request, Activity $activity): RedirectResponse
    {
        $activity->update($request->validated());

        return to_route('admin.activities.show', $activity)->with('success', 'Activity updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity): RedirectResponse
    {
        Gate::authorize('delete', $activity);
        $activity->delete();

        return to_route('admin.activities.index')->with('success', 'Activity deleted.');
    }

    /** @return array<string, mixed> */
    private function formOptions(): array
    {
        return [
            'locations' => Location::query()->select(['id', 'name'])->orderBy('name')->get(),
            'statuses' => RecordStatus::cases(),
        ];
    }
}
