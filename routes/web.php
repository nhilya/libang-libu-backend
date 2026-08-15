<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProgrammeController;
use App\Http\Controllers\Admin\RecommendationController;
use App\Http\Controllers\Admin\SchoolController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::redirect('/', '/admin/dashboard');
        Route::get('dashboard', DashboardController::class)->name('dashboard');
        Route::resource('leads', LeadController::class);
        Route::get('leads/{lead}/recommendation', [RecommendationController::class, 'edit'])->name('leads.recommendation.edit');
        Route::put('leads/{lead}/recommendation', [RecommendationController::class, 'store'])->name('leads.recommendation.store');
        Route::resource('schools', SchoolController::class);
        Route::resource('contacts', ContactController::class)->except(['show']);
        Route::resource('products', ProductController::class);
        Route::resource('programmes', ProgrammeController::class);
        Route::resource('activities', ActivityController::class);
    });
});

require __DIR__.'/settings.php';
