<?php

namespace App\Http\Requests;

use App\Models\Lead;

class UpdateLeadRequest extends StoreLeadRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $lead = $this->route('lead');

        return $lead instanceof Lead && ($this->user()?->can('update', $lead) ?? false);
    }
}
