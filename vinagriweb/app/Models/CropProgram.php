<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CropProgram extends Model
{
    protected $fillable = [
        'name',
        'image',
        'flyer',
        'sort_order',
    ];
}
