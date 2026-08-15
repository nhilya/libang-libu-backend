<?php

namespace App;

enum LeadStatus: string
{
    case New = 'new';
    case Contacted = 'contacted';
    case Qualified = 'qualified';
    case RecommendationReady = 'recommendation_ready';
    case ProposalSent = 'proposal_sent';
    case Negotiation = 'negotiation';
    case AwaitingConfirmation = 'awaiting_confirmation';
    case Confirmed = 'confirmed';
    case Lost = 'lost';
    case Cancelled = 'cancelled';
    case Archived = 'archived';
}
