<?php

namespace App\Policies;

use App\Models\Programme;
use App\Models\User;
use App\UserRole;

class ProgrammePolicy extends AdminPolicy
{
    protected const VIEW_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales, UserRole::Operations];

    protected const MANAGE_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Operations];

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $this->canView($user);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Programme $programme): bool
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
    public function update(User $user, Programme $programme): bool
    {
        return $this->canManage($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Programme $programme): bool
    {
        return $this->canDelete($user);
    }
}
