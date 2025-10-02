<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'reason',
        'custom_reason',
        'reporter_ip',
        'status',
        'admin_notes',
        'reviewed_at',
        'reviewed_by'
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
    ];

    // Relationships
    public function post()
    {
        return $this->belongsTo(FreedomWallPost::class, 'post_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeReviewed($query)
    {
        return $query->whereIn('status', ['reviewed', 'resolved', 'dismissed']);
    }

    // Report reasons
    public static function getReportReasons()
    {
        return [
            'spam' => 'Spam or misleading',
            'harassment' => 'Harassment or bullying',
            'hate_speech' => 'Hate speech or violence',
            'nudity' => 'Nudity or sexual content',
            'self_harm' => 'Self-harm or dangerous acts',
            'other' => 'Other'
        ];
    }

    // Status options
    public static function getStatuses()
    {
        return ['pending', 'reviewed', 'resolved', 'dismissed'];
    }
}
