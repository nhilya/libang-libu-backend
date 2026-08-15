<?php

namespace App\Http\Requests;

use App\Models\School;

class UpdateSchoolRequest extends StoreSchoolRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $school = $this->route('school');

        return $school instanceof School && ($this->user()?->can('update', $school) ?? false);
    }
}
