<?php

namespace App\Policies;

use App\Models\Recommendation;
use App\Models\User;
use App\UserRole;

class RecommendationPolicy extends AdminPolicy
{
    protected const VIEW_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales, UserRole::Operations];

    protected const MANAGE_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales];

    public function viewAny(User $user): bool
    {
        return $this->canView($user);
    }

    public function view(User $user, Recommendation $recommendation): bool
    {
        return $this->canView($user);
    }

    public function create(User $user): bool
    {
        return $this->canManage($user);
    }

    public function update(User $user, Recommendation $recommendation): bool
    {
        return $this->canManage($user);
    }

    public function delete(User $user, Recommendation $recommendation): bool
    {
        return $this->canDelete($user);
    }
}
