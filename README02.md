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
