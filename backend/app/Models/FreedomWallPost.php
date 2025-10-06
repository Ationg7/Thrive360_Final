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
        'user_id'
    ];

    // Disable timestamps if not using them
    public $timestamps = true; // or false if your table doesn't have them

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reactions()
    {
        return $this->hasMany(FreedomWallReaction::class, 'freedomwall_id');
    }

    public function reports()
    {
        return $this->hasMany(PostReport::class, 'post_id');
    }

    public function reaction()
{
    return $this->belongsTo(Reaction::class);
}

}
