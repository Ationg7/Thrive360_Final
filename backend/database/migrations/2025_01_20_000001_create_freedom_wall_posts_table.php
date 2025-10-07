<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('freedom_wall_posts', function (Blueprint $table) {
    $table->id();
    $table->string('content');
    $table->string('author')->nullable();
     $table->string('email')->nullable();
    $table->string('image_path')->nullable();
    $table->boolean('is_guest_post')->default(true);
    $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freedom_wall_posts');
    }
};
