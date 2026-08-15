<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, ValidationRule|array<mixed>|string> */
    public function rules(): array
    {
        return [
            'school_name' => ['required', 'string', 'max:255'],
            'school_type' => ['nullable', 'string', 'max:100'],
            'school_level' => ['required', Rule::in(['primary', 'secondary', 'mixed'])],
            'school_location' => ['nullable', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'contact_role' => ['nullable', 'string', 'max:100'],
            'contact_phone' => ['required', 'string', 'max:50'],
            'contact_email' => ['required', 'email', 'max:255'],
            'student_count' => ['required', 'integer', 'min:1', 'max:10000'],
            'duration_days' => ['required', 'integer', 'min:1', 'max:30'],
            'duration_nights' => ['required', 'integer', 'min:0', 'lt:duration_days'],
            'learning_interests' => ['required', 'array', 'min:1'],
            'learning_interests.*' => ['string', 'max:50'],
            'experience_preferences' => ['nullable', 'array'],
            'experience_preferences.*' => ['string', 'max:50'],
            'budget_min' => ['nullable', 'numeric', 'min:0'],
            'budget_max' => ['nullable', 'numeric', 'gte:budget_min'],
            'learning_objective' => ['nullable', 'string', 'max:3000'],
        ];
    }
}
