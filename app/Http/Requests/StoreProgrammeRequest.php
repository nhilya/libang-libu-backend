<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\Programme;
use App\RecordStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreProgrammeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('create', Programme::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => ['required', 'integer', Rule::exists((new Product)->getTable(), 'id')],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique((new Programme)->getTable(), 'slug')],
            'description' => ['nullable', 'string', 'max:5000'],
            'duration_days' => ['required', 'integer', 'min:1', 'max:30'],
            'duration_nights' => ['required', 'integer', 'min:0', 'lt:duration_days'],
            'school_levels' => ['nullable', 'array'],
            'school_levels.*' => ['in:primary,secondary,mixed'],
            'min_group_size' => ['nullable', 'integer', 'min:1'],
            'max_group_size' => ['nullable', 'integer', 'gte:min_group_size'],
            'themes' => ['nullable', 'array'],
            'themes.*' => ['string', 'max:50'],
            'indicative_price_min' => ['nullable', 'numeric', 'min:0'],
            'indicative_price_max' => ['nullable', 'numeric', 'gte:indicative_price_min'],
            'status' => ['required', Rule::enum(RecordStatus::class)],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['slug' => Str::slug($this->string('slug')->value() ?: $this->string('name')->value())]);
    }
}
