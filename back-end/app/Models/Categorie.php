<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = [
        'title',
        'period'
    ];

    public function rules()
    {
        return [
            'title' => 'required',
            'period' => 'in:Semanal,Mensal,Anual,Diário',
        ];
    }
}
