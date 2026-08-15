<?php

namespace App;

enum RecommendationStatus: string
{
    case Draft = 'draft';
    case Valid = 'valid';
    case Warning = 'warning';
    case Invalid = 'invalid';
}
