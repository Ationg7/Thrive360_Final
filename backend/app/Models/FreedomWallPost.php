<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreedomWallPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'author',
        'image_path',
        'likes',
        'shares',
        'is_guest_post',
        'user_id'
    ];

    protected $casts = [
        'is_guest_post' => 'boolean',
        'likes' => 'integer',
        'shares' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function incrementLikes()
    {
        $this->increment('likes');
    }

    public function decrementLikes()
    {
        $this->decrement('likes');
    }

    public function incrementShares()
    {
        $this->increment('shares');
    }

    public function decrementShares()
    {
        $this->decrement('shares');
    }
}
