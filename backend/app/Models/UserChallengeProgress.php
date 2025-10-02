<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserChallengeProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'challenge_id',
        'progress_percentage',
        'status',
        'started_at',
        'completed_at'
    ];

    protected $casts = [
        'progress_percentage' => 'integer',
        'started_at' => 'date',
        'completed_at' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }

    public function updateProgress($percentage)
    {
        $this->progress_percentage = $percentage;
        
        if ($percentage >= 100) {
            $this->status = 'Completed';
            $this->completed_at = now();
        } elseif ($percentage > 0) {
            $this->status = 'Progress';
        } else {
            $this->status = 'Not Started';
        }
        
        $this->save();
    }

    public function startChallenge()
    {
        $this->status = 'Progress';
        $this->started_at = now();
        $this->save();
    }
}
