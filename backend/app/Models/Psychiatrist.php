<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Psychiatrist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'specialization',
        'phone',
        'email',
        'address',
        'description',
        'image_url',
        'availability',
        'consultation_fee',
        'is_active'
    ];

    protected $casts = [
        'availability' => 'array',
        'consultation_fee' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Accessors
    public function getFormattedFeeAttribute()
    {
        return $this->consultation_fee ? '₱' . number_format($this->consultation_fee, 2) : 'Contact for pricing';
    }

    // Default availability structure
    public static function getDefaultAvailability()
    {
        return [
            'monday' => ['start' => '09:00', 'end' => '17:00', 'available' => true],
            'tuesday' => ['start' => '09:00', 'end' => '17:00', 'available' => true],
            'wednesday' => ['start' => '09:00', 'end' => '17:00', 'available' => true],
            'thursday' => ['start' => '09:00', 'end' => '17:00', 'available' => true],
            'friday' => ['start' => '09:00', 'end' => '17:00', 'available' => true],
            'saturday' => ['start' => '09:00', 'end' => '12:00', 'available' => false],
            'sunday' => ['start' => '09:00', 'end' => '12:00', 'available' => false],
        ];
    }
}
