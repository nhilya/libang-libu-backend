export type OperationsChecklistItem = {
    stage: string;
    category: string;
    item: string;
    owner: string;
    status: string;
    evidence: string | null;
};

export type OperationsMockProps = {
    trip: {
        reference: string;
        title: string;
        school: string;
        date: string;
        students: number;
        teachers: number;
        status: string;
        guide: string;
        lead_teacher: string;
        latest_gps: string;
        gps_updated: string;
        completed_checkpoints: number;
        total_checkpoints: number;
    };
    commercial: {
        quotation_total: number;
        deposit_amount: number;
        quotation_status: string;
        agreement_status: string;
        payment_status: string;
        payment_reference: string;
    };
    email: {
        recipient_name: string;
        recipient_email: string;
        subject: string;
        meeting_date: string;
        meeting_time: string;
        proposal_expires: string;
    };
    checklist: OperationsChecklistItem[];
    metrics: {
        readiness: number;
        approved: number;
        awaiting_review: number;
        pending: number;
        exceptions: number;
    };
    itinerary: Array<{
        time: string;
        name: string;
        status: string;
        teacher_status: string;
    }>;
};
