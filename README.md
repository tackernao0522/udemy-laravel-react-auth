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
