<?php

namespace App\Http\Requests;

use App\Models\Activity;
use App\Models\Lead;
use App\Models\Programme;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveRecommendationRequest extends FormRequest
{
    public function authorize(): bool
    {
        $lead = $this->route('lead');

        return $lead instanceof Lead && ($this->user()?->can('update', $lead) ?? false);
    }

    /** @return array<string, ValidationRule|array<mixed>|string> */
    public function rules(): array
    {
        return [
            'programme_id' => ['required', 'integer', Rule::exists((new Programme)->getTable(), 'id')],
            'activity_ids' => ['nullable', 'array'],
            'activity_ids.*' => ['integer', 'distinct', Rule::exists((new Activity)->getTable(), 'id')],
            'explanation' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
