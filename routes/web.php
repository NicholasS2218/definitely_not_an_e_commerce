<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// always will use app 
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');


// Folder structure:
// resources/
//   js/
//     pages/
//       Home.vue
//       Products.vue
//       About.vue
//     App.vue
//     app.js
//     router.js
//   views/
//     app.blade.php