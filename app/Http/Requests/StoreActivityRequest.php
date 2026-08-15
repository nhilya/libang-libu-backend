<?php

namespace App\Http\Requests;

use App\Models\Activity;
use App\Models\Location;
use App\RecordStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('create', Activity::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'location_id' => ['nullable', 'integer', Rule::exists((new Location)->getTable(), 'id')],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique((new Activity)->getTable(), 'slug')],
            'category' => ['nullable', 'string', 'max:100'],
            'learning_themes' => ['nullable', 'array'],
            'learning_themes.*' => ['string', 'max:50'],
            'school_levels' => ['nullable', 'array'],
            'school_levels.*' => ['in:primary,secondary,mixed'],
            'min_age' => ['nullable', 'integer', 'min:1', 'max:100'],
            'max_age' => ['nullable', 'integer', 'gte:min_age', 'max:100'],
            'duration_minutes' => ['required', 'integer', 'min:15', 'max:1440'],
            'maximum_capacity' => ['required', 'integer', 'min:1'],
            'minimum_capacity' => ['nullable', 'integer', 'min:1', 'lte:maximum_capacity'],
            'environment' => ['nullable', 'in:indoor,outdoor,mixed'],
            'suggested_time' => ['nullable', 'string', 'max:100'],
            'weather_sensitive' => ['required', 'boolean'],
            'base_cost' => ['nullable', 'numeric', 'min:0'],
            'status' => ['required', Rule::enum(RecordStatus::class)],
            'notes' => ['nullable', 'string', 'max:5000'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['slug' => Str::slug($this->string('slug')->value() ?: $this->string('name')->value())]);
    }
}
