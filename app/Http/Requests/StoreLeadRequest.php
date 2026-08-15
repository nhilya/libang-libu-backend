<?php

namespace App\Http\Requests;

use App\LeadStatus;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\School;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('create', Lead::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'school_id' => ['required', 'integer', Rule::exists((new School)->getTable(), 'id')],
            'contact_id' => ['nullable', 'integer', Rule::exists((new Contact)->getTable(), 'id')->where('school_id', $this->integer('school_id'))],
            'assigned_to' => ['nullable', 'integer', Rule::exists((new User)->getTable(), 'id')],
            'source' => ['required', 'string', 'max:50'],
            'status' => ['required', Rule::enum(LeadStatus::class)],
            'school_level' => ['required', Rule::in(['primary', 'secondary', 'mixed'])],
            'student_count' => ['required', 'integer', 'min:1', 'max:10000'],
            'duration_days' => ['required', 'integer', 'min:1', 'max:30'],
            'duration_nights' => ['required', 'integer', 'min:0', 'lt:duration_days'],
            'learning_interests' => ['nullable', 'array'],
            'learning_interests.*' => ['string', 'max:50'],
            'experience_preferences' => ['nullable', 'array'],
            'experience_preferences.*' => ['string', 'max:50'],
            'budget_min' => ['nullable', 'numeric', 'min:0'],
            'budget_max' => ['nullable', 'numeric', 'gte:budget_min'],
            'learning_objective' => ['nullable', 'string', 'max:3000'],
            'indicative_price' => ['nullable', 'numeric', 'min:0'],
            'next_follow_up_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
