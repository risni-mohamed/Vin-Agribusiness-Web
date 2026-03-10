<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fertilizer extends Model
{
    protected $fillable = [
        'name',
        'description',
        'category',
        'price',
        'quantity',
        'unit',
        'image1',
        'image2',
        'image3',
    ];
}
