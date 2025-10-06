<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('freedomwall_reaction', function (Blueprint $table) {
            $table->id();
            $table->foreignId('freedomwall_id')->constrained()->onDelete('cascade'); // post
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // user who reacted
            $table->foreignId('reaction_id')->constrained()->onDelete('cascade'); // type of reaction
            $table->timestamps();

            $table->unique(['freedomwall_id', 'user_id']); // ensures a user reacts only once per post
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('freedomwall_reaction');
    }
};
