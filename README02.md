## 10 HttpOnly Cookies

- `app/Http/Controllers/AuthController.php`を編集<br>

```php:AuthController.php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
  public function register(RegisterRequest $request)
  {
    $user = User::create([
      'first_name' => $request->input('first_name'),
      'last_name' => $request->input('last_name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    return response($user, Response::HTTP_CREATED);
  }

  public function login(Request $request)
  {
    if (!Auth::attempt($request->only('email', 'password'))) {
      return \response(
        [
          'error' => 'Invalid Credentials!',
        ],
        Response::HTTP_UNAUTHORIZED
      );
    }

    $user = Auth::user();

    // 追記
    $cookie = cookie('jwt', $token, 60 * 24);

    // 編集
    return \response([
      'jwt' => $token,
    ])->withCookie($cookie);
  }

  public function user(Request $request)
  {
    return $request->user();
  }
}
```

- `POSTMAN`でログインしてみる<br>

* `app/Http/Middleware/Authenticate.php`を編集<br>

```php:Authenticate.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
  /**
   * Get the path the user should be redirected to when they are not authenticated.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return string|null
   */
  protected function redirectTo($request)
  {
    if (!$request->expectsJson()) {
      return route('login');
    }
  }

  // 追加
  public function handle($request, Closure $next, ...$guards)
  {
    if ($jwt = $request->cookie('jwt')) {
      $request->headers->set('Authorization', 'Bearer ' . $jwt);
    }

    $this->authenticate($request, $guards);

    return $next($request);
  }
}
```

- `config/cors.php`を編集<br>

```php:cors.php
<?php

return [
  /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

  'paths' => ['api/*', 'sanctum/csrf-cookie'],

  'allowed_methods' => ['*'],

  'allowed_origins' => ['*'],

  'allowed_origins_patterns' => [],

  'allowed_headers' => ['*'],

  'exposed_headers' => [],

  'max_age' => 0,

  'supports_credentials' => true, // trueにする
];
```

- `POSTMAN(GET) localhost/api/user`で`Headers`の`Authorization`を削除しても通るようになる<br>

## 11 Logout

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
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('user', [AuthController::class, 'user']);
  Route::post('logout', [AuthController::class, 'logout']);
});
```

- `app/Http/Controllers/AuthController.php`を編集<br>

```php:AuthController.php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
  public function register(RegisterRequest $request)
  {
    $user = User::create([
      'first_name' => $request->input('first_name'),
      'last_name' => $request->input('last_name'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
    ]);

    return response($user, Response::HTTP_CREATED);
  }

  public function login(Request $request)
  {
    if (!Auth::attempt($request->only('email', 'password'))) {
      return \response(
        [
          'error' => 'Invalid Credentials!',
        ],
        Response::HTTP_UNAUTHORIZED
      );
    }

    $user = Auth::user();

    $token = $user->createToken('token')->plainTextToken;

    $cookie = cookie('jwt', $token, 60 * 24);

    return \response([
      'jwt' => $token,
    ])->withCookie($cookie);
  }

  public function user(Request $request)
  {
    return $request->user();
  }

  // 追加
  public function logout()
  {
    $cookie = Cookie::forget('jwt');

    return \response([
      'message' => 'success',
    ])->withCookie($cookie);
  }
}
```

- `POSTMAN(POST) localhost/api/logout` を設定して`Send`する<br>

```
{
    "message": "success"
}
```

## 12 Forgot Password

- `$ php artisan make:controller PasswordController`を実行<br>

* `routes/api.php`を編集<br>

```php:api.php
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
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
Route::post('login', [AuthController::class, 'login']);
// 追記
Route::post('forgot', [PasswordController::class, 'forgot']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('user', [AuthController::class, 'user']);
  Route::post('logout', [AuthController::class, 'logout']);
});
```

- `app/Http/Controllers/PasswordController.php`を編集<br>

```php:PasswordController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordController extends Controller
{
  public function forgot(Request $request)
  {
    $email = $request->input('email');
    $token = Str::random(12);

    DB::table('password_resets')->insert([
      'email' => $email,
      'token' => $token,
    ]);

    Mail::send('reset', ['token' => $token], function (Message $message) use (
      $email
    ) {
      $message->subject('Reset your password!');
      $message->to($email);
    });

    return response([
      'message' => 'Check your email!',
    ]);
  }
}
```

- `$ touch resources/views/reset.blade.php`を実行<br>

* `resources/views/reset.blade.php`を編集<br>

```html:reset.blade.php
Click
<a href="http://localhost/reset/{{ $token }}">here</a>
to reset your password!
```

- `POSTMAN(POST) localhost/api/forgot`を設定<br>

* `Body`タブを選択し、`form-data`を選択して`KEY`に`email`を入力、`VALUE`に`takaki55730317@gmail.com`を入力して`Send`する<br>

- `メールが届いているか確認する`<br>

```
{
    "message": "Check your email!"
}
```

## 13 Reset Password

- `routes/api.php`を編集<br>

```php:api.php
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
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
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot', [PasswordController::class, 'forgot']);
Route::post('reset', [PasswordController::class, 'reset']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('user', [AuthController::class, 'user']);
  Route::post('logout', [AuthController::class, 'logout']);
});
```

- `$ php artisan make:request ResetRequest`を実行<br>

* `app/Http/Requests/ResetRequest.php`を編集<br>

```php:ResetRequest.php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'token' => 'required',
      'password' => 'required',
      'password_confirm' => 'required|same:password',
    ];
  }
}
```

- `app/Http/Controllers/PasswordController.php`を編集<br>

```php:PasswordController.php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PasswordController extends Controller
{
  public function forgot(Request $request)
  {
    $email = $request->input('email');
    $token = Str::random(12);

    DB::table('password_resets')->insert([
      'email' => $email,
      'token' => $token,
    ]);

    Mail::send('reset', ['token' => $token], function (Message $message) use (
      $email
    ) {
      $message->subject('Reset your password!');
      $message->to($email);
    });

    return response([
      'message' => 'Check your email!',
    ]);
  }

  // 追加
  public function reset(ResetRequest $request)
  {
    $passwordReset = DB::table('password_resets')
      ->where('token', $request->input('token'))
      ->first();

    if (!($user = User::where('email', $passwordReset->email)->first())) {
      throw new NotFoundHttpException('User not found!');
    }

    $user->password = Hash::make($request->input('password'));
    $user->save();

    return response([
      'message' => 'success',
    ]);
  }
}
```

- `POSTMAN(POST) localhost/api/reset`を設定<br>

* `Headers`タブを選択して、`KEY`に`X-Requested-With`を追加入力、`VALUE`に`XMLHttpRequest`を追加入力する<br>

- `Body`タブを選択して、`form-data`を選択する`<br>

- `KEY`に `token`と入力、`VALUE`に`ryUCg4XWjzH`と入力<br>

* `KEY`に`password`と追加入力、`VALUE`に`5t5a7k3a`を入力<br>

- `KEY`に`password_confirm`を追加入力、`VALUE`に`5t5a7k3a`を入力して`Send`する<br>

```
{
    "message": "success"
}
```
