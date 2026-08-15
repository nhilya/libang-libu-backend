<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Leads\CreateLead;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\LeadStatus;
use App\Models\Lead;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Lead::class);

        return Inertia::render('admin/leads/index', [
            'leads' => Lead::query()
                ->select(['id', 'reference', 'school_id', 'assigned_to', 'source', 'status', 'school_level', 'student_count', 'next_follow_up_at', 'created_at'])
                ->with(['school:id,name', 'assignee:id,name'])
                ->when($request->string('search')->isNotEmpty(), function ($query) use ($request): void {
                    $search = $request->string('search')->value();
                    $query->where(fn ($query) => $query
                        ->where('reference', 'like', "%{$search}%")
                        ->orWhereHas('school', fn ($query) => $query->where('name', 'like', "%{$search}%")));
                })
                ->when($request->string('status')->isNotEmpty(), fn ($query) => $query->where('status', $request->string('status')->value()))
                ->latest()
                ->paginate(15)
                ->withQueryString(),
            'filters' => $request->only(['search', 'status']),
            'statuses' => LeadStatus::cases(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Lead::class);

        return Inertia::render('admin/leads/form', $this->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request, CreateLead $createLead): RedirectResponse
    {
        $lead = $createLead->handle($request->validated());

        return to_route('admin.leads.show', $lead)->with('success', 'Lead created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lead $lead): Response
    {
        Gate::authorize('view', $lead);

        return Inertia::render('admin/leads/show', [
            'lead' => $lead->load(['school:id,name,type,level,location', 'contact:id,school_id,name,role,phone,email', 'assignee:id,name', 'recommendation.programme:id,name', 'recommendation.activities:id,name']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lead $lead): Response
    {
        Gate::authorize('update', $lead);

        return Inertia::render('admin/leads/form', [
            ...$this->formOptions(),
            'lead' => $lead,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead): RedirectResponse
    {
        $lead->update($request->validated());

        return to_route('admin.leads.show', $lead)->with('success', 'Lead updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lead $lead): RedirectResponse
    {
        Gate::authorize('delete', $lead);
        $lead->delete();

        return to_route('admin.leads.index')->with('success', 'Lead deleted.');
    }

    /** @return array<string, mixed> */
    private function formOptions(): array
    {
        return [
            'schools' => School::query()->select(['id', 'name'])->with('contacts:id,school_id,name')->orderBy('name')->get(),
            'staff' => User::query()->select(['id', 'name'])->orderBy('name')->get(),
            'statuses' => LeadStatus::cases(),
        ];
    }
}
