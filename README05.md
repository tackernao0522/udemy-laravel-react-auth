## 23 useEffect Dependencies

- `resources/ts/App.tsx`を編集<br>

```tsx:App.tsx
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

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
        <Nav user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

- `resources/ts/pages/Login.tsx`を編集<br>

```tsx:Login.tsx
import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = ({ setLogin }: { setLogin: Function }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.post('login', {
      email,
      password,
    })

    setRedirect(true)
    setLogin()
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-lg btn-primary btn-block w-100" type="submit">
        Sign in
      </button>
    </form>
  )
}

export default Login
```

- `resources/ts/App.tsx`を編集<br>

```tsx:App.tsx
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

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
        <Nav user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={<Login setLogin={() => setLogin(true)} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```

- `resources/ts/components/Nav.tsx`を編集<br>

```tsx:Nav.tsx
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = ({ user, setLogin }: { user: any; setLogin: Function }) => {
  const logout = async () => {
    await axios.post('logout', {})

    setLogin()
  }

  let links

  user
    ? (links = (
        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">
            <Link to="/" onClick={logout} className="nav-link">
              Logout
            </Link>
          </li>
        </ul>
      ))
    : (links = (
        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      ))

  // if (user) {
  //   links = (
  //     <ul className="navbar-nav my-2 my-lg-0">
  //       <li className="nav-item">
  //         <Link to="/" onClick={logout} className="nav-link">
  //           Logout
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   links = (
  //     <ul className="navbar-nav my-2 my-lg-0">
  //       <li className="nav-item">
  //         <Link to="/login" className="nav-link">
  //           Login
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link to="register" className="nav-link">
  //           Register
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
      </ul>

      {links}
    </nav>
  )
}
```

- `resources/ts/App.tsx`を編集<br>

```tsx:App.tsx
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
```
