<?php

use App\Http\Controllers\Api\LeadController;
use Illuminate\Support\Facades\Route;

Route::post('leads', LeadController::class)->middleware('throttle:30,1')->name('api.leads.store');
