<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('feedbacks') && !Schema::hasTable('feedback')) {
            Schema::rename('feedbacks', 'feedback');
            echo "Table 'feedbacks' renamed to 'feedback' successfully.\n";
        } elseif (!Schema::hasTable('feedback')) {
            Schema::create('feedback', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email');
                $table->text('message');
                $table->timestamps();
            });
            echo "Table 'feedback' created successfully.\n";
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('feedback')) {
            Schema::rename('feedback', 'feedbacks');
        }
    }
};
