<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class OperationsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/operations/index', $this->mockOperationsData());
    }

    public function report(): Response
    {
        return Inertia::render('admin/reports/index', $this->mockOperationsData());
    }

    public function emailPreview(): Response
    {
        return Inertia::render('admin/email-preview/index', $this->mockOperationsData());
    }

    /**
     * @return array<string, mixed>
     */
    private function mockOperationsData(): array
    {
        $checklist = [
            ['stage' => 'Pre-tour', 'category' => 'Bus', 'item' => 'Insurance & road tax', 'owner' => 'Operations', 'status' => 'Approved', 'evidence' => 'bus-insurance.pdf'],
            ['stage' => 'Pre-tour', 'category' => 'Bus', 'item' => 'Condition & service evidence', 'owner' => 'Operations', 'status' => 'Approved', 'evidence' => 'bus-condition.jpg'],
            ['stage' => 'Pre-tour', 'category' => 'Driver', 'item' => 'Licence & insurance', 'owner' => 'Operations', 'status' => 'Awaiting review', 'evidence' => 'driver-licence.pdf'],
            ['stage' => 'Pre-tour', 'category' => 'Tour guide', 'item' => 'Qualifications & introduction', 'owner' => 'Aiman Rahman', 'status' => 'Approved', 'evidence' => 'guide-intro.mp4'],
            ['stage' => 'Pre-tour', 'category' => 'Food', 'item' => 'Vendor, menu & certificates', 'owner' => 'Operations', 'status' => 'Pending', 'evidence' => null],
            ['stage' => 'Pre-tour', 'category' => 'Hotel', 'item' => 'Room allocation & confirmation', 'owner' => 'Operations', 'status' => 'Pending', 'evidence' => null],
            ['stage' => 'During tour', 'category' => 'Bus', 'item' => 'Arrival photo proof', 'owner' => 'Aiman Rahman', 'status' => 'Submitted', 'evidence' => 'bus-arrival.jpg'],
            ['stage' => 'During tour', 'category' => 'Driver', 'item' => 'Speed & behaviour', 'owner' => 'Aiman Rahman', 'status' => 'Pending', 'evidence' => null],
            ['stage' => 'During tour', 'category' => 'Food', 'item' => 'Freshness & cleanliness', 'owner' => 'Aiman Rahman', 'status' => 'Pending', 'evidence' => null],
            ['stage' => 'After tour', 'category' => 'Service', 'item' => 'Teacher operations review', 'owner' => 'Cikgu Aminah', 'status' => 'Pending', 'evidence' => null],
        ];

        return [
            'trip' => [
                'reference' => 'LLT-2026-0184',
                'title' => 'Ipoh Karst & Heritage Expedition',
                'school' => 'SMK Raja Perempuan',
                'date' => '17 August 2026',
                'students' => 80,
                'teachers' => 6,
                'status' => 'In progress',
                'guide' => 'Aiman Rahman',
                'lead_teacher' => 'Cikgu Aminah',
                'latest_gps' => '4.59748, 101.09011',
                'gps_updated' => '18 seconds ago',
                'completed_checkpoints' => 1,
                'total_checkpoints' => 4,
            ],
            'commercial' => [
                'quotation_total' => 19600,
                'deposit_amount' => 5880,
                'quotation_status' => 'Accepted',
                'agreement_status' => 'Signed',
                'payment_status' => 'Deposit paid',
                'payment_reference' => 'DEMO-26081701',
            ],
            'email' => [
                'recipient_name' => 'Cikgu Aminah',
                'recipient_email' => 'aminah@smkrajaperempuan.edu.my',
                'subject' => 'Your proposed Ipoh expedition · LLT-2026-0184',
                'meeting_date' => '20 August 2026',
                'meeting_time' => '10:00 AM',
                'proposal_expires' => '27 August 2026',
            ],
            'checklist' => $checklist,
            'metrics' => [
                'readiness' => 60,
                'approved' => 3,
                'awaiting_review' => 2,
                'pending' => 5,
                'exceptions' => 2,
            ],
            'itinerary' => [
                ['time' => '7:30 AM', 'name' => 'School departure', 'status' => 'Completed', 'teacher_status' => 'Acknowledged'],
                ['time' => '9:00 AM', 'name' => 'Gua Tempurung field study', 'status' => 'Next', 'teacher_status' => 'Waiting'],
                ['time' => '2:00 PM', 'name' => 'Ipoh Old Town heritage trail', 'status' => 'Pending', 'teacher_status' => 'Waiting'],
                ['time' => '5:30 PM', 'name' => 'Return to school', 'status' => 'Pending', 'teacher_status' => 'Waiting'],
            ],
        ];
    }
}
