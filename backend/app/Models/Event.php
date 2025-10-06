<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'location',
        'start_date',
        'end_date',
        'image_path',
        'category',
        'max_participants',
        'is_active',
        'created_by'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
        'max_participants' => 'integer'
    ];

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_participants')
                    ->withTimestamps();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now());
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Helper methods
    public function isUpcoming()
    {
        return $this->start_date > now();
    }

    public function isPast()
    {
        return $this->end_date ? $this->end_date < now() : $this->start_date < now();
    }

    public function getAvailableSpots()
    {
        if (!$this->max_participants) {
            return null; // Unlimited
        }
        return max(0, $this->max_participants - $this->participants()->count());
    }

    // Category constants
    const CATEGORY_GENERAL = 'general';
    const CATEGORY_WELLNESS = 'wellness';
    const CATEGORY_MEDITATION = 'meditation';
    const CATEGORY_FITNESS = 'fitness';
    const CATEGORY_EDUCATION = 'education';

    public static function getCategories()
    {
        return [
            self::CATEGORY_GENERAL => 'General',
            self::CATEGORY_WELLNESS => 'Wellness',
            self::CATEGORY_MEDITATION => 'Meditation',
            self::CATEGORY_FITNESS => 'Fitness',
            self::CATEGORY_EDUCATION => 'Education'
        ];
    }
}
