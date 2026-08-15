<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSchoolRequest;
use App\Http\Requests\UpdateSchoolRequest;
use App\Models\School;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', School::class);

        return Inertia::render('admin/schools/index', [
            'schools' => School::query()
                ->select(['id', 'name', 'type', 'level', 'location', 'created_at'])
                ->withCount(['contacts', 'leads'])
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
        Gate::authorize('create', School::class);

        return Inertia::render('admin/schools/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolRequest $request): RedirectResponse
    {
        $school = School::create($request->validated());

        return to_route('admin.schools.show', $school)->with('success', 'School created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school): Response
    {
        Gate::authorize('view', $school);

        return Inertia::render('admin/schools/show', [
            'school' => $school->load(['contacts' => fn ($query) => $query->orderByDesc('is_primary')->orderBy('name'), 'leads' => fn ($query) => $query->latest()->limit(10)]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(School $school): Response
    {
        Gate::authorize('update', $school);

        return Inertia::render('admin/schools/form', ['school' => $school]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolRequest $request, School $school): RedirectResponse
    {
        $school->update($request->validated());

        return to_route('admin.schools.show', $school)->with('success', 'School updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school): RedirectResponse
    {
        Gate::authorize('delete', $school);
        $school->delete();

        return to_route('admin.schools.index')->with('success', 'School deleted.');
    }
}
