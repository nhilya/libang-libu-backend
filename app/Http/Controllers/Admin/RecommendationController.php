<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveRecommendationRequest;
use App\Models\Activity;
use App\Models\Lead;
use App\Models\Programme;
use App\Models\Recommendation;
use App\RecordStatus;
use App\Services\Recommendations\RecommendationValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RecommendationController extends Controller
{
    public function edit(Lead $lead): Response
    {
        Gate::authorize('update', $lead);

        return Inertia::render('admin/recommendations/form', [
            'lead' => $lead->load(['school:id,name', 'recommendation.activities:id', 'recommendation.programme:id,name']),
            'programmes' => Programme::query()->where('status', RecordStatus::Active)->select(['id', 'name', 'school_levels', 'min_group_size', 'max_group_size', 'indicative_price_min', 'indicative_price_max'])->orderBy('name')->get(),
            'activities' => Activity::query()->where('status', RecordStatus::Active)->select(['id', 'name', 'category', 'school_levels', 'duration_minutes', 'maximum_capacity'])->orderBy('name')->get(),
        ]);
    }

    public function store(SaveRecommendationRequest $request, Lead $lead, RecommendationValidator $validator): RedirectResponse
    {
        $programme = Programme::findOrFail($request->integer('programme_id'));
        $activities = Activity::query()->whereKey($request->array('activity_ids'))->get();
        $validation = $validator->validate($lead, $programme, $activities);

        $recommendation = Recommendation::updateOrCreate(['lead_id' => $lead->id], [
            'programme_id' => $programme->id,
            'explanation' => $request->string('explanation')->value() ?: null,
            'warnings' => $validation['warnings'],
            'status' => $validation['status'],
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);
        $recommendation->activities()->sync($activities->mapWithKeys(fn (Activity $activity, int $index) => [$activity->id => ['sort_order' => $index + 1]]));

        return to_route('admin.leads.show', $lead)->with('success', 'Recommendation reviewed and validated.');
    }
}
