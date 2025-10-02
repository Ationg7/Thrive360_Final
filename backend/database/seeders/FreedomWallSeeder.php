<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FreedomWallPost;

class FreedomWallSeeder extends Seeder
{
    public function run()
    {
        $samplePosts = [
            [
                'content' => "I was doing fine, but you just came and ruined my peace of mind. PLS.. let me go back to the time when I completely didn't have any idea you exist. It is hard to sleep when there's so much on your mind.",
                'author' => 'Anonymous',
                'likes' => 34,
                'shares' => 50,
                'is_guest_post' => true,
            ],
            [
                'content' => '"How is your life?" Ito unti-unting nilulunod ng kalungkutan na paulit-ulit lang...',
                'author' => 'Anonymous',
                'likes' => 120,
                'shares' => 113,
                'is_guest_post' => true,
            ],
            [
                'content' => 'Today I learned that it\'s okay to not be okay. Sometimes we need to take a step back and breathe. You\'re not alone in this journey.',
                'author' => 'Anonymous',
                'likes' => 67,
                'shares' => 23,
                'is_guest_post' => false,
            ],
            [
                'content' => 'Small wins matter. I finally got out of bed today and that\'s enough. Celebrate your small victories!',
                'author' => 'Anonymous',
                'likes' => 89,
                'shares' => 45,
                'is_guest_post' => false,
            ],
            [
                'content' => 'To anyone reading this: You are worthy of love, happiness, and all good things. Don\'t let anyone tell you otherwise.',
                'author' => 'Anonymous',
                'likes' => 156,
                'shares' => 78,
                'is_guest_post' => true,
            ],
        ];

        foreach ($samplePosts as $post) {
            FreedomWallPost::create($post);
        }
    }
}
