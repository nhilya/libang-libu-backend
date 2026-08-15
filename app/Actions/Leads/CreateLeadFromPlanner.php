<?php

namespace App\Actions\Leads;

use App\LeadStatus;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\School;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class CreateLeadFromPlanner
{
    public function __construct(private CreateLead $createLead) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Lead
    {
        return DB::transaction(function () use ($attributes): Lead {
            $school = School::firstOrCreate([
                'name' => $attributes['school_name'],
                'location' => $attributes['school_location'] ?? null,
            ], [
                'type' => $attributes['school_type'] ?? null,
                'level' => $attributes['school_level'],
            ]);

            $contact = Contact::firstOrCreate([
                'school_id' => $school->id,
                'email' => $attributes['contact_email'],
            ], [
                'name' => $attributes['contact_name'],
                'role' => $attributes['contact_role'] ?? null,
                'phone' => $attributes['contact_phone'],
                'is_primary' => ! $school->contacts()->exists(),
            ]);

            return $this->createLead->handle([
                ...Arr::only($attributes, [
                    'school_level', 'student_count', 'duration_days', 'duration_nights',
                    'learning_interests', 'experience_preferences', 'budget_min',
                    'budget_max', 'learning_objective',
                ]),
                'school_id' => $school->id,
                'contact_id' => $contact->id,
                'source' => 'website',
                'status' => LeadStatus::New,
            ]);
        }, 3);
    }
}
