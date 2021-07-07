<?php

//Routes from categories
Route::resource('categories','API\CategorieApiController');

Route::get('categories', 'API\CategorieApiController@index');
Route::get('categories/{id}', 'API\CategorieApiController@show');
Route::post('categories', 'API\CategorieApiController@store');
Route::put('categories/{id}', 'API\CategorieApiController@update');
Route::delete('categories/{id}', 'API\CategorieApiController@destroy');


//Routes from spending
Route::get('spending/allFilters/{category_fk}/{period}', 'API\SpendingApiController@allFilters');
Route::get('spending/byCategory/{category_fk}', 'API\SpendingApiController@byCategory');
Route::get('spending/byPeriod/{period}', 'API\SpendingApiController@byPeriod');

Route::get('spending', 'API\SpendingApiController@index');
Route::get('spending/{id}', 'API\SpendingApiController@show');
Route::post('spending', 'API\SpendingApiController@store');
Route::put('spending/{id}', 'API\SpendingApiController@update');
Route::delete('spending/{id}', 'API\SpendingApiController@destroy');

Route::resource('spending','API\SpendingApiController');
    

?>