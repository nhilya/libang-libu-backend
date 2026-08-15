<?php

namespace App\Services\Leads;

use App\Models\Lead;
use Illuminate\Support\Str;

class LeadReferenceGenerator
{
    public function next(): string
    {
        $prefix = 'LLT-'.now()->year.'-';
        $latestReference = Lead::query()
            ->where('reference', 'like', $prefix.'%')
            ->lockForUpdate()
            ->latest('id')
            ->value('reference');

        $nextSequence = ((int) Str::afterLast($latestReference ?? '0', '-')) + 1;

        return $prefix.str_pad((string) $nextSequence, 5, '0', STR_PAD_LEFT);
    }
}
