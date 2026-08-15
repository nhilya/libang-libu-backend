<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\LeadStatus;
use App\Models\Lead;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'metrics' => [
                'new_enquiries' => Lead::where('status', LeadStatus::New)->count(),
                'pending_quotations' => 0,
                'confirmed_trips' => 0,
                'students_this_month' => Lead::where('status', LeadStatus::Confirmed)
                    ->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])
                    ->sum('student_count'),
            ],
            'actions' => [
                'follow_ups_due' => Lead::whereNotNull('next_follow_up_at')->where('next_follow_up_at', '<=', now())->count(),
                'unassigned_leads' => Lead::whereNull('assigned_to')->count(),
                'recommendations_pending' => Lead::whereDoesntHave('recommendation')->where('status', LeadStatus::Qualified)->count(),
            ],
            'recentLeads' => Lead::query()
                ->select(['id', 'reference', 'school_id', 'status', 'student_count', 'created_at'])
                ->with('school:id,name')
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
