<?php

namespace App;

enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Management = 'management';
    case Sales = 'sales';
    case Operations = 'operations';
    case Finance = 'finance';
    case GuideCoordinator = 'guide_coordinator';
}
