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
        Schema::table('freedom_wall_posts', function (Blueprint $table) {
            $table->integer('likes')->default(0);
            $table->integer('hearts')->default(0);
            $table->integer('sad')->default(0);
            $table->integer('saves')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('freedom_wall_posts', function (Blueprint $table) {
            $table->dropColumn(['likes', 'hearts', 'sad', 'saves']);
        });
    }
};
