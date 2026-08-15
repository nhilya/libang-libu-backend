<?php

namespace App\Policies;

use App\Models\Contact;
use App\Models\User;
use App\UserRole;

class ContactPolicy extends AdminPolicy
{
    protected const VIEW_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales, UserRole::Operations, UserRole::Finance];

    protected const MANAGE_ROLES = [UserRole::SuperAdmin, UserRole::Management, UserRole::Sales];

    public function viewAny(User $user): bool
    {
        return $this->canView($user);
    }

    public function view(User $user, Contact $contact): bool
    {
        return $this->canView($user);
    }

    public function create(User $user): bool
    {
        return $this->canManage($user);
    }

    public function update(User $user, Contact $contact): bool
    {
        return $this->canManage($user);
    }

    public function delete(User $user, Contact $contact): bool
    {
        return $this->canDelete($user);
    }
}
