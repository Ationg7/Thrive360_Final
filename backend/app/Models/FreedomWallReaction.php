<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreedomWallReaction extends Model
{
    use HasFactory;

    protected $table = 'freedomwall_reaction'; // explicitly set table name

    protected $fillable = [
        'freedomwall_id',
        'user_id',
        'reaction_id',
    ];

    // Relationships
    public function post()
    {
        return $this->belongsTo(FreedomWall::class, 'freedomwall_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reaction()
    {
        return $this->belongsTo(Reaction::class);
    }
}
