<?php

namespace App\Http\Requests;

use App\Models\Programme;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

class UpdateProgrammeRequest extends StoreProgrammeRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $programme = $this->route('programme');

        return $programme instanceof Programme && ($this->user()?->can('update', $programme) ?? false);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'slug' => ['required', 'string', 'max:255', Rule::unique((new Programme)->getTable(), 'slug')->ignore($this->route('programme'))],
        ];
    }
}
