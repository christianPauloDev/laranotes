<?php

//Routes from categories
Route::resource('categories','API\CategorieApiController');

Route::get('categories', 'API\CategorieApiController@index');
Route::post('categories', 'API\CategorieApiController@store');
Route::put('categories/{id}', 'API\CategorieApiController@update');

Route::get('spending', 'API\SpendingApiController@index');
Route::post('spending', 'API\SpendingApiController@store');
Route::put('spending/{id}', 'API\SpendingApiController@update');

Route::resource('spending','API\SpendingApiController');
    

?>