<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProgrammeRequest;
use App\Http\Requests\UpdateProgrammeRequest;
use App\Models\Product;
use App\Models\Programme;
use App\RecordStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProgrammeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Programme::class);

        return Inertia::render('admin/programmes/index', [
            'programmes' => Programme::query()
                ->select(['id', 'product_id', 'name', 'status', 'duration_days', 'duration_nights', 'min_group_size', 'max_group_size', 'created_at'])
                ->with('product:id,name')
                ->withCount('activities')
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
        Gate::authorize('create', Programme::class);

        return Inertia::render('admin/programmes/form', $this->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgrammeRequest $request): RedirectResponse
    {
        $programme = Programme::create($request->validated());

        return to_route('admin.programmes.show', $programme)->with('success', 'Programme created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Programme $programme): Response
    {
        Gate::authorize('view', $programme);

        return Inertia::render('admin/programmes/show', ['programme' => $programme->load(['product:id,name', 'activities:id,name,duration_minutes,maximum_capacity,status'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programme $programme): Response
    {
        Gate::authorize('update', $programme);

        return Inertia::render('admin/programmes/form', [...$this->formOptions(), 'programme' => $programme]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgrammeRequest $request, Programme $programme): RedirectResponse
    {
        $programme->update($request->validated());

        return to_route('admin.programmes.show', $programme)->with('success', 'Programme updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programme $programme): RedirectResponse
    {
        Gate::authorize('delete', $programme);
        $programme->delete();

        return to_route('admin.programmes.index')->with('success', 'Programme deleted.');
    }

    /** @return array<string, mixed> */
    private function formOptions(): array
    {
        return [
            'products' => Product::query()->select(['id', 'name'])->orderBy('name')->get(),
            'statuses' => RecordStatus::cases(),
        ];
    }
}
