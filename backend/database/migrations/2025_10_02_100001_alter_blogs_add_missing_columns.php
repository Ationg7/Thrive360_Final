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
        if (Schema::hasTable('blogs')) {
            Schema::table('blogs', function (Blueprint $table) {
                if (!Schema::hasColumn('blogs', 'category')) {
                    $table->string('category')->default('general')->after('content');
                }
                if (!Schema::hasColumn('blogs', 'excerpt')) {
                    $table->text('excerpt')->nullable()->after('category');
                }
                if (!Schema::hasColumn('blogs', 'tags')) {
                    $table->json('tags')->nullable()->after('excerpt');
                }
                if (!Schema::hasColumn('blogs', 'author_name')) {
                    $table->string('author_name')->nullable()->after('tags');
                }
                if (!Schema::hasColumn('blogs', 'author_email')) {
                    $table->string('author_email')->nullable()->after('author_name');
                }
                if (!Schema::hasColumn('blogs', 'image_url')) {
                    $table->string('image_url')->nullable()->after('author_email');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('blogs')) {
            Schema::table('blogs', function (Blueprint $table) {
                if (Schema::hasColumn('blogs', 'image_url')) {
                    $table->dropColumn('image_url');
                }
                if (Schema::hasColumn('blogs', 'author_email')) {
                    $table->dropColumn('author_email');
                }
                if (Schema::hasColumn('blogs', 'author_name')) {
                    $table->dropColumn('author_name');
                }
                if (Schema::hasColumn('blogs', 'tags')) {
                    $table->dropColumn('tags');
                }
                if (Schema::hasColumn('blogs', 'excerpt')) {
                    $table->dropColumn('excerpt');
                }
                if (Schema::hasColumn('blogs', 'category')) {
                    $table->dropColumn('category');
                }
            });
        }
    }
};


