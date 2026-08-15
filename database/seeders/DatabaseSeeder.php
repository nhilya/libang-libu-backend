<?php

namespace Database\Seeders;

use App\LeadStatus;
use App\Models\Activity;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Lead;
use App\Models\LearningOutcome;
use App\Models\Location;
use App\Models\Product;
use App\Models\Programme;
use App\Models\Recommendation;
use App\Models\School;
use App\Models\User;
use App\RecommendationStatus;
use App\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Libang Libu Admin',
            'email' => 'admin@libanglibu.travel',
            'role' => UserRole::SuperAdmin,
        ]);

        $company = Company::create(['name' => 'Libang Libu Travel', 'slug' => 'libang-libu-travel', 'status' => 'active']);
        $product = Product::create([
            'company_id' => $company->id,
            'name' => 'Ipoh School Outing',
            'slug' => 'ipoh-school-outing',
            'description' => 'Educational travel programmes designed for school groups visiting Ipoh.',
            'status' => 'active',
            'product_type' => 'educational_tour',
            'customer_segment' => 'schools',
        ]);

        $programme = Programme::create([
            'product_id' => $product->id,
            'name' => 'Ipoh Discovery Expedition',
            'slug' => 'ipoh-discovery-expedition',
            'description' => 'A hands-on exploration of Ipoh history, geography and culture.',
            'duration_days' => 2,
            'duration_nights' => 1,
            'school_levels' => ['secondary'],
            'min_group_size' => 30,
            'max_group_size' => 120,
            'themes' => ['science', 'history', 'geography'],
            'indicative_price_min' => 200,
            'indicative_price_max' => 300,
            'status' => 'active',
        ]);

        $location = Location::create([
            'name' => 'Kek Lok Tong',
            'type' => 'limestone_cave',
            'address' => 'Gunung Rapat, Ipoh, Perak',
            'capacity' => 120,
            'bus_notes' => 'Confirm coach drop-off and parking before trip day.',
            'status' => 'active',
        ]);
        $activity = Activity::create([
            'location_id' => $location->id,
            'name' => 'Kek Lok Tong Limestone Investigation',
            'slug' => 'kek-lok-tong-limestone-investigation',
            'category' => 'science',
            'learning_themes' => ['geography', 'hands_on'],
            'school_levels' => ['primary', 'secondary'],
            'duration_minutes' => 90,
            'maximum_capacity' => 120,
            'environment' => 'outdoor',
            'weather_sensitive' => true,
            'base_cost' => 800,
            'status' => 'active',
        ]);
        $outcome = LearningOutcome::create([
            'code' => 'LO-001',
            'description' => 'Explain limestone formation, weathering and karst landscapes.',
            'subject' => 'Geography',
            'level' => 'secondary',
            'status' => 'active',
        ]);
        $activity->learningOutcomes()->attach($outcome);
        $programme->activities()->attach($activity, ['sort_order' => 1, 'is_required' => true]);

        $school = School::create([
            'name' => 'SMK ABC',
            'type' => 'government',
            'level' => 'secondary',
            'location' => 'Kuala Lumpur',
        ]);
        $contact = Contact::create([
            'school_id' => $school->id,
            'name' => 'Teacher Ahmad',
            'role' => 'Trip Coordinator',
            'phone' => '+60 12-345 6789',
            'email' => 'ahmad@example.test',
            'is_primary' => true,
        ]);
        $lead = Lead::create([
            'reference' => 'LLT-'.now()->year.'-00001',
            'school_id' => $school->id,
            'contact_id' => $contact->id,
            'assigned_to' => $admin->id,
            'source' => 'website',
            'status' => LeadStatus::Qualified,
            'school_level' => 'secondary',
            'student_count' => 90,
            'duration_days' => 2,
            'duration_nights' => 1,
            'learning_interests' => ['science', 'history', 'geography'],
            'experience_preferences' => ['hands_on', 'outdoor'],
            'budget_min' => 200,
            'budget_max' => 250,
            'learning_objective' => 'A fun and hands-on programme connected to Geography.',
            'next_follow_up_at' => now()->addDay(),
        ]);
        $recommendation = Recommendation::create([
            'lead_id' => $lead->id,
            'programme_id' => $programme->id,
            'explanation' => 'The programme matches the requested Geography focus, group size and hands-on outdoor preference.',
            'warnings' => [],
            'status' => RecommendationStatus::Valid,
            'reviewed_by' => $admin->id,
            'reviewed_at' => now(),
        ]);
        $recommendation->activities()->attach($activity, ['sort_order' => 1]);
    }
}
