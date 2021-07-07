<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpendingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('spendings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('category_fk');
            $table->foreign('category_fk')->references('id')->on('categories')->onUpdate('cascade')->onDelete('restrict');
            $table->mediumText('description');
            $table->float('total_spent', 6, 2);
            $table->date('closing_date');
            $table->timestamps();
            $table->engine = 'InnoDb';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('spendings');
    }
}
