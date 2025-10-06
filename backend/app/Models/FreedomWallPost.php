<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreedomWallPost extends Model
{
    use HasFactory;

    protected $table = 'freedom_wall_posts'; // set table name if needed

    protected $fillable = [
        'content',
        'author',
        'image_path',
        'is_guest_post',
        'user_id',
        'likes',
        'hearts',
        'sad',
        'saves'
    ];

    // Disable timestamps if not using them
    public $timestamps = true; // or false if your table doesn't have them

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reports()
    {
        return $this->hasMany(PostReport::class, 'post_id');
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_posts', 'post_id', 'user_id')
                    ->withTimestamps();
    }

    public function isSavedByUser($userId)
    {
        return $this->savedByUsers()->where('user_id', $userId)->exists();
    }

    public function reactions()
    {
        return $this->hasMany(UserPostReaction::class, 'post_id');
    }

    public function getUserReaction($userId)
    {
        $reaction = $this->reactions()->where('user_id', $userId)->first();
        return $reaction ? $reaction->reaction_type : null;
    }

    public function getReactionCounts()
    {
        $reactions = $this->reactions()->selectRaw('reaction_type, COUNT(*) as count')
            ->groupBy('reaction_type')
            ->pluck('count', 'reaction_type')
            ->toArray();

        return [
            'like' => $reactions['like'] ?? 0,
            'heart' => $reactions['heart'] ?? 0,
            'sad' => $reactions['sad'] ?? 0,
        ];
    }

}
