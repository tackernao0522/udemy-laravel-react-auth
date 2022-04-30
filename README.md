# Seciton2: Laravel

## 03 Migrations

https://github.com/antoniopapa/laravel-auth <br>

- `database/migrations/create_failed_jobs_table.php`を削除<br>

* `database/migrations/create_personal_access_tokens_table.php`を削除<br>

- `database/migrations/create_users_table.php`を編集<br>

```php:create_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('first_name');
      $table->string('last_name');
      $table->string('email')->unique();
      $table->string('password');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users');
  }
}
```

- `$ php artisan migrate`を実行<br>

* `app/Models/User.php`を編集<br>

```php:User.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
  use HasFactory, Notifiable;

  protected $guarded = [];

  protected $hidden = ['password'];
}
```

## 04 Routes

- `$ composer remove laravel/sanctum`を実行して sanctum を削除しておく<br>

* `$ php artisan migrate:fresh`を実行<br>

- `routes/api.php`を編集<br>

```php:api.php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('hello', function () {
  return 'Hello, world';
});
```

- `POSTMAN: localhost/api/hello`にアクセスしてみる<br>

```
Hello, world
```

- `$ php artisan make:controller AuthController`を実行<br>

* `app/Http/Controllers/AuthController.php`を編集<br>

```php:AuthController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function hello()
  {
    return 'Hello from controller';
  }
}
```

- `routes/api.php`を編集<br>

```php:api.php
<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('hello', [AuthController::class, 'hello']);
```

- `POSTMAN: localhost/api/hello`にアクセスしてみる<br>

```
Hello from controller
```

## 05 Register

- `app/Http/Controllers/AuthController.php`を編集<br>

```php:AuthController.php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $user = User::create([
      'first_name' => $request->input('first_name'),
      'last_name' => $request->input('last_name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    return response($user, Response::HTTP_CREATED);
  }
}
```

- `routes/api.php`を編集<br>

```php:api.php
<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
```

- `POSTMAN(POST): localhost/api/register`を設定<br>

* `Body`タブの`form-data`を選択<br>

- `上記の`form-data`に`first_name`と`last_name`と`email`と`password`を設定して`Send`する<br>

```
{
    "first_name": "takaki",
    "last_name": "nakamura",
    "email": "takaki55730317@gmail.com",
    "updated_at": "2022-04-30T10:14:15.000000Z",
    "created_at": "2022-04-30T10:14:15.000000Z",
    "id": 1
}
```
