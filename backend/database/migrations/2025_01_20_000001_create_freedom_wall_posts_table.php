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
            $table->text('content');
            $table->string('author')->default('Anonymous');
            $table->string('image_path')->nullable();
            $table->integer('likes')->default(0);
            $table->integer('shares')->default(0);
            $table->boolean('is_guest_post')->default(false);
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
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
