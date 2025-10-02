<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meditation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'duration',
        'category',
        'image_url'
    ];

    protected $casts = [
        'duration' => 'integer',
    ];

    // Category options
    public static function getCategories()
    {
        return ['guided', 'breathing', 'mindfulness', 'sleep'];
    }

    // Scope for filtering by category
    public function scopeByCategory($query, $category)
    {
        if ($category && $category !== 'all') {
            return $query->where('category', $category);
        }
        return $query;
    }
}
