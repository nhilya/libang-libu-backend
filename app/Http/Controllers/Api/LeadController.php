<?php

namespace App\Http\Controllers\Api;

use App\Actions\Leads\CreateLeadFromPlanner;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreLeadRequest;
use App\Http\Resources\LeadResource;
use Illuminate\Http\JsonResponse;

class LeadController extends Controller
{
    public function __invoke(StoreLeadRequest $request, CreateLeadFromPlanner $createLead): JsonResponse
    {
        return (new LeadResource($createLead->handle($request->validated())))
            ->response()
            ->setStatusCode(201);
    }
}
