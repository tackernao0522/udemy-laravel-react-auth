## 25 Reset Password

- `$ touch resources/ts/pages/Reset.tsx`を実行<br>

* `resources/ts/pages/Reset.tsx`を編集<br><br>

```tsx:Reset.tsx
import React, { useState } from 'react'

export const Reset = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const submit = () => {}

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Reset your password</h1>

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password Confirm"
        required
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Reset Password
      </button>
    </form>
  )
}
```

- `resources/ts/App.tsx`を編集<br>

```tsx:App.tsx
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Forgot } from './pages/Forgot'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Reset } from './pages/Reset'

const App = () => {
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get('user')

        // console.log(response);
        const user = response.data

        setUser(user)
      } catch (e) {
        setUser(null)
      }
    })()
  }, [login])

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setLogin={() => setLogin(false)} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={<Login setLogin={() => setLogin(true)} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset/:token" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

- `resources/ts/pages/Reset.tsx`を編集<br>

```tsx:Reset.tsx
import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const Reset = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { token } = useParams()

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.post('reset', {
      token,
      password,
      password_confirm: passwordConfirm,
    })

    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/login" />
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Reset your password</h1>

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password Confirm"
        required
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Reset Password
      </button>
    </form>
  )
}
```
