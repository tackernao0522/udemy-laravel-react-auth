# Section03: React

## 14 Installation

- `$ npm i -D react react-dom @types/react @types/react-dom`を実行<br>

* `$ rm -rf node_modules && rm -rf package-lock.json`を実行<br>

- `package.json`を編集<br>

```json:package.json
{
  "private": true,
  "scripts": {
    "dev": "npm run development",
    "development": "mix",
    "watch": "mix watch",
    "watch-poll": "mix watch -- --watch-options-poll=1000",
    "hot": "mix watch --hot",
    "prod": "npm run production",
    "production": "mix --production"
  },
  "devDependencies": {
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    "axios": "^0.25.0",
    "laravel-mix": "^6.0.6",
    "lodash": "^4.17.19",
    "postcss": "^8.1.14",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

- `$ npm install`を実行<br>

* `$ composer require --dev barryvdh/laravel-ide-helper`を実行<br>

- `$ php artisan ide-helper:generate`を実行<br>

* `$ npm install -g typescript`を実行<br>

- `$ tsc --init --jsx react`を実行<br>

* `$ mkdir resources/ts && touch $_/index.tsx`を実行<br>

- `$ mv resources/css resources/sass`を実行<br>

- `$ mv resources/sass/app.css resources/sass/app.scss`を実行<br>

* `$ npm run prod`を実行<br>

- `routes/web.php`を編集<br>

```php:web.php
Route::get('{all}', function () {
  return view('index');
})->where(['all' => '.*']);
```

- `$ mv resources/views/welcome.blade.php resources/views/index.blade.php`を実行<br>

- `resources/views/index.blade.php`を編集<br>

```html:index.blade.php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Laravel</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
  </head>

  <body>
    <div id="app"></div>
  </body>

  <script src="{{ mix('/js/index.js') }}"></script>
</html>
```

- `$ npm run prod`を実行<br>

* `touch resources/ts/App.tsx`を実行<br>

- `resources/ts/App.tsx`を編集<br>

```tsx:App.tsx
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return <h1>Laravel SPA</h1>
}

export default App
```

- `resources/viwes/ts/index.tsx`を編集<br>

```tsx:index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('app'))
```

- `resources/ts/App.tsx`を編集<br>

```tsx:App.tsx
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <div className="App">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

      <input
        type="email"
        className="form-control"
        placeholder="Email"
        required
      />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Sign in
      </button>
    </div>
  )
}

export default App
```

- `resources/views/index.blade.php`を編集<br>

```html:index.blade.php
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <title>Laravel + React Auth SPA</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
  </head>

  <body>
    <div id="app"></div>
  </body>

  <script src="{{ mix('/js/index.js') }}"></script>
</html>
```

- `resources/sass/app.scss`を編集<br>

```scss:app.scss
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
```
