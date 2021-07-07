<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spending extends Model
{
    protected $fillable = [
        'category_fk',
        'description',
        'total_spent',
        'closing_date',
    ];

    public function rules()
    {
        return [
            'category_fk' => 'required',
            'description' => 'nullable',
            'total_spent' => 'required',
            'closing_date' => 'required|date',
        ];
    }
}
