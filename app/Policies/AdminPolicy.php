<?php

namespace App\Policies;

use App\Models\User;
use App\UserRole;

abstract class AdminPolicy
{
    /** @var list<UserRole> */
    protected const VIEW_ROLES = [];

    /** @var list<UserRole> */
    protected const MANAGE_ROLES = [];

    protected function canView(User $user): bool
    {
        return in_array($user->role, static::VIEW_ROLES, true);
    }

    protected function canManage(User $user): bool
    {
        return in_array($user->role, static::MANAGE_ROLES, true);
    }

    protected function canDelete(User $user): bool
    {
        return $user->role === UserRole::SuperAdmin;
    }
}
