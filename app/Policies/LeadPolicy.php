<?php

namespace App\Policies;

use App\Models\Lead;
use App\Models\User;
use App\UserRole;

class LeadPolicy extends AdminPolicy
{
    protected const VIEW_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales, UserRole::Operations];

    protected const MANAGE_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales];

    public function viewAny(User $user): bool
    {
        return $this->canView($user);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Lead $lead): bool
    {
        return $this->canView($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->canManage($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Lead $lead): bool
    {
        return $this->canManage($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Lead $lead): bool
    {
        return $this->canDelete($user);
    }
}
