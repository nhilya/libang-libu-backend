<?php

namespace App\Actions\Leads;

use App\Models\Lead;
use App\Services\Leads\LeadReferenceGenerator;
use Illuminate\Support\Facades\DB;

class CreateLead
{
    public function __construct(private LeadReferenceGenerator $referenceGenerator) {}

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function handle(array $attributes): Lead
    {
        return DB::transaction(fn (): Lead => Lead::create([
            ...$attributes,
            'reference' => $this->referenceGenerator->next(),
        ]), 3);
    }
}
