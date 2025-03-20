<?php

namespace App\Enums;

enum TermStatus: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
    case DEPRECATED = 'deprecated';
    case SUGGESTED = 'suggested';
}
